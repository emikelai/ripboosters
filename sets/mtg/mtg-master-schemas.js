// sets/mtg/mtg-master-schemas.js

const ECL_MASTER_SCHEMA = [
    {
        slotNumber: 1,
        title: "1 Foil Booster Fun Rare / Mythic",
        isFoil: true,
        isHitSlot: true,
        subPools: [
            { weight: 30.4, query: "rarity:r set:ecl -is:japanshowcase frame:extendedart is:foil", isFoil: true, isHitSlot: false },
            { weight: 27.2, query: "rarity:r set:ecl -is:japanshowcase frame:showcase is:foil", isFoil: true, isHitSlot: false },
            { weight: 7.3,  query: "rarity:m set:ecl -is:japanshowcase frame:showcase is:foil", isFoil: true, isHitSlot: true, hitRank: 6 },
            { weight: 5.2,  query: "is:borderless set:ecl rarity:r -is:showcase -type:land -is:serialized is:foil", isFoil: true, isHitSlot: true, hitRank: 5 },
            { weight: 4.2,  query: "is:borderless set:ecl rarity:m -is:showcase -type:land -is:serialized is:foil", isFoil: true, isHitSlot: true, hitRank: 3 },
            { weight: 5.2,  query: "is:shockland set:ecl rarity:r is:reversible is:foil", isFoil: true, isHitSlot: true, hitRank: 4 },
            { weight: 10.5, query: "set:spg date:ecl is:foil", isFoil: true, isHitSlot: true, hitRank: 8 },
            { weight: 9.0,  query: "rarity:m set:ecl is:japanshowcase is:foil", isFoil: true, isHitSlot: true, hitRank: 7 },
            { weight: 0.8,  query: "rarity:m set:ecl is:japanshowcase is:fracturefoil", isFoil: true, isHitSlot: true, hitRank: 2 },
            { weight: 0.2,  query: "set:ecl is:serialized is:foil", isFoil: true, isHitSlot: true, hitRank: 1 }
        ]
    },
    {
        slotNumber: 2,
        title: "1 Non-Foil Booster Fun Rare / Mythic #1",
        isFoil: false,
        isHitSlot: false,
        subPools: [
            { weight: 37.7, query: "(rarity:r OR rarity:m) set:ecl is:nonfoil is:extendedart", isFoil: false, isHitSlot: false },
            { weight: 33.7, query: "rarity:r set:ecl -is:japanshowcase frame:showcase is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 9.1,  query: "rarity:m set:ecl -is:japanshowcase frame:showcase is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 13.0, query: "is:borderless set:ecl rarity:r -is:showcase -type:land -is:serialized is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 4.5,  query: "is:borderless set:ecl rarity:m -is:showcase -type:land -is:serialized is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 2.0,  query: "is:shockland set:ecl rarity:r is:reversible is:nonfoil", isFoil: false, isHitSlot: false }
        ]
    },
    {
        slotNumber: 3,
        title: "1 Non-Foil Booster Fun Rare / Mythic #2",
        isFoil: false,
        isHitSlot: false,
        subPools: [
            { weight: 37.7, query: "(rarity:r OR rarity:m) set:ecl is:nonfoil is:extendedart", isFoil: false, isHitSlot: false },
            { weight: 33.7, query: "rarity:r set:ecl -is:japanshowcase frame:showcase is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 9.1,  query: "rarity:m set:ecl -is:japanshowcase frame:showcase is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 13.0, query: "is:borderless set:ecl rarity:r -is:showcase -type:land -is:serialized is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 4.5,  query: "is:borderless set:ecl rarity:m -is:showcase -type:land -is:serialized is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 2.0,  query: "is:shockland set:ecl rarity:r is:reversible is:nonfoil", isFoil: false, isHitSlot: false }
        ]
    },
    {
        slotNumber: 4,
        title: "1 Non-Foil Commander (ECC) Rare / Mythic",
        isFoil: false,
        isHitSlot: false,
        subPools: [
            { weight: 91.0, query: "is:extended set:ecc rarity:r", isFoil: false, isHitSlot: false },
            { weight: 9.0,  query: "is:borderless set:ecc rarity:m", isFoil: false, isHitSlot: false }
        ]
    },
    {
        slotNumber: 5,
        title: "1 Traditional Foil Rare or Mythic",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 85.5, query: "set:ecl rarity:r is:foil", isFoil: true, isHitSlot: false },
            { weight: 14.5, query: "set:ecl rarity:m is:foil -is:showcase", isFoil: true, isHitSlot: false }
        ]
    },
    {
        slotNumber: 6,
        title: "1 Traditional Foil Full-Art Basic Land",
        query: "(type:land type:basic) set:ecl is:fullart is:foil",
        isFoil: true,
        isHitSlot: false,
        hitRank: 0
    },
    {
        slotNumber: 7,
        title: "1 Traditional Foil Uncommon #1",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 63.6, query: "set:ecl r:u is:foil -is:showcase", isFoil: true, isHitSlot: false },
            { weight: 36.4, query: "set:ecl r:u is:foil (frame:showcase OR border:borderless OR frame:extendedart)", isFoil: true, isHitSlot: false }
        ]
    },
    {
        slotNumber: 8,
        title: "1 Traditional Foil Uncommon #2",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 63.6, query: "set:ecl r:u is:foil -is:showcase", isFoil: true, isHitSlot: false },
            { weight: 36.4, query: "set:ecl r:u is:foil (frame:showcase OR border:borderless OR frame:extendedart)", isFoil: true, isHitSlot: false }
        ]
    },
    {
        slotNumber: 9,
        title: "1 Traditional Foil Uncommon #3",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 63.6, query: "set:ecl r:u is:foil -is:showcase", isFoil: true, isHitSlot: false },
            { weight: 36.4, query: "set:ecl r:u is:foil (frame:showcase OR border:borderless OR frame:extendedart)", isFoil: true, isHitSlot: false }
        ]
    },
    {
        slotNumber: 10,
        title: "1 Traditional Foil Uncommon #4",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 63.6, query: "set:ecl r:u is:foil -is:showcase", isFoil: true, isHitSlot: false },
            { weight: 36.4, query: "set:ecl r:u is:foil (frame:showcase OR border:borderless OR frame:extendedart)", isFoil: true, isHitSlot: false }
        ]
    },
    { slotNumber: 11, title: "1 Traditional Foil Common #1", query: "set:ecl r:c is:foil -type:basic", isFoil: true, isHitSlot: false, hitRank: 0 },
    { slotNumber: 12, title: "1 Traditional Foil Common #2", query: "set:ecl r:c is:foil -type:basic", isFoil: true, isHitSlot: false, hitRank: 0 },
    { slotNumber: 13, title: "1 Traditional Foil Common #3", query: "set:ecl r:c is:foil -type:basic", isFoil: true, isHitSlot: false, hitRank: 0 },
    { slotNumber: 14, title: "1 Traditional Foil Common #4", query: "set:ecl r:c is:foil -type:basic", isFoil: true, isHitSlot: false, hitRank: 0 },
    { slotNumber: 15, title: "1 Traditional Foil Common #5", query: "set:ecl r:c is:foil -type:basic", isFoil: true, isHitSlot: false, hitRank: 0 },
    {
        slotNumber: 16,
        title: "1 Art Card or Foil Double-Sided Token",
        isFoil: false,
        isHitSlot: false,
        subPools: [
            { weight: 65.0, query: "set:tecl is:foil", isFoil: true, isHitSlot: false },
            { weight: 35.0, query: "set:aecl", isFoil: false, isHitSlot: false }
        ]
    }
];

const HOB_NONFOIL_BOOSTER_FUN_SUBPOOLS = [
    { weight: 21.0, query: "e:hob cn>=285 cn<=312 r:r is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 2.5,  query: "e:hob cn>=285 cn<=312 r:m is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 18.5, query: "set:hob r:r is:nonfoil -type:basic -(type:land AND ci=2) cn>=214 cn<=238", isFoil: false, isHitSlot: false },
    { weight: 4.5,  query: "set:hob r:m is:nonfoil -type:basic -(type:land AND ci=2) cn>=214 cn<=238", isFoil: false, isHitSlot: false },
    { weight: 7.5,  query: "e:hob cn>=239 cn<=248 r:r is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 3.0,  query: "e:hob cn>=239 cn<=248 r:m is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 6.5,  query: "e:hob (cn=201 OR cn=204 OR cn=205 OR cn=207 OR cn=208 OR cn=210 OR cn=211 OR cn=212 OR cn=213) is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 9.0,  query: "e:hoc cn>=1 cn<=12 is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 20.0, query: "e:hoc cn>=13 cn<=52 is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 5.5,  query: "e:hoc cn>=98 cn<=106 is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 2.0,  query: "e:hoc cn>=93 cn<=97 is:nonfoil", isFoil: false, isHitSlot: false }
];

const HOB_FOIL_UNCOMMON_SUBPOOLS = [
    { weight: 64.0, query: "set:hob r:u is:foil -type:basic -(type:land AND ci=2) cn<199", isFoil: true, isHitSlot: false },
    { weight: 18.0, query: "set:hob r:u is:foil -type:basic -(type:land AND ci=2) cn>=214 cn<=238", isFoil: true, isHitSlot: false },
    { weight: 8.0,  query: "set:hob r:u is:foil -type:basic -(type:land AND ci=2) (cn=199 OR cn=202 OR cn=203 OR cn=206)", isFoil: true, isHitSlot: false },
    { weight: 10.0, query: "set:hob r:u is:surge is:foil", isFoil: true, isHitSlot: false }
];

const HOB_FOIL_COMMON_SUBPOOLS = [
    { weight: 86.0, query: "set:hob r:c is:foil -type:basic -(type:land AND ci=2) cn<199", isFoil: true, isHitSlot: false },
    { weight: 10.0, query: "set:hob r:c is:foil -type:basic type:land ci=2", isFoil: true, isHitSlot: false },
    { weight: 4.0,  query: "set:hob (cn=200 OR cn=209) is:foil", isFoil: true, isHitSlot: false }
];

const HOB_MASTER_SCHEMA = [
    {
        slotNumber: 1,
        title: "1 Foil Booster Fun Rare / Mythic",
        isFoil: true,
        isHitSlot: true,
        subPools: [
            { weight: 22.0, query: "e:hob cn>=285 cn<=312 r:r is:foil", isFoil: true, isHitSlot: false },
            { weight: 2.8,  query: "e:hob cn>=285 cn<=312 r:m is:foil", isFoil: true, isHitSlot: false },
            { weight: 19.0, query: "set:hob r:r is:foil -type:basic -(type:land AND ci=2) cn>=214 cn<=238", isFoil: true, isHitSlot: false },
            { weight: 4.5,  query: "set:hob r:m is:foil -type:basic -(type:land AND ci=2) cn>=214 cn<=238", isFoil: true, isHitSlot: false },
            { weight: 7.5,  query: "e:hob cn>=239 cn<=248 is:foil r:r", isFoil: true, isHitSlot: false },
            { weight: 3.0,  query: "e:hob cn>=239 cn<=248 is:foil r:m", isFoil: true, isHitSlot: false },
            { weight: 7.0,  query: "e:hob is:foil (cn=199 OR cn=201 OR cn=204 OR cn=205 OR cn=207 OR cn=210 OR cn=211 OR cn=212 OR cn=213)", isFoil: true, isHitSlot: false },
            { weight: 18.0, query: "e:hoc cn>=53 cn<=92 is:foil", isFoil: true, isHitSlot: true, hitRank: 7 },
            { weight: 7.5,  query: "e:hob cn>=250 cn<=274 is:surge r:r", isFoil: true, isHitSlot: true, hitRank: 6 },
            { weight: 2.2,  query: "e:hob cn>=250 cn<=274 is:surge r:m", isFoil: true, isHitSlot: true, hitRank: 5 },
            { weight: 3.2,  query: "e:hob cn>=275 cn<=284 r:r is:foil", isFoil: true, isHitSlot: true, hitRank: 4 },
            { weight: 1.5,  query: "e:hob cn>=275 cn<=284 r:m is:foil", isFoil: true, isHitSlot: true, hitRank: 3 },
            { weight: 1.5,  query: "e:hoc cn>=93 cn<=97 is:foil", isFoil: true, isHitSlot: true, hitRank: 2 },
            { weight: 0.3,  query: "e:hob cn>=249 cn<=249 is:foil", isFoil: true, isHitSlot: true, hitRank: 1 }
        ]
    },
    {
        slotNumber: 2,
        title: "1 Non-Foil Booster Fun Rare / Mythic #1",
        isFoil: false,
        isHitSlot: false,
        subPools: HOB_NONFOIL_BOOSTER_FUN_SUBPOOLS
    },
    {
        slotNumber: 3,
        title: "1 Non-Foil Booster Fun Rare / Mythic #2",
        isFoil: false,
        isHitSlot: false,
        subPools: HOB_NONFOIL_BOOSTER_FUN_SUBPOOLS
    },
    {
        slotNumber: 4,
        title: "1 Traditional Foil Rare / Mythic #1",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 85.5, query: "set:hob r:r is:foil -frame:showcase -border:borderless -frame:extendedart cn<214", isFoil: true, isHitSlot: false },
            { weight: 14.5, query: "set:hob r:m is:foil -frame:showcase -border:borderless -frame:extendedart cn<214", isFoil: true, isHitSlot: false }
        ]
    },
    {
        slotNumber: 5,
        title: "1 Traditional Foil Rare / Mythic #2",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 85.5, query: "set:hob r:r is:foil -frame:showcase -border:borderless -frame:extendedart cn<214", isFoil: true, isHitSlot: false },
            { weight: 14.5, query: "set:hob r:m is:foil -frame:showcase -border:borderless -frame:extendedart cn<214", isFoil: true, isHitSlot: false }
        ]
    },
    {
        slotNumber: 6,
        title: "1 Foil Middle-earth Journey Land",
        query: "e:hob cn>=194 cn<=198 is:foil",
        isFoil: true,
        isHitSlot: false,
        hitRank: 0
    },
    {
        slotNumber: 7,
        title: "1 Foil Uncommon / Scene Card #1",
        isFoil: true,
        isHitSlot: false,
        subPools: HOB_FOIL_UNCOMMON_SUBPOOLS
    },
    {
        slotNumber: 8,
        title: "1 Foil Uncommon / Scene Card #2",
        isFoil: true,
        isHitSlot: false,
        subPools: HOB_FOIL_UNCOMMON_SUBPOOLS
    },
    {
        slotNumber: 9,
        title: "1 Foil Uncommon / Scene Card #3",
        isFoil: true,
        isHitSlot: false,
        subPools: HOB_FOIL_UNCOMMON_SUBPOOLS
    },
    {
        slotNumber: 10,
        title: "1 Foil Uncommon / Scene Card #4",
        isFoil: true,
        isHitSlot: false,
        subPools: HOB_FOIL_UNCOMMON_SUBPOOLS
    },
    {
        slotNumber: 11,
        title: "1 Foil Common / Scene Card #1",
        isFoil: true,
        isHitSlot: false,
        subPools: HOB_FOIL_COMMON_SUBPOOLS
    },
    {
        slotNumber: 12,
        title: "1 Foil Common / Scene Card #2",
        isFoil: true,
        isHitSlot: false,
        subPools: HOB_FOIL_COMMON_SUBPOOLS
    },
    {
        slotNumber: 13,
        title: "1 Foil Common / Scene Card #3",
        isFoil: true,
        isHitSlot: false,
        subPools: HOB_FOIL_COMMON_SUBPOOLS
    },
    {
        slotNumber: 14,
        title: "1 Foil Common / Scene Card #4",
        isFoil: true,
        isHitSlot: false,
        subPools: HOB_FOIL_COMMON_SUBPOOLS
    },
    {
        slotNumber: 15,
        title: "1 Foil Common / Scene Card #5",
        isFoil: true,
        isHitSlot: false,
        subPools: HOB_FOIL_COMMON_SUBPOOLS
    },
    {
        slotNumber: 16,
        title: "1 Art Card or Token",
        isFoil: false,
        isHitSlot: false,
        subPools: [
            { weight: 65.0, query: "set:thob is:foil", isFoil: true, isHitSlot: false },
            { weight: 35.0, query: "set:ahob", isFoil: false, isHitSlot: false }
        ]
    }
];

export const MASTER_MTG_SCHEMAS = {
    // ---------------------------------------------------------------------------
    // TEST SET ENTRY (Swap which schema block is active for instant testing)
    // ---------------------------------------------------------------------------
    mtgtest: ECL_MASTER_SCHEMA,

    // ---------------------------------------------------------------------------
    // LORWYN ECLIPSED (mtgecl) - LIVE MASTER SCHEMA
    // ---------------------------------------------------------------------------
    mtgecl: ECL_MASTER_SCHEMA,

    // ---------------------------------------------------------------------------
    // THE HOBBIT (mtghob) - LIVE MASTER SCHEMA
    // ---------------------------------------------------------------------------
    mtghob: HOB_MASTER_SCHEMA
};