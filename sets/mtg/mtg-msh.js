// sets/mtg/mtg-msh.js
export const MSH_CONFIG = {
    setKey: 'mtgmsh',
    name: 'Marvel Super Heroes',
    code: 'msh',
    year: 2026,
    isCollectorBooster: true,
    maxCount: 512,
    coverImage: 'card_images/mtg_sets/mtg_msh_collectorboosterwrapper.jpg',
    themeColor: '#e63946',
    hitCardNames: ["Spider-Man", "Wolverine", "Captain America", "Iron Man", "Thanos", "Venom", "Deadpool", "The Mind Stone"],
    searchQuery: `(set:msh OR set:msc OR set:mar) unique:prints`
};

export function buildMSHCollectorPools(allCards, dataset) {
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

    allCards.forEach(cardObj => {
        const setLower = cardObj.setCode;
        const typeLower = cardObj.typeLine.toLowerCase();
        const isHit = dataset.pools.hits.includes(cardObj);

        if (typeLower.includes('token') || typeLower.includes('art card')) {
            artTokenPool.push(cardObj);
        } else if (typeLower.includes('basic land') || typeLower.includes('land')) {
            foilLandPool.push(cardObj);
        } else if (setLower === 'mar') {
            sourceMaterialPool.push(cardObj);
        } else if (cardObj.borderColor === 'borderless' || isHit) {
            if (cardObj.rarity === 'mythic' || cardObj.rarity === 'rare') foilBoosterFunPool.push(cardObj);
            else nonfoilBoosterFunPool.push(cardObj);
        } else if (setLower === 'msc') {
            if (cardObj.rarity === 'rare' || cardObj.rarity === 'mythic') commanderBoosterFunPool.push(cardObj);
            else if (cardObj.rarity === 'uncommon') foilUncommonMscPool.push(cardObj);
            else foilCommonMscPool.push(cardObj);
        } else if (typeLower.includes('scene')) {
            foilScenePool.push(cardObj);
        } else if (cardObj.rarity === 'rare' || cardObj.rarity === 'mythic') {
            foilRarePool.push(cardObj);
        } else if (cardObj.rarity === 'uncommon') {
            foilUncommonPool.push(cardObj);
        } else {
            foilCommonPool.push(cardObj);
        }
    });

    const defaultRare = dataset.pools.rare;
    const defaultUncommon = dataset.pools.uncommon;
    const defaultCommon = dataset.pools.common;

    return {
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
}