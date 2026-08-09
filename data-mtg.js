// data-mtg.js - Dynamic MTG Scryfall Integration for Rip Boosters

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
    mtgecl: {
        setKey: 'mtgecl',
        name: 'Lorwyn Eclipsed (Collector Booster)',
        code: 'ecl',
        year: 2026,
        isCollectorBooster: true,
        maxCount: 591,
        coverImage: 'card_images/mtg_sets/mtg_ecl_collectorboosterwrapper.jpg',
        themeColor: '#1e3d59',
        hitCardNames: ["Bitterbloom Bearer"]
    },
    mtgtmt: {
        setKey: 'mtgtmt',
        name: 'Teenage Mutant Ninja Turtles (Collector Booster)',
        code: 'tmt',
        year: 2026,
        isCollectorBooster: true,
        maxCount: 637,
        coverImage: 'card_images/mtg_sets/mtg_tmt_collectorboosterwrapper.jpg',
        themeColor: '#1e8449',
        hitCardNames: ["Leonardo, Sewer Samurai", "Donatello, Mutant Mechanic", "Raphael, Ninja Destroyer", "Michelangelo, Improviser", "Shredder, Shadow Master", "The Last Ronin"]
    },
    mtgsos: {
        setKey: 'mtgsos',
        name: 'Secrets of Strixhaven (Collector Booster)',
        code: 'sos',
        year: 2026,
        isCollectorBooster: true,
        maxCount: 1154,
        coverImage: 'card_images/mtg_sets/mtg_sos_collectorboosterwrapper.jpg',
        themeColor: '#1b4f72',
        hitCardNames: ["Emeritus of Ideation", "Time Warp", "Demonic Tutor", "Counterspell", "Teferi's Protection", "Channel"]
    },
    mtgmsh: {
        setKey: 'mtgmsh',
        name: 'Marvel Super Heroes',
        code: 'msh',
        year: 2026,
        isCollectorBooster: true,
        maxCount: 357,
        coverImage: 'card_images/mtg_sets/mtg_msh_collectorboosterwrapper.jpg',
        themeColor: '#e63946',
        hitCardNames: ["Spider-Man", "Wolverine", "Captain America", "Iron Man", "Thanos", "Venom", "Deadpool", "The Mind Stone"]
    }
};

const ECL_SLOT_QUERIES = {
    foilCommon: "set:ecl r:c is:foil -type:basic",
    foilUncommon: "set:ecl r:u is:foil",
    uncommonFable: "set:ecl r:u is:foil (frame:showcase OR border:borderless OR frame:extendedart)",
    foilLand: "(type:land type:basic) set:ecl is:fullart is:foil",
    foilRare: "set:ecl rarity:r is:foil",
    foilMythic: "set:ecl rarity:m is:foil",
    eccRareExtended: "is:extended set:ecc rarity:r",
    eccMythicBorderless: "is:borderless set:ecc rarity:m",
    extendedRare: "(rarity:r OR rarity:m) set:ecl is:nonfoil is:extendedart",
    fableRare: "rarity:r set:ecl -is:japanshowcase frame:showcase is:nonfoil",
    fableMythic: "rarity:m set:ecl -is:japanshowcase frame:showcase is:nonfoil",
    borderlessRare: "is:borderless set:ecl rarity:r -is:showcase -type:land -is:serialized is:nonfoil",
    borderlessMythic: "is:borderless set:ecl rarity:m -is:showcase -type:land -is:serialized is:nonfoil",
    reversibleShock: "is:shockland set:ecl rarity:r is:reversible is:nonfoil",
    foilExtendedRare: "rarity:r set:ecl -is:japanshowcase frame:extendedart is:foil",
    foilFableRare: "rarity:r set:ecl -is:japanshowcase frame:showcase is:foil",
    foilFableMythic: "rarity:m set:ecl -is:japanshowcase frame:showcase is:foil",
    foilBorderlessRare: "is:borderless set:ecl rarity:r -is:showcase -type:land -is:serialized is:foil",
    foilBorderlessMythic: "is:borderless set:ecl rarity:m -is:showcase -type:land -is:serialized is:foil",
    foilReversibleShock: "is:shockland set:ecl rarity:r is:reversible is:foil",
    foilSpecialGuests: "set:spg date:ecl is:foil",
    japanShowcaseFoil: "rarity:m set:ecl is:japanshowcase is:foil",
    japanShowcaseFracture: "rarity:m set:ecl is:japanshowcase is:fracturefoil",
    serializedBitterbloom: "set:ecl is:serialized is:foil",
    foilToken: "set:tecl is:foil",
    artCard: "set:aecl"
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

    return {
        n: count,
        id: card.id,
        name: card.name,
        rarity: card.rarity,
        setCode: card.set ? card.set.toLowerCase() : '',
        typeLine: card.type_line || '',
        borderColor: card.border_color || '',
        frontImg: frontImage,
        backImg: backImage,
        lang: card.lang || 'en',
        collectorNumber: card.collector_number || ''
    };
}

export async function ensureSetData(setKey) {
    if (cache[setKey] && cache[setKey].baseCards) {
        if ((setKey !== 'mtgmsh' && setKey !== 'mtgsos' && setKey !== 'mtgtmt' && setKey !== 'mtgecl') || cache[setKey].collectorPools) {
            return cache[setKey];
        }
    }

    const config = MTG_CONFIGS[setKey];
    if (!config) throw new Error(`Unknown MTG Set Key: ${setKey}`);

    if (setKey === 'mtgecl') {
        const collectorPools = {};
        const baseCards = [];
        const hitsSet = new Set();
        let cardCounter = 1;

        const hitPoolKeys = new Set([
            'foilFableMythic',
            'foilBorderlessRare',
            'foilBorderlessMythic',
            'foilReversibleShock',
            'foilSpecialGuests',
            'japanShowcaseFoil',
            'japanShowcaseFracture',
            'serializedBitterbloom'
        ]);

        for (const [poolKey, queryStr] of Object.entries(ECL_SLOT_QUERIES)) {
            const rawCards = await fetchScryfallQuery(queryStr);
            const processedPool = [];

            for (const card of rawCards) {
                const cardObj = processScryfallCard(card, cardCounter++);
                processedPool.push(cardObj);
                baseCards.push(cardObj);

                if (hitPoolKeys.has(poolKey)) {
                    hitsSet.add(cardObj);
                }
            }
            collectorPools[poolKey] = processedPool;
        }

        if (collectorPools.foilToken && collectorPools.foilToken.length > 1) {
            for (let t = 0; t < collectorPools.foilToken.length; t++) {
                if (collectorPools.foilToken[t].backImg === "card_images/mtg_sets/Magic_the_Gathering_Card_Back.jpg") {
                    const partnerIdx = (t + 1) % collectorPools.foilToken.length;
                    collectorPools.foilToken[t].backImg = collectorPools.foilToken[partnerIdx].frontImg;
                }
            }
        }

        const hitPool = Array.from(hitsSet);
        const rarePool = collectorPools.foilRare.concat(collectorPools.foilMythic);
        const uncommonPool = collectorPools.foilUncommon;
        const commonPool = collectorPools.foilCommon;

        const dataset = {
            maxCount: 591,
            baseCards: baseCards,
            pools: {
                rare: rarePool.length ? rarePool : baseCards,
                uncommon: uncommonPool.length ? uncommonPool : baseCards,
                common: commonPool.length ? commonPool : baseCards,
                hits: hitPool.length ? hitPool : rarePool
            },
            collectorPools: collectorPools
        };

        Object.assign(config, dataset);
        cache[setKey] = config;
        return config;
    }

    let searchQuery = `set:${config.code} unique:prints`;
    if (setKey === 'mtgmsh') searchQuery = `(set:msh OR set:msc OR set:mar) unique:prints`;
    if (setKey === 'mtgsos') searchQuery = `(set:sos OR set:soa OR set:soc OR set:spg) unique:prints`;
    if (setKey === 'mtgtmt') searchQuery = `(set:tmt OR set:tmc OR set:pza OR set:spg OR set:ttmt OR set:atmt) unique:prints`;

    let allCards = await fetchScryfallQuery(searchQuery);

    if (allCards.length === 0) {
        throw new Error(`Unable to load card data for set ${setKey} from Scryfall.`);
    }

    const baseCards = [];
    const rarePool = [];
    const uncommonPool = [];
    const commonPool = [];
    const hitPool = [];

    // MSH Collector Pools
    const foilBoosterFunPool = [];
    const nonfoilBoosterFunPool = [];
    const sourceMaterialPool = [];
    const commanderBoosterFunPool = [];
    const foilRarePool = [];
    const foilScenePool = [];
    const foilUncommonMscPool = [];
    const foilUncommonPool = [];
    const foilLandPool = [];
    const foilCommonMscPool = [];
    const foilCommonPool = [];
    const artTokenPool = [];

    // SOS Collector Pools
    const sosFoilBoosterFunPool = [];
    const sosRareMythicArchivePool = [];
    const sosNonfoilBoosterFunPool = [];
    const sosCommanderRarePool = [];
    const sosFoilRarePool = [];
    const sosJpArchivePool = [];
    const sosUncommonArchivePool = [];
    const sosFoilLandPool = [];
    const sosFoilUncommonPool = [];
    const sosFoilCommonPool = [];

    // TMNT Collector Pools
    const tmtFoilBoosterFunPool = [];
    const tmtFoilJapaneseShowcasePool = [];
    const tmtFoilSewerFramePool = [];
    const tmtSourceMaterialPool = [];
    const tmtCommanderRarePool = [];
    const tmtFoilRarePool = [];
    const tmtNonfoilExtendedPool = [];
    const tmtFoilLandPool = [];
    const tmtFoilUncommonPool = [];
    const tmtFoilCommonPool = [];
    const tmtFoilScenePool = [];
    const tmtFoilDualLandPool = [];
    const tmtTokenPool = [];
    const tmtArtCardPool = [];

    let count = 1;
    allCards.forEach(card => {
        const cardObj = processScryfallCard(card, count);
        baseCards.push(cardObj);

        if (card.rarity === 'rare' || card.rarity === 'mythic') rarePool.push(cardObj);
        else if (card.rarity === 'uncommon') uncommonPool.push(cardObj);
        else commonPool.push(cardObj);

        const hitList = config.hitCardNames || [];
        const isHit = hitList.some(hitName =>
            card.name.toLowerCase() === hitName.toLowerCase() ||
            card.name.toLowerCase().startsWith(hitName.toLowerCase())
        );

        if (isHit || card.rarity === 'mythic') {
            hitPool.push(cardObj);
        }

        if (setKey === 'mtgmsh') {
            const setLower = cardObj.setCode;
            const typeLower = cardObj.typeLine.toLowerCase();

            if (typeLower.includes('token') || typeLower.includes('art card')) {
                artTokenPool.push(cardObj);
            } else if (typeLower.includes('basic land') || typeLower.includes('land')) {
                foilLandPool.push(cardObj);
            } else if (setLower === 'mar') {
                sourceMaterialPool.push(cardObj);
            } else if (cardObj.borderColor === 'borderless' || isHit) {
                if (card.rarity === 'mythic' || card.rarity === 'rare') foilBoosterFunPool.push(cardObj);
                else nonfoilBoosterFunPool.push(cardObj);
            } else if (setLower === 'msc') {
                if (card.rarity === 'rare' || card.rarity === 'mythic') commanderBoosterFunPool.push(cardObj);
                else if (card.rarity === 'uncommon') foilUncommonMscPool.push(cardObj);
                else foilCommonMscPool.push(cardObj);
            } else if (typeLower.includes('scene')) {
                foilScenePool.push(cardObj);
            } else if (card.rarity === 'rare' || card.rarity === 'mythic') {
                foilRarePool.push(cardObj);
            } else if (card.rarity === 'uncommon') {
                foilUncommonPool.push(cardObj);
            } else {
                foilCommonPool.push(cardObj);
            }
        } else if (setKey === 'mtgsos') {
            const setLower = cardObj.setCode;
            const typeLower = cardObj.typeLine.toLowerCase();

            if (setLower === 'soa' || cardObj.collectorNumber.startsWith('STA')) {
                if (cardObj.lang === 'ja') {
                    sosJpArchivePool.push(cardObj);
                } else if (card.rarity === 'uncommon') {
                    sosUncommonArchivePool.push(cardObj);
                } else {
                    sosRareMythicArchivePool.push(cardObj);
                }
            } else if (setLower === 'soc') {
                if (card.rarity === 'rare' || card.rarity === 'mythic') sosCommanderRarePool.push(cardObj);
                else sosFoilUncommonPool.push(cardObj);
            } else if (typeLower.includes('land')) {
                sosFoilLandPool.push(cardObj);
            } else if (cardObj.borderColor === 'borderless' || cardObj.collectorNumber > '280' || isHit) {
                if (card.rarity === 'rare' || card.rarity === 'mythic') {
                    sosFoilBoosterFunPool.push(cardObj);
                    sosNonfoilBoosterFunPool.push(cardObj);
                } else {
                    sosFoilUncommonPool.push(cardObj);
                }
            } else if (card.rarity === 'rare' || card.rarity === 'mythic') {
                sosFoilRarePool.push(cardObj);
            } else if (card.rarity === 'uncommon') {
                sosFoilUncommonPool.push(cardObj);
            } else {
                sosFoilCommonPool.push(cardObj);
            }
        } else if (setKey === 'mtgtmt') {
            const setLower = cardObj.setCode;
            const typeLower = cardObj.typeLine.toLowerCase();

            if (setLower === 'ttmt' || typeLower.includes('token')) {
                tmtTokenPool.push(cardObj);
            } else if (setLower === 'atmt' || typeLower.includes('art card')) {
                tmtArtCardPool.push(cardObj);
            } else if (setLower === 'pza' || cardObj.collectorNumber.startsWith('PZA')) {
                tmtSourceMaterialPool.push(cardObj);
            } else if (setLower === 'tmc') {
                if (card.rarity === 'rare' || card.rarity === 'mythic') tmtCommanderRarePool.push(cardObj);
                else tmtFoilUncommonPool.push(cardObj);
            } else if (cardObj.lang === 'ja' || cardObj.collectorNumber.includes('JP')) {
                tmtFoilJapaneseShowcasePool.push(cardObj);
            } else if (cardObj.collectorNumber.includes('SWR') || cardObj.typeLine.includes('Sewer')) {
                tmtFoilSewerFramePool.push(cardObj);
            } else if (typeLower.includes('scene')) {
                tmtFoilScenePool.push(cardObj);
            } else if (typeLower.includes('basic land') || typeLower.includes('rooftop') || typeLower.includes('pizza')) {
                tmtFoilLandPool.push(cardObj);
            } else if (cardObj.borderColor === 'borderless' || isHit) {
                if (card.rarity === 'rare' || card.rarity === 'mythic') {
                    tmtFoilBoosterFunPool.push(cardObj);
                    tmtNonfoilExtendedPool.push(cardObj);
                } else {
                    tmtFoilUncommonPool.push(cardObj);
                }
            } else if (card.rarity === 'rare' || card.rarity === 'mythic') {
                tmtFoilRarePool.push(cardObj);
            } else if (card.rarity === 'uncommon') {
                tmtFoilUncommonPool.push(cardObj);
            } else if (typeLower.includes('land')) {
                tmtFoilDualLandPool.push(cardObj);
            } else {
                tmtFoilCommonPool.push(cardObj);
            }
        }

        count++;
    });

    if (setKey === 'mtgtmt' && tmtTokenPool.length > 1) {
        for (let t = 0; t < tmtTokenPool.length; t++) {
            if (tmtTokenPool[t].backImg === "card_images/mtg_sets/Magic_the_Gathering_Card_Back.jpg") {
                const partnerIdx = (t + 1) % tmtTokenPool.length;
                tmtTokenPool[t].backImg = tmtTokenPool[partnerIdx].frontImg;
            }
        }
    }

    const dataset = {
        maxCount: baseCards.length,
        baseCards: baseCards,
        pools: {
            rare: rarePool.length ? rarePool : baseCards,
            uncommon: uncommonPool.length ? uncommonPool : baseCards,
            common: commonPool.length ? commonPool : baseCards,
            hits: hitPool.length ? hitPool : (rarePool.length ? rarePool : baseCards)
        }
    };

    if (setKey === 'mtgmsh') {
        const defaultRare = dataset.pools.rare;
        const defaultUncommon = dataset.pools.uncommon;
        const defaultCommon = dataset.pools.common;

        dataset.collectorPools = {
            foilBoosterFun: foilBoosterFunPool.length ? foilBoosterFunPool : dataset.pools.hits,
            nonfoilBoosterFun: nonfoilBoosterFunPool.length ? nonfoilBoosterFunPool : defaultRare,
            sourceMaterial: sourceMaterialPool.length ? sourceMaterialPool : defaultRare,
            commanderBoosterFun: commanderBoosterFunPool.length ? commanderBoosterFunPool : defaultRare,
            foilRare: foilRarePool.length ? foilRarePool : defaultRare,
            foilScene: foilScenePool.length ? foilScenePool : defaultUncommon,
            foilUncommonMsc: foilUncommonMscPool.length ? foilUncommonMscPool : defaultUncommon,
            foilUncommon: foilUncommonPool.length ? foilUncommonPool : defaultUncommon,
            foilLand: foilLandPool.length ? foilLandPool : defaultCommon,
            foilCommonMsc: foilCommonMscPool.length ? foilCommonMscPool : defaultCommon,
            foilCommon: foilCommonPool.length ? foilCommonPool : defaultCommon,
            artToken: artTokenPool.length ? artTokenPool : defaultCommon
        };
    } else if (setKey === 'mtgsos') {
        const defaultRare = dataset.pools.rare;
        const defaultUncommon = dataset.pools.uncommon;
        const defaultCommon = dataset.pools.common;

        dataset.collectorPools = {
            foilBoosterFun: sosFoilBoosterFunPool.length ? sosFoilBoosterFunPool : dataset.pools.hits,
            rareMythicArchive: sosRareMythicArchivePool.length ? sosRareMythicArchivePool : dataset.pools.hits,
            nonfoilBoosterFun: sosNonfoilBoosterFunPool.length ? sosNonfoilBoosterFunPool : defaultRare,
            commanderRare: sosCommanderRarePool.length ? sosCommanderRarePool : defaultRare,
            foilRare: sosFoilRarePool.length ? sosFoilRarePool : defaultRare,
            jpArchive: sosJpArchivePool.length ? sosJpArchivePool : (sosRareMythicArchivePool.length ? sosRareMythicArchivePool : dataset.pools.hits),
            uncommonArchive: sosUncommonArchivePool.length ? sosUncommonArchivePool : defaultUncommon,
            foilLand: sosFoilLandPool.length ? sosFoilLandPool : defaultCommon,
            foilUncommon: sosFoilUncommonPool.length ? sosFoilUncommonPool : defaultUncommon,
            foilCommon: sosFoilCommonPool.length ? sosFoilCommonPool : defaultCommon
        };
    } else if (setKey === 'mtgtmt') {
        const defaultRare = dataset.pools.rare;
        const defaultUncommon = dataset.pools.uncommon;
        const defaultCommon = dataset.pools.common;

        dataset.collectorPools = {
            foilBoosterFun: tmtFoilBoosterFunPool.length ? tmtFoilBoosterFunPool : dataset.pools.hits,
            foilJapaneseShowcase: tmtFoilJapaneseShowcasePool.length ? tmtFoilJapaneseShowcasePool : dataset.pools.hits,
            foilSewerFrame: tmtFoilSewerFramePool.length ? tmtFoilSewerFramePool : defaultRare,
            sourceMaterial: tmtSourceMaterialPool.length ? tmtSourceMaterialPool : defaultRare,
            commanderRare: tmtCommanderRarePool.length ? tmtCommanderRarePool : defaultRare,
            foilRare: tmtFoilRarePool.length ? tmtFoilRarePool : defaultRare,
            nonfoilExtended: tmtNonfoilExtendedPool.length ? tmtNonfoilExtendedPool : defaultRare,
            foilLand: tmtFoilLandPool.length ? tmtFoilLandPool : defaultCommon,
            foilUncommon: tmtFoilUncommonPool.length ? tmtFoilUncommonPool : defaultUncommon,
            foilCommon: tmtFoilCommonPool.length ? tmtFoilCommonPool : defaultCommon,
            foilScene: tmtFoilScenePool.length ? tmtFoilScenePool : defaultUncommon,
            foilDualLand: tmtFoilDualLandPool.length ? tmtFoilDualLandPool : defaultCommon,
            tokens: tmtTokenPool.length ? tmtTokenPool : defaultCommon,
            artCards: tmtArtCardPool.length ? tmtArtCardPool : defaultCommon
        };
    }

    Object.assign(config, dataset);
    cache[setKey] = config;
    return config;
}