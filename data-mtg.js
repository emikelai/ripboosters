// data-mtg.js

export const MTG_CONFIGS = {
    mtglea: {
        setKey: 'mtglea',
        name: 'Limited Edition Alpha',
        meta: '1993 · Wizards of the Coast · 15 cards per pack',
        maxCount: 295,
        apiUrl: 'https://api.scryfall.com/cards/search?q=set:lea&unique=cards',
        baseCards: [], 
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    },
    mtgleb: {
        setKey: 'mtgleb',
        name: 'Limited Edition Beta',
        meta: '1993 · Wizards of the Coast · 15 cards per pack',
        maxCount: 302,
        apiUrl: 'https://api.scryfall.com/cards/search?q=set:leb&unique=cards',
        baseCards: [], 
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    },
    mtg2ed: {
        setKey: 'mtg2ed',
        name: 'Unlimited Edition',
        meta: '1993 · Wizards of the Coast · 15 cards per pack',
        maxCount: 302,
        apiUrl: 'https://api.scryfall.com/cards/search?q=set:2ed&unique=cards',
        baseCards: [], 
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    },
    mtg3ed: {
        setKey: 'mtg3ed',
        name: 'Revised Edition',
        meta: '1994 · Wizards of the Coast · 15 cards per pack',
        maxCount: 306,
        apiUrl: 'https://api.scryfall.com/cards/search?q=set:3ed&unique=cards',
        baseCards: [], 
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    }
};

const MTG_HIT_NAMES = new Set([
    "Black Lotus", "Mox Sapphire", "Mox Jet", "Mox Ruby", "Mox Emerald", "Mox Pearl", 
    "Ancestral Recall", "Time Walk", "Timetwister",
    "Badlands", "Bayou", "Plateau", "Savannah", "Scrubland", 
    "Taiga", "Tropical Island", "Tundra", "Underground Sea", "Volcanic Island",
    "Wheel of Fortune"
]);

/**
 * Hydrates the chosen MTG card pool from Scryfall API with pagination.
 */
export async function ensureSetData(setKey) {
    const config = MTG_CONFIGS[setKey];
    if (!config) throw new Error(`Unknown MTG set code: ${setKey}`);
    if (config.baseCards.length > 0) return config;

    let nextUrl = config.apiUrl;
    const allCards = [];

    while (nextUrl) {
        const response = await fetch(nextUrl);
        if (!response.ok) throw new Error(`Failed to fetch from Scryfall for: ${setKey}`);
        const data = await response.json();
        
        allCards.push(...data.data);
        nextUrl = data.has_more ? data.next_page : null;
    }

    config.baseCards = allCards.map((card, index) => ({
        n: index + 1,
        id: card.id,
        name: card.name,
        rarity: card.rarity,
        frontImg: card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal,
        backImg: 'https://backs.scryfall.io/large/0/a/0aeebaf5-8c7d-4636-9e82-8c27447861f7.jpg'
    }));

    // Populate standard rarity & customized hit pools
    config.pools.hits = config.baseCards.filter(c => MTG_HIT_NAMES.has(c.name));
    config.pools.rare = config.baseCards.filter(c => c.rarity === 'rare' || c.rarity === 'mythic');
    config.pools.uncommon = config.baseCards.filter(c => c.rarity === 'uncommon');
    config.pools.common = config.baseCards.filter(c => c.rarity === 'common' || c.rarity === 'land');

    return config;
}