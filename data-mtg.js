// data-mtg.js - Universal Scryfall API Fetch Engine & Collector Set Loader
import { SETS_REGISTRY } from './sets-config.js';
import { TMT_CONFIG } from './sets/mtg/mtg-tmt.js';
import { SOS_CONFIG } from './sets/mtg/mtg-sos.js';
import { MASTER_MTG_SCHEMAS } from './sets/mtg/mtg-master-schemas.js';

const ABU_POWER_AND_DUALS = [
    "Black Lotus", "Mox Sapphire", "Mox Jet", "Mox Ruby", "Mox Emerald", "Mox Pearl",
    "Ancestral Recall", "Time Walk", "Timetwister",
    "Underground Sea", "Tundra", "Tropical Island", "Taiga",
    "Savannah", "Scrubland", "Bayou", "Badlands", "Plateau"
];

export const MTG_CONFIGS = {
    mtglea: { setKey: 'mtglea', name: 'Limited Edition Alpha', code: 'lea', year: 1993, maxCount: 295, hitCardNames: ABU_POWER_AND_DUALS },
    mtgleb: { setKey: 'mtgleb', name: 'Limited Edition Beta', code: 'leb', year: 1993, maxCount: 302, hitCardNames: [...ABU_POWER_AND_DUALS, "Volcanic Island"] },
    mtg2ed: { setKey: 'mtg2ed', name: 'Unlimited Edition', code: '2ed', year: 1993, maxCount: 302, hitCardNames: [...ABU_POWER_AND_DUALS, "Volcanic Island"] },
    mtgarn: { setKey: 'mtgarn', name: 'Arabian Nights', code: 'arn', year: 1993, maxCount: 92, hitCardNames: ["Bazaar of Baghdad", "Library of Alexandria", "Juzám Djinn", "Drop of Honey", "Diamond Valley"] },
    mtgatq: { setKey: 'mtgatq', name: 'Antiquities', code: 'atq', year: 1994, maxCount: 100, hitCardNames: ["Mishra's Workshop", "Candelabra of Tawnos", "Transmute Artifact", "Power Artifact"] },
    mtg3ed: { setKey: 'mtg3ed', name: 'Revised Edition', code: '3ed', year: 1994, maxCount: 306, hitCardNames: ["Volcanic Island", "Underground Sea", "Tundra", "Tropical Island", "Taiga", "Savannah", "Scrubland", "Bayou", "Badlands", "Plateau", "Wheel of Fortune"] },
    mtgleg: { setKey: 'mtgleg', name: 'Legends', code: 'leg', year: 1994, maxCount: 310, hitCardNames: ["The Tabernacle at Pendrell Vale", "Moat", "Chains of Mephistopheles", "Nether Void", "Gwendlyn Di Corci"] },
    mtgdrk: { setKey: 'mtgdrk', name: 'The Dark', code: 'drk', year: 1994, maxCount: 119, hitCardNames: ["Blood Moon", "Maze of Ith", "Tormod's Crypt", "Preacher"] },
    rav: { setKey: 'rav', name: 'Ravnica: City of Guilds', code: 'rav', year: 2005, maxCount: 306, hitCardNames: ["Overgrown Tomb", "Temple Garden", "Sacred Foundry", "Watery Grave", "Dark Confidant", "Chord of Calling", "Doubling Season", "Privileged Position"] },
    isd: { setKey: 'isd', name: 'Innistrad', code: 'isd', year: 2011, maxCount: 264, hitCardNames: ["Liliana of the Veil", "Snapcaster Mage", "Geist of Saint Traft", "Garruk Relentless", "Parallel Lives", "Griselbrand"] },
    mtgtmt: TMT_CONFIG,
    mtgsos: SOS_CONFIG
};

const cache = {};

async function fetchScryfallQuery(query) {
    let url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`;
    let cards = [];
    while (url) {
        try {
            const response = await fetch(url);
            if (response.status === 429) {
                await new Promise(r => setTimeout(r, 600));
                continue;
            }
            if (!response.ok) break;
            const json = await response.json();
            if (json && Array.isArray(json.data)) {
                cards = cards.concat(json.data);
            }
            url = (json && json.has_more) ? json.next_page : null;
            if (url) await new Promise(r => setTimeout(r, 110));
        } catch (err) {
            console.error("Failed to fetch query page from Scryfall:", err);
            break;
        }
    }
    return cards;
}

function processScryfallCard(card, count) {
    let frontImage = "card_images/card_back.jpg";
    let backImage = null;

    if (card.card_faces && card.card_faces.length > 1) {
        if (card.card_faces[0].image_uris && card.card_faces[0].image_uris.normal) {
            frontImage = card.card_faces[0].image_uris.normal;
        }
        if (card.card_faces[1].image_uris && card.card_faces[1].image_uris.normal) {
            backImage = card.card_faces[1].image_uris.normal;
        }
    }

    if (!frontImage || frontImage === "card_images/card_back.jpg") {
        if (card.image_uris && card.image_uris.normal) {
            frontImage = card.image_uris.normal;
        } else if (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris) {
            frontImage = card.card_faces[0].image_uris.normal;
        }
    }

    if (!backImage) {
        backImage = "card_images/mtg_sets/Magic_the_Gathering_Card_Back.jpg";
    }

    const isFoil = card.foil === true || (card.finishes && card.finishes.includes('foil'));
    const isFractureFoil = card.finishes && card.finishes.includes('fracturefoil');
    const isSerialized = card.serialized === true;
    const isJapanShowcase = card.promo_types && card.promo_types.includes('japanshowcase');
    const isSpecialGuest = card.set === 'spg';
    const isExtendedArt = card.frame_effects && card.frame_effects.includes('extendedart');
    const isFableFrame = card.frame_effects && card.frame_effects.includes('showcase');
    const isBorderless = card.border_color === 'borderless';
    const isReversibleShockLand = card.keywords && card.keywords.includes('Shock Land') && card.type_line && card.type_line.includes('Land');

    return {
        n: count,
        id: card.id,
        rawId: card.id,
        name: card.name,
        rarity: card.rarity,
        setCode: card.set ? card.set.toLowerCase() : '',
        typeLine: card.type_line || '',
        borderColor: card.border_color || '',
        frontImg: frontImage,
        backImg: backImage,
        lang: card.lang || 'en',
        collectorNumber: card.collector_number || '',
        isFoil,
        isFractureFoil,
        isSerialized,
        isJapanShowcase,
        isSpecialGuest,
        isExtendedArt,
        isFableFrame,
        isBorderless,
        isReversibleShockLand
    };
}

export async function ensureSetData(setKey) {
    const setReg = SETS_REGISTRY.find(s => s.key === setKey);
    const isMasterSchema = Boolean(setReg && setReg.isMasterSchema && MASTER_MTG_SCHEMAS[setKey]);

    if (cache[setKey] && cache[setKey].baseCards) {
        if ((setKey !== 'mtgsos' && setKey !== 'mtgtmt' && !isMasterSchema) || cache[setKey].collectorPools) {
            return cache[setKey];
        }
    }

    // --- Universal Master Schema Loader (Supports both flat queries and weighted subPools) ---
    if (isMasterSchema) {
        const schema = MASTER_MTG_SCHEMAS[setKey];
        const collectorPools = {};
        const baseCards = [];
        const hitsSet = new Set();
        const cardObjMap = new Map();

        // Collect and deduplicate all unique queries across flat slots and weighted subPools
        const uniqueQueries = new Map();
        const registerQuery = (query, isFoil) => {
            const qKey = `${query}__${isFoil ? 'f' : 'nf'}`;
            if (!uniqueQueries.has(qKey)) {
                uniqueQueries.set(qKey, { query, isFoil });
            }
        };

        for (const slotDef of schema) {
            if (Array.isArray(slotDef.subPools) && slotDef.subPools.length > 0) {
                for (const sp of slotDef.subPools) {
                    const spFoil = sp.isFoil !== undefined ? sp.isFoil : slotDef.isFoil;
                    registerQuery(sp.query, spFoil);
                }
            } else if (slotDef.query) {
                registerQuery(slotDef.query, slotDef.isFoil);
            }
        }

        // Ensure complete scene card sets are fetched for sets with interlocking scene grids
        if (setKey === 'mtghob') {
            registerQuery('e:hob cn>=199 cn<=213', false);
            registerQuery('e:hoc cn>=1 cn<=6', false);
        } else if (setKey === 'mtgmsh') {
            registerQuery('e:msh cn>=314 cn<=351', false);
            registerQuery('e:msc cn>=501 cn<=512 is:nonfoil', false);
        }

        const queryResults = [];
        for (const [qKey, info] of uniqueQueries.entries()) {
            const cards = await fetchScryfallQuery(info.query);
            queryResults.push({ qKey, query: info.query, isFoil: info.isFoil, cards });
            await new Promise(r => setTimeout(r, 110));
        }

        const resolvedByQKey = new Map();
        for (const { qKey, query, isFoil, cards } of queryResults) {
            const pool = [];
            for (const card of cards) {
                const compositeId = isFoil ? `${card.id}_f` : `${card.id}_nf`;
                let cardObj = cardObjMap.get(compositeId);
                if (!cardObj) {
                    cardObj = processScryfallCard(card, 0);
                    cardObj.id = compositeId;
                    cardObj.rawId = card.id;
                    cardObj.isFoil = isFoil;
                    if (query.includes('is:serialized')) cardObj.isSerialized = true;
                    cardObjMap.set(compositeId, cardObj);
                    baseCards.push(cardObj);
                }
                pool.push(cardObj);
            }
            resolvedByQKey.set(qKey, pool);
        }

        const resolvedSchema = schema.map(slotDef => {
            if (Array.isArray(slotDef.subPools) && slotDef.subPools.length > 0) {
                const combinedCards = [];
                const seenSlotIds = new Set();

                const resolvedSubPools = slotDef.subPools.map(sp => {
                    const spFoil = sp.isFoil !== undefined ? sp.isFoil : slotDef.isFoil;
                    const spHit = sp.isHitSlot !== undefined ? sp.isHitSlot : slotDef.isHitSlot;
                    const spRank = sp.hitRank !== undefined ? sp.hitRank : (slotDef.hitRank ?? 99);
                    const qKey = `${sp.query}__${spFoil ? 'f' : 'nf'}`;
                    const cards = resolvedByQKey.get(qKey) || [];

                    cards.forEach(c => {
                        if (!seenSlotIds.has(c.id)) {
                            seenSlotIds.add(c.id);
                            combinedCards.push(c);
                        }
                        if (spHit) {
                            c.hitRank = Math.min(c.hitRank ?? 99, spRank);
                            hitsSet.add(c);
                        }
                    });

                    return {
                        weight: sp.weight,
                        cards,
                        isFoil: spFoil,
                        isHitSlot: spHit,
                        hitRank: spRank
                    };
                });

                collectorPools[slotDef.slotNumber] = combinedCards;
                return { ...slotDef, resolvedSubPools };
            } else {
                const qKey = `${slotDef.query}__${slotDef.isFoil ? 'f' : 'nf'}`;
                const slotPool = resolvedByQKey.get(qKey) || [];
                collectorPools[slotDef.slotNumber] = slotPool;

                if (slotDef.isHitSlot) {
                    slotPool.forEach(c => {
                        c.hitRank = Math.min(c.hitRank ?? 99, slotDef.hitRank ?? 99);
                        hitsSet.add(c);
                    });
                }
                return { ...slotDef };
            }
        });

        // Populate named scene pools for interlocking scene grids
        if (setKey === 'mtghob') {
            const hobSceneAll = resolvedByQKey.get('e:hob cn>=199 cn<=213__nf') || [];
            collectorPools.hobScene1 = hobSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 199 && cn <= 204;
            });
            collectorPools.hobScene2 = hobSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 205 && cn <= 213;
            });
            collectorPools.hobScene3 = resolvedByQKey.get('e:hoc cn>=1 cn<=6__nf') || [];
        } else if (setKey === 'mtgmsh') {
            const mshSceneAll = resolvedByQKey.get('e:msh cn>=314 cn<=351__nf') || [];
            const mscSceneAll = resolvedByQKey.get('e:msc cn>=501 cn<=512 is:nonfoil__nf') || [];
            const bbqNums = new Set(['328', '346', '345', '350', '331']);

            collectorPools.sceneCapVsHydra = mshSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 314 && cn <= 319;
            });
            collectorPools.sceneFantasticFamily = mshSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 320 && cn <= 323;
            });
            collectorPools.sceneDaredevilStreetFight = mshSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 324 && cn <= 327;
            });
            collectorPools.sceneHulksSmash = mshSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 328 && cn <= 333;
            });
            collectorPools.sceneCosmicCube = mshSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 334 && cn <= 351;
            });
            collectorPools.sceneAvengersBBQ = mshSceneAll.filter(c => bbqNums.has(String(c.collectorNumber)));
            collectorPools.sceneBoxHeroes = mscSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 501 && cn <= 506;
            });
            collectorPools.sceneBoxVillains = mscSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 507 && cn <= 512;
            });
        }

        // Pair double-sided token back images if a token pool lacks explicit back faces
        for (const pool of Object.values(collectorPools)) {
            const tokenCards = pool.filter(c => c.setCode && c.setCode.startsWith('t') && c.typeLine.includes('Token'));
            if (tokenCards.length > 1) {
                for (let t = 0; t < tokenCards.length; t++) {
                    if (tokenCards[t].backImg === "card_images/mtg_sets/Magic_the_Gathering_Card_Back.jpg") {
                        const partnerIdx = (t + 1) % tokenCards.length;
                        if (tokenCards[partnerIdx] && tokenCards[partnerIdx].frontImg) {
                            tokenCards[t].backImg = tokenCards[partnerIdx].frontImg;
                        }
                    }
                }
            }
        }

        baseCards.forEach((c, idx) => { c.n = idx + 1; });

        cache[setKey] = {
            baseCards,
            collectorPools,
            pools: { hits: Array.from(hitsSet) },
            masterSchema: resolvedSchema
        };
        return cache[setKey];
    }

    const config = MTG_CONFIGS[setKey];
    if (!config) throw new Error(`Unknown MTG Set Key: ${setKey}`);

    const query = `set:${config.code}`;
    const rawCards = await fetchScryfallQuery(query);
    let count = 1;
    const processedCards = rawCards.map(c => processScryfallCard(c, count++));

    const rarePool = processedCards.filter(c => c.rarity === 'rare' || c.rarity === 'mythic');
    const uncommonPool = processedCards.filter(c => c.rarity === 'uncommon');
    const commonPool = processedCards.filter(c => c.rarity === 'common');

    const hitsNames = config.hitCardNames || [];
    const hitsPool = processedCards.filter(c => hitsNames.includes(c.name));

    cache[setKey] = {
        baseCards: processedCards,
        pools: {
            rare: rarePool.length ? rarePool : processedCards,
            uncommon: uncommonPool.length ? uncommonPool : processedCards,
            common: commonPool.length ? commonPool : processedCards,
            hits: hitsPool
        }
    };
    return cache[setKey];
}