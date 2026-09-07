// sets/mtg/mtg-sos.js
export const SOS_CONFIG = {
    setKey: 'mtgsos',
    name: 'Secrets of Strixhaven (Collector Booster)',
    code: 'sos',
    year: 2026,
    isCollectorBooster: true,
    maxCount: 462,
    coverImage: 'card_images/mtg_sets/mtg_sos_collectorboosterwrapper.jpg',
    themeColor: '#1b4f72',
    hitCardNames: ["Emeritus of Ideation", "Time Warp", "Demonic Tutor", "Counterspell", "Teferi's Protection", "Channel"],
    searchQuery: `(set:sos OR set:soa OR set:soc OR set:spg) unique:prints`
};

export function buildSOSCollectorPools(allCards, dataset) {
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

    allCards.forEach(cardObj => {
        const setLower = cardObj.setCode;
        const typeLower = cardObj.typeLine.toLowerCase();
        const isHit = dataset.pools.hits.includes(cardObj);

        if (setLower === 'soa' || cardObj.collectorNumber.startsWith('STA')) {
            if (cardObj.lang === 'ja') {
                sosJpArchivePool.push(cardObj);
            } else if (cardObj.rarity === 'uncommon') {
                sosUncommonArchivePool.push(cardObj);
            } else {
                sosRareMythicArchivePool.push(cardObj);
            }
        } else if (setLower === 'soc') {
            if (cardObj.rarity === 'rare' || cardObj.rarity === 'mythic') sosCommanderRarePool.push(cardObj);
            else sosFoilUncommonPool.push(cardObj);
        } else if (typeLower.includes('land')) {
            sosFoilLandPool.push(cardObj);
        } else if (cardObj.borderColor === 'borderless' || cardObj.collectorNumber > '280' || isHit) {
            if (cardObj.rarity === 'rare' || cardObj.rarity === 'mythic') {
                sosFoilBoosterFunPool.push(cardObj);
                sosNonfoilBoosterFunPool.push(cardObj);
            } else {
                sosFoilUncommonPool.push(cardObj);
            }
        } else if (cardObj.rarity === 'rare' || cardObj.rarity === 'mythic') {
            sosFoilRarePool.push(cardObj);
        } else if (cardObj.rarity === 'uncommon') {
            sosFoilUncommonPool.push(cardObj);
        } else {
            sosFoilCommonPool.push(cardObj);
        }
    });

    const defaultRare = dataset.pools.rare;
    const defaultUncommon = dataset.pools.uncommon;
    const defaultCommon = dataset.pools.common;

    return {
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
}