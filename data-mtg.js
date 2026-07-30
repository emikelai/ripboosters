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

const cache = {};

export async function ensureSetData(setKey) {
    if (cache[setKey] && cache[setKey].baseCards) {
        if (setKey !== 'mtgmsh' || cache[setKey].collectorPools) {
            return cache[setKey];
        }
    }

    const config = MTG_CONFIGS[setKey];
    if (!config) throw new Error(`Unknown MTG Set Key: ${setKey}`);

    const searchQuery = setKey === 'mtgmsh' 
        ? `(e%3Amsh+OR+e%3Amsc+OR+e%3Amar)&unique=prints` 
        : `e%3A${config.code}&unique=prints`;

    let url = `https://api.scryfall.com/cards/search?q=${searchQuery}`;
    let allCards = [];

    while (url) {
        try {
            const response = await fetch(url);
            if (!response.ok) break;
            const json = await response.json();
            if (json && Array.isArray(json.data)) {
                allCards = allCards.concat(json.data);
            }
            url = (json && json.has_more) ? json.next_page : null;
            if (url) await new Promise(r => setTimeout(r, 100));
        } catch (err) {
            console.error("Failed to fetch page from Scryfall:", err);
            break;
        }
    }

    if (allCards.length === 0) {
        throw new Error(`Unable to load card data for set ${setKey} from Scryfall.`);
    }

    const baseCards = [];
    const rarePool = [];
    const uncommonPool = [];
    const commonPool = [];
    const hitPool = [];

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

    let count = 1;
    allCards.forEach(card => {
        let frontImage = "card_images/card_back.jpg";
        let backImage = null;

        // Front & Back Image Extraction for Double-Faced Cards
        if (card.image_uris && card.image_uris.normal) {
            frontImage = card.image_uris.normal;
        } else if (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris) {
            frontImage = card.card_faces[0].image_uris.normal;
            if (card.card_faces[1] && card.card_faces[1].image_uris) {
                backImage = card.card_faces[1].image_uris.normal;
            }
        }

        const cardObj = {
            n: count,
            id: card.id,
            name: card.name,
            rarity: card.rarity,
            setCode: card.set ? card.set.toLowerCase() : '',
            typeLine: card.type_line || '',
            borderColor: card.border_color || '',
            frontImg: frontImage,
            backImg: backImage
        };

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
        }

        count++;
    });

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
    }

    Object.assign(config, dataset);
    cache[setKey] = config;
    return config;
}