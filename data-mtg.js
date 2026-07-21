export const MTG_CONFIGS = {
    mtglea: {
        setKey: 'mtglea',
        name: 'Limited Edition Alpha',
        code: 'lea',
        year: 1993,
        maxCount: 295,
        hitCardNames: [
            "Black Lotus", "Mox Sapphire", "Mox Jet", "Mox Ruby", "Mox Emerald", "Mox Pearl",
            "Ancestral Recall", "Time Walk", "Timetwister",
            "Volcanic Island", "Underground Sea", "Tundra", "Tropical Island", "Taiga",
            "Savannah", "Scrubland", "Bayou", "Badlands", "Plateau"
        ]
    },
    mtgleb: {
        setKey: 'mtgleb',
        name: 'Limited Edition Beta',
        code: 'leb',
        year: 1993,
        maxCount: 302,
        hitCardNames: [
            "Black Lotus", "Mox Sapphire", "Mox Jet", "Mox Ruby", "Mox Emerald", "Mox Pearl",
            "Ancestral Recall", "Time Walk", "Timetwister",
            "Volcanic Island", "Underground Sea", "Tundra", "Tropical Island", "Taiga",
            "Savannah", "Scrubland", "Bayou", "Badlands", "Plateau"
        ]
    },
    mtg2ed: {
        setKey: 'mtg2ed',
        name: 'Unlimited Edition',
        code: '2ed',
        year: 1993,
        maxCount: 302,
        hitCardNames: [
            "Black Lotus", "Mox Sapphire", "Mox Jet", "Mox Ruby", "Mox Emerald", "Mox Pearl",
            "Ancestral Recall", "Time Walk", "Timetwister",
            "Volcanic Island", "Underground Sea", "Tundra", "Tropical Island", "Taiga",
            "Savannah", "Scrubland", "Bayou", "Badlands", "Plateau"
        ]
    },
    mtgarn: {
        setKey: 'mtgarn',
        name: 'Arabian Nights',
        code: 'arn',
        year: 1993,
        maxCount: 92,
        hitCardNames: [
            "Bazaar of Baghdad", "Library of Alexandria", "Juzám Djinn", "Drop of Honey", "Diamond Valley"
        ]
    },
    mtgatq: {
        setKey: 'mtgatq',
        name: 'Antiquities',
        code: 'atq',
        year: 1994,
        maxCount: 100,
        hitCardNames: [
            "Mishra's Workshop", "Candelabra of Tawnos", "Transmute Artifact", "Power Artifact"
        ]
    },
    mtg3ed: {
        setKey: 'mtg3ed',
        name: 'Revised Edition',
        code: '3ed',
        year: 1994,
        maxCount: 306,
        hitCardNames: [
            "Volcanic Island", "Underground Sea", "Tundra", "Tropical Island", "Taiga",
            "Savannah", "Scrubland", "Bayou", "Badlands", "Plateau", "Wheel of Fortune"
        ]
    },
    mtgleg: {
        setKey: 'mtgleg',
        name: 'Legends',
        code: 'leg',
        year: 1994,
        maxCount: 310,
        hitCardNames: [
            "The Tabernacle at Pendrell Vale", "Moat", "Chains of Mephistopheles", "The Nether Void", "Gwendlyn Di Corci"
        ]
    },
    mtgdrk: {
        setKey: 'mtgdrk',
        name: 'The Dark',
        code: 'drk',
        year: 1994,
        maxCount: 119,
        hitCardNames: [
            "Blood Moon", "Maze of Ith", "Tormod's Crypt", "Preacher"
        ]
    },
    rav: {
        setKey: 'rav',
        name: 'Ravnica: City of Guilds',
        code: 'rav',
        year: 2005,
        maxCount: 306,
        hitCardNames: [
            "Overgrown Tomb", "Temple Garden", "Sacred Foundry", "Watery Grave",
            "Dark Confidant", "Chord of Calling", "Doubling Season", "Privileged Position"
        ]
    },
    isd: {
        setKey: 'isd',
        name: 'Innistrad',
        code: 'isd',
        year: 2011,
        maxCount: 264,
        hitCardNames: [
            "Liliana of the Veil", "Snapcaster Mage", "Geist of Saint Traft",
            "Garruk Relentless", "Parallel Lives", "Griselbrand"
        ]
    }
};

const cache = {};

export async function ensureSetData(setKey) {
    if (cache[setKey] && cache[setKey].baseCards) return cache[setKey];

    const config = MTG_CONFIGS[setKey];
    if (!config) throw new Error(`Unknown MTG Set Key: ${setKey}`);

    let url = `https://api.scryfall.com/cards/search?q=e%3A${config.code}&unique=prints`;
    let allCards = [];

    // Paginate through Scryfall API results (caps at 175 cards per page)
    while (url) {
        const response = await fetch(url);
        const json = await response.json();
        if (json.data) {
            allCards = allCards.concat(json.data);
        }
        url = json.has_more ? json.next_page : null;
    }

    const baseCards = [];
    const rarePool = [];
    const uncommonPool = [];
    const commonPool = [];
    const hitPool = [];

    let count = 1;
    allCards.forEach(card => {
        let frontImage = "card_images/card_back.jpg";
        if (card.image_uris && card.image_uris.normal) {
            frontImage = card.image_uris.normal;
        } else if (card.card_faces && card.card_faces[0].image_uris) {
            frontImage = card.card_faces[0].image_uris.normal;
        }

        const cardObj = {
            n: count,
            id: card.id,
            name: card.name,
            rarity: card.rarity,
            frontImg: frontImage
        };

        baseCards.push(cardObj);

        if (card.rarity === 'rare' || card.rarity === 'mythic') rarePool.push(cardObj);
        else if (card.rarity === 'uncommon') uncommonPool.push(cardObj);
        else commonPool.push(cardObj);

        if (config.hitCardNames.some(hitName => card.name.toLowerCase().includes(hitName.toLowerCase()))) {
            hitPool.push(cardObj);
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
            hits: hitPool.length ? hitPool : rarePool
        }
    };

    // Attach baseCards & pools directly onto MTG_CONFIGS[setKey]
    Object.assign(config, dataset);
    cache[setKey] = config;
    return config;
}