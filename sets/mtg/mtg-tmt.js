// sets/mtg/mtg-tmt.js
export const TMT_CONFIG = {
    setKey: 'mtgtmt',
    name: 'Teenage Mutant Ninja Turtles (Collector Booster)',
    code: 'tmt',
    year: 2026,
    isCollectorBooster: true,
    maxCount: 440,
    coverImage: 'card_images/mtg_sets/mtg_tmt_collectorboosterwrapper.jpg',
    themeColor: '#1e8449',
    hitCardNames: ["Leonardo, Sewer Samurai", "Donatello, Mutant Mechanic", "Raphael, Ninja Destroyer", "Michelangelo, Improviser", "Shredder, Shadow Master", "The Last Ronin"],
    searchQuery: `(set:tmt OR set:tmc OR set:pza OR set:spg OR set:ttmt OR set:atmt) unique:prints`
};

export function buildTMTCollectorPools(allCards, dataset) {
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

    allCards.forEach(cardObj => {
        const setLower = cardObj.setCode;
        const typeLower = cardObj.typeLine.toLowerCase();
        const isHit = dataset.pools.hits.includes(cardObj);

        if (setLower === 'ttmt' || typeLower.includes('token')) {
            tmtTokenPool.push(cardObj);
        } else if (setLower === 'atmt' || typeLower.includes('art card')) {
            tmtArtCardPool.push(cardObj);
        } else if (setLower === 'pza' || cardObj.collectorNumber.startsWith('PZA')) {
            tmtSourceMaterialPool.push(cardObj);
        } else if (setLower === 'tmc') {
            if (cardObj.rarity === 'rare' || cardObj.rarity === 'mythic') tmtCommanderRarePool.push(cardObj);
            else tmtFoilUncommonPool.push(cardObj);
        } else if (cardObj.lang === 'ja' || cardObj.collectorNumber.includes('JP')) {
            tmtFoilJapaneseShowcasePool.push(cardObj);
        } else if (cardObj.collectorNumber.includes('SWR') || typeLower.includes('sewer')) {
            tmtFoilSewerFramePool.push(cardObj);
        } else if (typeLower.includes('scene')) {
            tmtFoilScenePool.push(cardObj);
        } else if (typeLower.includes('basic land') || typeLower.includes('rooftop') || typeLower.includes('pizza')) {
            tmtFoilLandPool.push(cardObj);
        } else if (cardObj.borderColor === 'borderless' || isHit) {
            if (cardObj.rarity === 'rare' || cardObj.rarity === 'mythic') {
                tmtFoilBoosterFunPool.push(cardObj);
                tmtNonfoilExtendedPool.push(cardObj);
            } else {
                tmtFoilUncommonPool.push(cardObj);
            }
        } else if (cardObj.rarity === 'rare' || cardObj.rarity === 'mythic') {
            tmtFoilRarePool.push(cardObj);
        } else if (cardObj.rarity === 'uncommon') {
            tmtFoilUncommonPool.push(cardObj);
        } else if (typeLower.includes('land')) {
            tmtFoilDualLandPool.push(cardObj);
        } else {
            tmtFoilCommonPool.push(cardObj);
        }
    });

    if (tmtTokenPool.length > 1) {
        for (let t = 0; t < tmtTokenPool.length; t++) {
            if (tmtTokenPool[t].backImg === "card_images/mtg_sets/Magic_the_Gathering_Card_Back.jpg") {
                const partnerIdx = (t + 1) % tmtTokenPool.length;
                tmtTokenPool[t].backImg = tmtTokenPool[partnerIdx].frontImg;
            }
        }
    }

    const defaultRare = dataset.pools.rare;
    const defaultUncommon = dataset.pools.uncommon;
    const defaultCommon = dataset.pools.common;

    return {
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