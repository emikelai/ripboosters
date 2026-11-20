// data-mtg.js - Universal Scryfall API Fetch Engine & Collector Set Loader
import { SETS_REGISTRY } from './sets-config.js';
import { TMT_CONFIG } from './sets/mtg/mtg-tmt.js';
import { SOS_CONFIG } from './sets/mtg/mtg-sos.js';
import { MASTER_MTG_SCHEMAS } from './sets/mtg/mtg-master-schemas.js';

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
    mtgtmt: TMT_CONFIG,
    mtgsos: SOS_CONFIG
};

const cache = {};
const memoryQueryCache = new Map();
const SET_CARDS_CACHE = new Map();
const QUERY_CACHE_PREFIX = 'rb_sf_slim_v3_';

function slimScryfallCard(card) {
    return {
        id: card.id,
        name: card.name,
        rarity: card.rarity,
        set: card.set,
        layout: card.layout || '',
        type_line: card.type_line || '',
        border_color: card.border_color || '',
        full_art: Boolean(card.full_art),
        reprint: Boolean(card.reprint),
        lang: card.lang || 'en',
        collector_number: card.collector_number || '',
        color_identity: card.color_identity || [],
        foil: card.foil,
        finishes: card.finishes || [],
        serialized: card.serialized || false,
        promo_types: card.promo_types || [],
        frame_effects: card.frame_effects || [],
        keywords: card.keywords || [],
        image_uris: card.image_uris ? { normal: card.image_uris.normal } : null,
        card_faces: Array.isArray(card.card_faces)
            ? card.card_faces.map(f => ({
                image_uris: f.image_uris ? { normal: f.image_uris.normal } : null
            }))
            : null
    };
}

let lastRequestTime = 0;
async function rateLimitedFetch(url) {
    const minGapMs = 220;
    const now = Date.now();
    const wait = Math.max(0, lastRequestTime + minGapMs - now);
    if (wait > 0) await new Promise(r => setTimeout(r, wait));
    lastRequestTime = Date.now();
    return fetch(url);
}

async function fetchScryfallQuery(query) {
    if (memoryQueryCache.has(query)) {
        return memoryQueryCache.get(query);
    }

    const cacheKey = QUERY_CACHE_PREFIX + query;
    try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed)) {
                memoryQueryCache.set(query, parsed);
                return parsed;
            }
        }
    } catch (_) {}

    let url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=prints`;
    let cards = [];
    let retries = 0;
    let hadError = false;

    while (url) {
        try {
            const response = await rateLimitedFetch(url);
            if (response.status === 429) {
                const backoff = Math.min(8000, 2000 * Math.pow(2, retries));
                retries++;
                if (retries <= 3) {
                    await new Promise(r => setTimeout(r, backoff));
                    continue;
                }
                hadError = true;
                break;
            }
            if (response.status === 404) {
                // Scryfall returns 404 when a valid search matches 0 cards
                cards = [];
                break;
            }
            if (!response.ok) {
                if (response.status >= 500 && retries < 2) {
                    retries++;
                    await new Promise(r => setTimeout(r, 1000 * retries));
                    continue;
                }
                hadError = true;
                break;
            }
            retries = 0;
            const json = await response.json();
            if (json && Array.isArray(json.data)) {
                cards = cards.concat(json.data.map(slimScryfallCard));
            }
            url = (json && json.has_more) ? json.next_page : null;
        } catch (err) {
            if (retries < 2) {
                retries++;
                await new Promise(r => setTimeout(r, 1500 * retries));
                continue;
            }
            hadError = true;
            console.error("Failed to fetch query page from Scryfall:", query, err);
            break;
        }
    }

    if (!hadError) {
        memoryQueryCache.set(query, cards);
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify(cards));
        } catch (_) {}
    }

    return cards;
}

// Fetch an entire set code once (e.g. "hob", "hoc", "msh", "msc", "mar", "spg")
async function fetchAllCardsForSetCode(setCode) {
    const code = setCode.toLowerCase();
    if (SET_CARDS_CACHE.has(code)) return SET_CARDS_CACHE.get(code);
    const cards = await fetchScryfallQuery(`e:${code} include:extras`);
    SET_CARDS_CACHE.set(code, cards);
    return cards;
}

// Compile a single Scryfall term into a card predicate function (returns null if unsupported)
function compileSingleTerm(rawTerm, state) {
    let term = rawTerm;
    let negated = false;
    if (term.startsWith('-')) {
        negated = true;
        term = term.slice(1);
    }
    const lower = term.toLowerCase();
    let fn = null;

    if (lower.startsWith('e:') || lower.startsWith('set:')) {
        const sCode = lower.split(':')[1];
        if (!negated) state.targetSets.add(sCode);
        fn = c => (c.set || '').toLowerCase() === sCode;
    } else if (lower.startsWith('cn>=')) {
        const min = parseInt(lower.slice(4), 10);
        fn = c => parseInt(String(c.collector_number).replace(/\D/g, ''), 10) >= min;
    } else if (lower.startsWith('cn<=')) {
        const max = parseInt(lower.slice(4), 10);
        fn = c => parseInt(String(c.collector_number).replace(/\D/g, ''), 10) <= max;
    } else if (lower.startsWith('cn>')) {
        const min = parseInt(lower.slice(3), 10);
        fn = c => parseInt(String(c.collector_number).replace(/\D/g, ''), 10) > min;
    } else if (lower.startsWith('cn<')) {
        const max = parseInt(lower.slice(3), 10);
        fn = c => parseInt(String(c.collector_number).replace(/\D/g, ''), 10) < max;
    } else if (lower.startsWith('cn:') || lower.startsWith('cn=')) {
        const exact = lower.slice(3);
        fn = c => String(c.collector_number).toLowerCase() === exact;
    } else if (lower.startsWith('r:') || lower.startsWith('rarity:')) {
        const rVal = lower.split(':')[1];
        const map = { c: 'common', common: 'common', u: 'uncommon', uncommon: 'uncommon', r: 'rare', rare: 'rare', m: 'mythic', mythic: 'mythic' };
        const expected = map[rVal];
        if (!expected) return null;
        fn = c => c.rarity === expected;
    } else if (lower.startsWith('lang:')) {
        const lVal = lower.slice(5);
        fn = c => (c.lang || 'en').toLowerCase() === lVal;
    } else if (lower.startsWith('frame:')) {
        const fVal = lower.slice(6);
        if (fVal === 'extendedart' || fVal === 'extended') {
            fn = c => Array.isArray(c.frame_effects) && c.frame_effects.includes('extendedart');
        } else if (fVal === 'showcase') {
            fn = c => Array.isArray(c.frame_effects) && c.frame_effects.includes('showcase');
        } else {
            fn = c => Array.isArray(c.frame_effects) && c.frame_effects.includes(fVal);
        }
    } else if (lower.startsWith('border:')) {
        const bVal = lower.slice(7);
        fn = c => (c.border_color || '').toLowerCase() === bVal;
    } else if (lower.startsWith('t:') || lower.startsWith('type:')) {
        const tVal = lower.split(':')[1];
        fn = c => (c.type_line || '').toLowerCase().includes(tVal);
    } else if (lower === 'ci=2' || lower === 'id=2') {
        fn = c => Array.isArray(c.color_identity) && c.color_identity.length === 2;
    } else if (lower === 'is:nonfoil') {
        fn = c => Array.isArray(c.finishes) && c.finishes.includes('nonfoil');
    } else if (lower === 'is:foil') {
        fn = c => Array.isArray(c.finishes) && c.finishes.includes('foil');
    } else if (lower === 'is:fracturefoil') {
        fn = c => Array.isArray(c.finishes) && c.finishes.includes('fracturefoil');
    } else if (lower === 'is:surge' || lower === 'is:surgefoil') {
        fn = c => Array.isArray(c.finishes) && c.finishes.includes('surgefoil');
    } else if (lower === 'is:serialized') {
        fn = c => c.serialized === true || (Array.isArray(c.promo_types) && c.promo_types.includes('serialized'));
    } else if (lower === 'is:borderless') {
        fn = c => c.border_color === 'borderless';
    } else if (lower === 'is:extended' || lower === 'is:extendedart') {
        fn = c => Array.isArray(c.frame_effects) && c.frame_effects.includes('extendedart');
    } else if (lower === 'is:showcase') {
        fn = c => Array.isArray(c.frame_effects) && c.frame_effects.includes('showcase');
    } else if (lower === 'is:japanshowcase') {
        fn = c => Array.isArray(c.promo_types) && c.promo_types.includes('japanshowcase');
    } else if (lower === 'is:boosterfun') {
        fn = c => Array.isArray(c.promo_types) && c.promo_types.includes('boosterfun');
    } else if (lower === 'is:fullart') {
        fn = c => c.full_art === true;
    } else if (lower === 'is:reprint') {
        fn = c => c.reprint === true;
    } else if (lower === 'is:scene') {
        fn = c => Array.isArray(c.frame_effects) && c.frame_effects.includes('scene');
    } else if (lower === 'is:mdfc' || lower === 'is:modal_dfc') {
        fn = c => c.layout === 'modal_dfc';
    } else if (lower === 'is:reversible') {
        fn = c => c.layout === 'reversible_card';
    } else if (lower === 'is:shockland') {
        const shockNames = new Set([
            "Hallowed Fountain", "Watery Grave", "Blood Crypt", "Stomping Ground", "Temple Garden",
            "Godless Shrine", "Steam Vents", "Overgrown Tomb", "Sacred Foundry", "Breeding Pool"
        ]);
        fn = c => shockNames.has(c.name);
    } else {
        return null;
    }

    return negated ? (c => !fn(c)) : fn;
}

// Parse full Scryfall boolean expressions including AND, OR, parentheses, and -negation
function tryFilterSetCardsLocally(query, setCardPools) {
    const rawTokens = query.match(/-\(|\(|\)|[^\s()]+/g);
    if (!rawTokens || rawTokens.length === 0) return null;

    const state = { targetSets: new Set(), unsupported: false };
    let pos = 0;

    function parseOr() {
        let left = parseAnd();
        if (!left) return null;
        while (pos < rawTokens.length && rawTokens[pos].toUpperCase() === 'OR') {
            pos++;
            const right = parseAnd();
            if (!right) return null;
            const prevLeft = left;
            left = c => prevLeft(c) || right(c);
        }
        return left;
    }

    function parseAnd() {
        const parts = [];
        while (pos < rawTokens.length) {
            const tok = rawTokens[pos];
            if (tok === ')') break;
            if (tok.toUpperCase() === 'OR') break;
            if (tok.toUpperCase() === 'AND') {
                pos++;
                continue;
            }
            const atom = parsePrimary();
            if (!atom) return null;
            parts.push(atom);
        }
        if (parts.length === 0) return null;
        return parts.length === 1 ? parts[0] : (c => parts.every(fn => fn(c)));
    }

    function parsePrimary() {
        if (pos >= rawTokens.length) return null;
        const tok = rawTokens[pos];
        if (tok === '-(') {
            pos++;
            const inner = parseOr();
            if (!inner || rawTokens[pos] !== ')') return null;
            pos++;
            return c => !inner(c);
        }
        if (tok === '(') {
            pos++;
            const inner = parseOr();
            if (!inner || rawTokens[pos] !== ')') return null;
            pos++;
            return inner;
        }
        pos++;
        return compileSingleTerm(tok, state);
    }

    const rootPredicate = parseOr();
    if (!rootPredicate || pos !== rawTokens.length || state.targetSets.size === 0) {
        return null;
    }

    const candidateCards = [];
    for (const sCode of state.targetSets) {
        if (!setCardPools.has(sCode)) return null;
        candidateCards.push(...setCardPools.get(sCode));
    }

    return candidateCards.filter(rootPredicate);
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
    const setReg = SETS_REGISTRY.find(s => s.key === setKey);
    const isMasterSchema = Boolean(setReg && setReg.isMasterSchema && MASTER_MTG_SCHEMAS[setKey]);

    if (cache[setKey] && cache[setKey].baseCards) {
        if ((setKey !== 'mtgsos' && setKey !== 'mtgtmt' && !isMasterSchema) || cache[setKey].collectorPools) {
            return cache[setKey];
        }
    }

    // --- Universal Master Schema Loader (Bulk Set Prefetch + Local Filter + Fallback) ---
    if (isMasterSchema) {
        const schema = MASTER_MTG_SCHEMAS[setKey];
        const collectorPools = {};
        const baseCards = [];
        const hitsSet = new Set();
        const cardObjMap = new Map();

        const uniqueQueries = new Map();
        const registerQuery = (query, isFoil) => {
            const qKey = `${query}__${isFoil ? 'f' : 'nf'}`;
            if (!uniqueQueries.has(qKey)) {
                uniqueQueries.set(qKey, { query, isFoil });
            }
        };

        for (const slotDef of schema) {
            if (Array.isArray(slotDef.subPools) && slotDef.subPools.length > 0) {
                for (const sp of slotDef.subPools) {
                    const spFoil = sp.isFoil !== undefined ? sp.isFoil : slotDef.isFoil;
                    registerQuery(sp.query, spFoil);
                }
            } else if (slotDef.query) {
                registerQuery(slotDef.query, slotDef.isFoil);
            }
        }

        if (setKey === 'mtghob') {
            registerQuery('e:hob cn>=199 cn<=213', false);
            registerQuery('e:hoc cn>=1 cn<=6', false);
        } else if (setKey === 'mtgmsh') {
            registerQuery('e:msh cn>=314 cn<=351', false);
            registerQuery('e:msc cn>=501 cn<=512', false);
        }

        // 1. Discover all set codes referenced in queries and bulk-fetch each set ONCE
        const referencedSetCodes = new Set();
        for (const info of uniqueQueries.values()) {
            const matches = info.query.match(/\b(?:e|set):([a-z0-9]+)/gi) || [];
            matches.forEach(m => referencedSetCodes.add(m.split(':')[1].toLowerCase()));
        }

        const setCardPools = new Map();
        for (const code of referencedSetCodes) {
            const allCards = await fetchAllCardsForSetCode(code);
            setCardPools.set(code, allCards);
        }

        // 2. Filter locally in 0ms; only call Scryfall directly for queries with unsupported syntax (e.g. date:ecl)
        const cardsByRawQuery = new Map();
        for (const info of uniqueQueries.values()) {
            if (!cardsByRawQuery.has(info.query)) {
                const localMatch = tryFilterSetCardsLocally(info.query, setCardPools);
                if (localMatch !== null) {
                    cardsByRawQuery.set(info.query, localMatch);
                } else {
                    const cards = await fetchScryfallQuery(info.query);
                    cardsByRawQuery.set(info.query, cards);
                }
            }
        }

        const resolvedByQKey = new Map();
        for (const [qKey, info] of uniqueQueries.entries()) {
            const cards = cardsByRawQuery.get(info.query) || [];
            const pool = [];
            for (const card of cards) {
                const compositeId = info.isFoil ? `${card.id}_f` : `${card.id}_nf`;
                let cardObj = cardObjMap.get(compositeId);
                if (!cardObj) {
                    cardObj = processScryfallCard(card, 0);
                    cardObj.id = compositeId;
                    cardObj.rawId = card.id;
                    cardObj.isFoil = info.isFoil;
                    if (info.query.includes('is:serialized')) cardObj.isSerialized = true;
                    cardObjMap.set(compositeId, cardObj);
                    baseCards.push(cardObj);
                }
                pool.push(cardObj);
            }
            resolvedByQKey.set(qKey, pool);
        }

        const resolvedSchema = schema.map(slotDef => {
            if (Array.isArray(slotDef.subPools) && slotDef.subPools.length > 0) {
                const combinedCards = [];
                const seenSlotIds = new Set();

                const resolvedSubPools = slotDef.subPools.map(sp => {
                    const spFoil = sp.isFoil !== undefined ? sp.isFoil : slotDef.isFoil;
                    const spHit = sp.isHitSlot !== undefined ? sp.isHitSlot : slotDef.isHitSlot;
                    const spRank = sp.hitRank !== undefined ? sp.hitRank : (slotDef.hitRank ?? 99);
                    const qKey = `${sp.query}__${spFoil ? 'f' : 'nf'}`;
                    const cards = resolvedByQKey.get(qKey) || [];

                    cards.forEach(c => {
                        if (!seenSlotIds.has(c.id)) {
                            seenSlotIds.add(c.id);
                            combinedCards.push(c);
                        }
                        if (spHit) {
                            c.hitRank = Math.min(c.hitRank ?? 99, spRank);
                            hitsSet.add(c);
                        }
                    });

                    return {
                        weight: sp.weight,
                        cards,
                        isFoil: spFoil,
                        isHitSlot: spHit,
                        hitRank: spRank
                    };
                });

                collectorPools[slotDef.slotNumber] = combinedCards;
                return { ...slotDef, resolvedSubPools };
            } else {
                const qKey = `${slotDef.query}__${slotDef.isFoil ? 'f' : 'nf'}`;
                const slotPool = resolvedByQKey.get(qKey) || [];
                collectorPools[slotDef.slotNumber] = slotPool;

                if (slotDef.isHitSlot) {
                    slotPool.forEach(c => {
                        c.hitRank = Math.min(c.hitRank ?? 99, slotDef.hitRank ?? 99);
                        hitsSet.add(c);
                    });
                }
                return { ...slotDef };
            }
        });

        // Populate named scene pools for interlocking scene grids
        if (setKey === 'mtghob') {
            const qHob = resolvedByQKey.get('e:hob cn>=199 cn<=213__nf');
            const qHoc = resolvedByQKey.get('e:hoc cn>=1 cn<=6__nf');
            const hobSceneAll = (qHob && qHob.length > 0) ? qHob : baseCards.filter(c => c.setCode === 'hob');
            const hocSceneAll = (qHoc && qHoc.length > 0) ? qHoc : baseCards.filter(c => c.setCode === 'hoc');

            collectorPools.hobScene1 = hobSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 199 && cn <= 204;
            });
            collectorPools.hobScene2 = hobSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 205 && cn <= 213;
            });
            collectorPools.hobScene3 = hocSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 1 && cn <= 6;
            });
        } else if (setKey === 'mtgmsh') {
            const qMsh = resolvedByQKey.get('e:msh cn>=314 cn<=351__nf');
            const qMsc = resolvedByQKey.get('e:msc cn>=501 cn<=512__nf');
            const mshSceneAll = (qMsh && qMsh.length > 0) ? qMsh : baseCards.filter(c => c.setCode === 'msh');
            const mscSceneAll = (qMsc && qMsc.length > 0) ? qMsc : baseCards.filter(c => c.setCode === 'msc');
            const bbqNums = new Set(['328', '346', '345', '350', '331']);

            collectorPools.sceneCapVsHydra = mshSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 314 && cn <= 319;
            });
            collectorPools.sceneFantasticFamily = mshSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 320 && cn <= 323;
            });
            collectorPools.sceneDaredevilStreetFight = mshSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 324 && cn <= 327;
            });
            collectorPools.sceneHulksSmash = mshSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 328 && cn <= 333;
            });
            collectorPools.sceneCosmicCube = mshSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 334 && cn <= 351;
            });
            collectorPools.sceneAvengersBBQ = mshSceneAll.filter(c => bbqNums.has(String(c.collectorNumber)));
            collectorPools.sceneBoxHeroes = mscSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 501 && cn <= 506;
            });
            collectorPools.sceneBoxVillains = mscSceneAll.filter(c => {
                const cn = parseInt(c.collectorNumber, 10);
                return cn >= 507 && cn <= 512;
            });
        }

        // Pair double-sided token back images if a token pool lacks explicit back faces
        for (const pool of Object.values(collectorPools)) {
            const tokenCards = pool.filter(c => c.setCode && c.setCode.startsWith('t') && c.typeLine.includes('Token'));
            if (tokenCards.length > 1) {
                for (let t = 0; t < tokenCards.length; t++) {
                    if (tokenCards[t].backImg === "card_images/mtg_sets/Magic_the_Gathering_Card_Back.jpg") {
                        const partnerIdx = (t + 1) % tokenCards.length;
                        if (tokenCards[partnerIdx] && tokenCards[partnerIdx].frontImg) {
                            tokenCards[t].backImg = tokenCards[partnerIdx].frontImg;
                        }
                    }
                }
            }
        }

        baseCards.forEach((c, idx) => { c.n = idx + 1; });

        cache[setKey] = {
            baseCards,
            collectorPools,
            pools: { hits: Array.from(hitsSet) },
            masterSchema: resolvedSchema
        };
        return cache[setKey];
    }

    const config = MTG_CONFIGS[setKey];
    if (!config) throw new Error(`Unknown MTG Set Key: ${setKey}`);

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