// data-mtg.js - Universal Scryfall API Fetch Engine & Collector Set Loader
import { ECL_CONFIG, renderECLSubcategoryChecklist as renderECL } from './sets/mtg/mtg-ecl.js';
import { HOB_CONFIG, renderHOBSubcategoryChecklist as renderHOB } from './sets/mtg/mtg-hob.js';
import { MSH_CONFIG, renderMSHSubcategoryChecklist as renderMSH } from './sets/mtg/mtg-msh.js';
import { TMT_CONFIG } from './sets/mtg/mtg-tmt.js';
import { SOS_CONFIG } from './sets/mtg/mtg-sos.js';
import { FRA_CONFIG, renderFRASubcategoryChecklist as renderFRA } from './sets/mtg/mtg-fra.js';

export const renderECLSubcategoryChecklist = renderECL;
export const renderHOBSubcategoryChecklist = renderHOB;
export const renderMSHSubcategoryChecklist = renderMSH;
export const renderFRASubcategoryChecklist = renderFRA;

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
    mtgecl: ECL_CONFIG,
    mtgtmt: TMT_CONFIG,
    mtgsos: SOS_CONFIG,
    mtgmsh: MSH_CONFIG,
    mtghob: HOB_CONFIG,
    mtgfra: FRA_CONFIG
};

const cache = {};

async function fetchScryfallQuery(query) {
    let url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`;
    let cards = [];
    while (url) {
        try {
            const response = await fetch(url);
            if (!response.ok) break;
            const json = await response.json();
            if (json && Array.isArray(json.data)) {
                cards = cards.concat(json.data);
            }
            url = (json && json.has_more) ? json.next_page : null;
            if (url) await new Promise(r => setTimeout(r, 100));
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
    if (cache[setKey] && cache[setKey].baseCards) {
        if ((setKey !== 'mtgmsh' && setKey !== 'mtgsos' && setKey !== 'mtgtmt' && setKey !== 'mtgecl' && setKey !== 'mtghob' && setKey !== 'mtgfra') || cache[setKey].collectorPools) {
            return cache[setKey];
        }
    }

    const config = MTG_CONFIGS[setKey];
    if (!config) throw new Error(`Unknown MTG Set Key: ${setKey}`);

    if (setKey === 'mtgecl' || setKey === 'mtghob' || setKey === 'mtgmsh' || setKey === 'mtgfra') {
        const collectorPools = {};
        const baseCards = [];
        const hitsSet = new Set();
        const cardObjMap = new Map();

        const queryMap = config.slotQueries;
        const hitPoolKeys = config.hitPoolKeys;

        const entries = Object.entries(queryMap);
        const queryResults = await Promise.all(
            entries.map(([poolKey, queryStr]) => 
                fetchScryfallQuery(queryStr).then(cards => ({ poolKey, queryStr, cards }))
            )
        );

        for (const { poolKey, queryStr, cards } of queryResults) {
            const processedPool = [];
            const isFoilQuery = queryStr.includes('is:foil') || queryStr.includes('is:fracturefoil') || queryStr.includes('is:serialized') || queryStr.includes('is:surge');

            for (const card of cards) {
                const compositeId = isFoilQuery ? `${card.id}_f` : `${card.id}_nf`;

                let cardObj = cardObjMap.get(compositeId);
                if (!cardObj) {
                    cardObj = processScryfallCard(card, 0);
                    cardObj.id = compositeId; 
                    cardObj.rawId = card.id;
                    cardObj.isFoil = isFoilQuery;
                    if (queryStr.includes('is:serialized')) cardObj.isSerialized = true;

                    cardObjMap.set(compositeId, cardObj);
                    baseCards.push(cardObj);
                }
                
                processedPool.push(cardObj);

                if (hitPoolKeys && hitPoolKeys.has(poolKey)) {
                    hitsSet.add(cardObj);
                }
            }
            collectorPools[poolKey] = processedPool;
        }

        if (collectorPools.foilToken && collectorPools.foilToken.length > 1) {
            for (let t = 0; t < collectorPools.foilToken.length; t++) {
                if (collectorPools.foilToken[t].backImg === "card_images/mtg_sets/Magic_the_Gathering_Card_Back.jpg") {
                    const partnerIdx = (t + 1) % collectorPools.foilToken.length;
                    if (collectorPools.foilToken[partnerIdx] && collectorPools.foilToken[partnerIdx].frontImg) {
                        collectorPools.foilToken[t].backImg = collectorPools.foilToken[partnerIdx].frontImg;
                    }
                }
            }
        }

        const hits = Array.from(hitsSet);
        cache[setKey] = {
            baseCards,
            collectorPools,
            pools: { hits }
        };
        return cache[setKey];
    } else {
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
}