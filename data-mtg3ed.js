// data-mtg3ed.js
export const MTG3ED_CONFIG = {
    setKey: 'mtg3ed',
    name: 'Revised Edition',
    meta: '1994 · Wizards of the Coast · 15 cards per pack',
    maxCount: 306,
    apiUrl: 'https://api.scryfall.com/cards/search?q=set:3ed&unique=cards',
    baseCards: [], 
    pools: {
        rare: [],
        uncommon: [],
        common: []
    }
};

/**
 * Hydrates the card pool from the live Scryfall API using paginated traversal loops.
 */
export async function ensureSetData() {
    if (MTG3ED_CONFIG.baseCards.length > 0) return MTG3ED_CONFIG;

    let nextUrl = MTG3ED_CONFIG.apiUrl;
    const allCards = [];

    while (nextUrl) {
        const response = await fetch(nextUrl);
        if (!response.ok) throw new Error('Failed to fetch from Scryfall');
        const data = await response.json();
        
        allCards.push(...data.data);
        nextUrl = data.has_more ? data.next_page : null;
    }

    // Standardize into app infrastructure mapping system
    MTG3ED_CONFIG.baseCards = allCards.map((card, index) => ({
        n: index + 1,
        id: card.id,
        name: card.name,
        rarity: card.rarity, // 'rare' | 'uncommon' | 'common' (Basic lands map to common here)
        frontImg: card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal,
        backImg: 'https://cards.scryfall.io/large/front/0/a/0aeebaf5-8c7d-4abb-896b-e52d7ee88616.jpg'
    }));

    // Isolate into rarity buckets for efficient high-speed random array selection
    MTG3ED_CONFIG.pools.rare = MTG3ED_CONFIG.baseCards.filter(c => c.rarity === 'rare' || c.rarity === 'mythic');
    MTG3ED_CONFIG.pools.uncommon = MTG3ED_CONFIG.baseCards.filter(c => c.rarity === 'uncommon');
    MTG3ED_CONFIG.pools.common = MTG3ED_CONFIG.baseCards.filter(c => c.rarity === 'common' || c.rarity === 'land');

    return MTG3ED_CONFIG;
}