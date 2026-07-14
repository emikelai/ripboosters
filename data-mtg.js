// Magic: The Gathering Set Configuration & Scryfall API Loader

export const MTG_CONFIGS = {
    mtglea: {
        code: "lea",
        name: "Limited Edition Alpha",
        maxCount: 295,
        baseCards: [],
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    },
    mtgleb: {
        code: "leb",
        name: "Limited Edition Beta",
        maxCount: 302,
        baseCards: [],
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    },
    mtg2ed: {
        code: "2ed",
        name: "Unlimited Edition",
        maxCount: 302,
        baseCards: [],
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    },
    mtgarn: {
        code: "arn",
        name: "Arabian Nights",
        maxCount: 92,
        baseCards: [],
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    },
    mtgatq: {
        code: "atq",
        name: "Antiquities",
        maxCount: 100,
        baseCards: [],
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    },
    mtg3ed: {
        code: "3ed",
        name: "Revised Edition",
        maxCount: 306,
        baseCards: [],
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    },
    mtgleg: {
        code: "leg",
        name: "Legends",
        maxCount: 310,
        baseCards: [],
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    },
    mtgdrk: {
        code: "drk",
        name: "The Dark",
        maxCount: 119,
        baseCards: [],
        pools: { rare: [], uncommon: [], common: [], hits: [] }
    }
};

// High-value historical chase cards to showcase in the "Hits Showcase" grid
const MTG_CHASE_LIST = [
    "Black Lotus", "Ancestral Recall", "Time Walk", "Mox Sapphire", "Mox Jet", "Mox Ruby", "Mox Emerald", "Mox Pearl", "Timetwister",
    "Volcanic Island", "Underground Sea", "Tundra", "Tropical Island", "Badlands", "Taiga", "Savannah", "Scrubland", "Bayou", "Plateau",
    "Bazaar of Baghdad", "Library of Alexandria", "Juzám Djinn", "Drop of Honey", "Ali from Cairo",
    "Mishra's Workshop", "Candelabra of Tawnos", "Mishra's Factory", "Strip Mine",
    "Tabernacle at Pendrell Vale", "Moat", "Chains of Mephistopheles", "Nether Void", "Angus Mackenzie", "Hazezon Tamar",
    "Ball Lightning", "Blood Moon", "Maze of Ith", "Tormod's Crypt"
];

/**
 * Dynamically fetches card data from Scryfall API for a given set
 * if it hasn't been cached in memory yet.
 */
export async function ensureSetData(setKey) {
    const config = MTG_CONFIGS[setKey];
    if (!config) throw new Error(`Unknown MTG set key: ${setKey}`);

    // Return immediately if Scryfall data is already populated
    if (config.baseCards.length > 0) return;

    const setCode = config.code;
    let url = `https://api.scryfall.com/cards/search?q=set%3A${setCode}&unique=cards`;
    let allCards = [];

    // Paginate through Scryfall API responses
    while (url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Scryfall API error: ${res.status}`);
        const data = await res.json();
        allCards = allCards.concat(data.data);
        url = data.has_more ? data.next_page : null;
    }

    // Filter out cards that don't belong in standard packs (e.g., basic lands or tokens)
    const validCards = allCards.filter(card => {
        if (card.layout && ["token", "double_faced_token", "emblem"].includes(card.layout)) return false;
        if (card.type_line && card.type_line.startsWith("Basic Land")) {
            return false;
        }
        return true;
    });

    // Format Scryfall cards to match the app's standard data structure
    config.baseCards = validCards.map((card, index) => {
        const frontImg = card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal || "card_images/card_back.jpg";
        
        // Local source of truth card back asset path
        const backImg = "card_images/mtg_sets/Magic_the_Gathering_Card_Back.jpg";

        return {
            n: card.collector_number || String(index + 1),
            name: card.name,
            rarity: card.rarity,
            frontImg: frontImg,
            backImg: backImg
        };
    });

    // Distribute cards into standard rarity pools for pack-generation simulations
    config.pools.common = config.baseCards.filter(c => c.rarity === "common");
    config.pools.uncommon = config.baseCards.filter(c => c.rarity === "uncommon");
    config.pools.rare = config.baseCards.filter(c => c.rarity === "rare" || c.rarity === "mythic");

    // Fallback: Promote uncommons to the Rare Slot if an early expansion has no rare tags
    if (config.pools.rare.length === 0) {
        config.pools.rare = config.pools.uncommon;
    }

    // Extract designated high-value chase cards into the Hits pool
    config.pools.hits = config.baseCards.filter(c => 
        MTG_CHASE_LIST.some(chaseName => c.name.toLowerCase().includes(chaseName.toLowerCase()))
    );

    // Dynamic scale limit adjusting the checklist bounds to match the actual catalog length fetched
    config.maxCount = config.baseCards.length;
}