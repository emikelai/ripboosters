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

const FRA_NONFOIL_BOOSTER_FUN_SUBPOOLS = [
    { weight: 23.1, query: "e:fra cn>=291 cn<=319 r:r is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 5.0,  query: "e:fra cn>=291 cn<=319 r:m is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 8.3,  query: "e:fra cn>=320 cn<=333 r:r is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 6.6,  query: "e:fra cn>=320 cn<=333 r:m is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 29.8, query: "e:fra cn>=359 cn<=391 r:r is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 5.8,  query: "e:fra cn>=359 cn<=391 r:m is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 8.3,  query: "e:fra cn>=392 cn<=401 r:r is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 11.6, query: "e:fra cn>=423 cn<=437 r:r is:nonfoil", isFoil: false, isHitSlot: false },
    { weight: 1.5,  query: "e:fra cn>=423 cn<=437 r:m is:nonfoil", isFoil: false, isHitSlot: false }
];

const FRA_FOIL_ECHOED_PAIRS_UNCOMMON_SUBPOOLS = [
    { weight: 86.8, query: "e:fra cn>=195 cn<=280 r:u is:foil", isFoil: true, isHitSlot: false },
    { weight: 13.2, query: "e:fra cn>=291 cn<=319 r:u is:foil", isFoil: true, isHitSlot: false }
];

const FRA_FOIL_UNCOMMON_SUBPOOLS = [
    { weight: 89.6, query: "e:fra cn<=194 r:u is:foil", isFoil: true, isHitSlot: false },
    { weight: 10.4, query: "e:fra cn>=334 cn<=358 r:u is:foil", isFoil: true, isHitSlot: false }
];

const FRA_MASTER_SCHEMA = [
    {
        slotNumber: 1,
        title: "1 Foil Rare / Mythic Booster Fun Card",
        isFoil: true,
        isHitSlot: true,
        subPools: [
            { weight: 17.1, query: "e:fra cn>=291 cn<=319 r:r is:foil", isFoil: true, isHitSlot: false },
            { weight: 3.7,  query: "e:fra cn>=291 cn<=319 r:m is:foil", isFoil: true, isHitSlot: false },
            { weight: 22.0, query: "e:fra cn>=359 cn<=391 r:r is:foil", isFoil: true, isHitSlot: false },
            { weight: 4.3,  query: "e:fra cn>=359 cn<=391 r:m is:foil", isFoil: true, isHitSlot: false },
            { weight: 18.3, query: "e:fra cn>=334 cn<=358 r:r is:foil", isFoil: true, isHitSlot: false },
            { weight: 1.8,  query: "e:fra cn>=334 cn<=358 r:m is:foil", isFoil: true, isHitSlot: false },
            { weight: 6.1,  query: "e:fra cn>=392 cn<=401 r:r is:foil", isFoil: true, isHitSlot: false },
            { weight: 8.5,  query: "e:fra cn>=423 cn<=437 r:r is:foil", isFoil: true, isHitSlot: false },
            { weight: 1.2,  query: "e:fra cn>=423 cn<=437 r:m is:foil", isFoil: true, isHitSlot: false },
            { weight: 6.1,  query: "set:spg date:fra is:foil", isFoil: true, isHitSlot: true, hitRank: 6 },
            { weight: 9.0,  query: "e:fra cn>=403 cn<=412 is:foil", isFoil: true, isHitSlot: true, hitRank: 5 },
            { weight: 1.0,  query: "e:fra cn>=413 cn<=422 is:foil", isFoil: true, isHitSlot: true, hitRank: 4 },
            { weight: 0.4,  query: "e:fra cn>=438 cn<=461 r:r is:foil", isFoil: true, isHitSlot: true, hitRank: 3 },
            { weight: 0.4,  query: "e:fra cn>=438 cn<=461 r:m is:foil", isFoil: true, isHitSlot: true, hitRank: 2 },
            { weight: 0.1,  query: "e:fra cn=402 is:foil", isFoil: true, isHitSlot: true, hitRank: 1 }
        ]
    },
    {
        slotNumber: 2,
        title: "1 Non-Foil Booster Fun Rare / Mythic #1",
        isFoil: false,
        isHitSlot: false,
        subPools: FRA_NONFOIL_BOOSTER_FUN_SUBPOOLS
    },
    {
        slotNumber: 3,
        title: "1 Non-Foil Booster Fun Rare / Mythic #2",
        isFoil: false,
        isHitSlot: false,
        subPools: FRA_NONFOIL_BOOSTER_FUN_SUBPOOLS
    },
    {
        slotNumber: 4,
        title: "1 Non-Foil Braintwister / FRC Commander Card",
        isFoil: false,
        isHitSlot: false,
        subPools: [
            { weight: 44.8, query: "set:frc rarity:r is:nonfoil frame:showcase", isFoil: false, isHitSlot: false },
            { weight: 4.5,  query: "set:frc rarity:m is:nonfoil frame:showcase", isFoil: false, isHitSlot: false },
            { weight: 3.0,  query: "set:frc rarity:m is:nonfoil border:borderless", isFoil: false, isHitSlot: false },
            { weight: 47.7, query: "set:frc rarity:r is:nonfoil frame:extendedart", isFoil: false, isHitSlot: false }
        ]
    },
    {
        slotNumber: 5,
        title: "1 Traditional Foil Rare or Mythic",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 83.1, query: "e:fra cn<=280 rarity:r is:foil", isFoil: true, isHitSlot: false },
            { weight: 16.9, query: "e:fra cn<=280 rarity:m is:foil", isFoil: true, isHitSlot: false }
        ]
    },
    {
        slotNumber: 6,
        title: "1 Traditional Foil Basic Land",
        query: "e:fra cn>=281 cn<=290 is:foil",
        isFoil: true,
        isHitSlot: false,
        hitRank: 0
    },
    {
        slotNumber: 7,
        title: "1 Traditional Foil Echoed Pairs Uncommon #1",
        isFoil: true,
        isHitSlot: false,
        subPools: FRA_FOIL_ECHOED_PAIRS_UNCOMMON_SUBPOOLS
    },
    {
        slotNumber: 8,
        title: "1 Traditional Foil Echoed Pairs Uncommon #2",
        isFoil: true,
        isHitSlot: false,
        subPools: FRA_FOIL_ECHOED_PAIRS_UNCOMMON_SUBPOOLS
    },
    {
        slotNumber: 9,
        title: "1 Traditional Foil Echoed Pairs Uncommon #3",
        isFoil: true,
        isHitSlot: false,
        subPools: FRA_FOIL_ECHOED_PAIRS_UNCOMMON_SUBPOOLS
    },
    {
        slotNumber: 10,
        title: "1 Traditional Foil Uncommon #1",
        isFoil: true,
        isHitSlot: false,
        subPools: FRA_FOIL_UNCOMMON_SUBPOOLS
    },
    {
        slotNumber: 11,
        title: "1 Traditional Foil Uncommon #2",
        isFoil: true,
        isHitSlot: false,
        subPools: FRA_FOIL_UNCOMMON_SUBPOOLS
    },
    { slotNumber: 12, title: "1 Traditional Foil Common #1", query: "e:fra cn<=280 r:c is:foil", isFoil: true, isHitSlot: false, hitRank: 0 },
    { slotNumber: 13, title: "1 Traditional Foil Common #2", query: "e:fra cn<=280 r:c is:foil", isFoil: true, isHitSlot: false, hitRank: 0 },
    { slotNumber: 14, title: "1 Traditional Foil Common #3", query: "e:fra cn<=280 r:c is:foil", isFoil: true, isHitSlot: false, hitRank: 0 },
    { slotNumber: 15, title: "1 Traditional Foil Common #4", query: "e:fra cn<=280 r:c is:foil", isFoil: true, isHitSlot: false, hitRank: 0 },
    {
        slotNumber: 16,
        title: "1 Art Card or Traditional Foil Double-Sided Token",
        isFoil: false,
        isHitSlot: false,
        subPools: [
            { weight: 65.0, query: "set:tfra is:foil", isFoil: true, isHitSlot: false },
            { weight: 35.0, query: "set:afra", isFoil: false, isHitSlot: false }
        ]
    }
];

const MSH_FOIL_COMMON_MSC_SUBPOOLS = [
    { weight: 50.0, query: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:c is:reprint is:foil", isFoil: true, isHitSlot: false },
    { weight: 50.0, query: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:c -is:reprint is:foil", isFoil: true, isHitSlot: false }
];

const MSH_FOIL_COMMON_SUBPOOLS = [
    { weight: 89.0, query: "set:msh r:c is:foil -type:basic -(type:land AND ci=2)", isFoil: true, isHitSlot: false },
    { weight: 11.0, query: "set:msh r:c is:foil ci=2", isFoil: true, isHitSlot: false }
];

const MSH_MASTER_SCHEMA = [
    {
        slotNumber: 1,
        title: "1 Foil Booster Fun Rare / Mythic",
        isFoil: true,
        isHitSlot: true,
        subPools: [
            { weight: 31.8, query: "set:msh is:extended is:foil rarity:r", isFoil: true, isHitSlot: false },
            { weight: 2.7,  query: "set:msh is:extended is:foil rarity:m", isFoil: true, isHitSlot: true, hitRank: 7 },
            { weight: 7.3,  query: "e:msh cn>=314 cn<=351 is:foil rarity:r", isFoil: true, isHitSlot: false },
            { weight: 4.0,  query: "e:msh cn>=314 cn<=351 is:foil rarity:m -is:mdfc", isFoil: true, isHitSlot: true, hitRank: 6 },
            { weight: 17.2, query: "e:msh cn>=352 cn<=379 is:foil rarity:r", isFoil: true, isHitSlot: false },
            { weight: 3.6,  query: "e:msh cn>=352 cn<=379 is:foil rarity:m -is:mdfc", isFoil: true, isHitSlot: true, hitRank: 5 },
            { weight: 13.9, query: "e:msh cn>=297 cn<=313 rarity:r is:foil", isFoil: true, isHitSlot: false },
            { weight: 3.0,  query: "e:msh cn>=297 cn<=313 rarity:m is:foil", isFoil: true, isHitSlot: true, hitRank: 4 },
            { weight: 6.6,  query: "e:msh is:foil is:borderless type:land rarity:r", isFoil: true, isHitSlot: false },
            { weight: 9.0,  query: "e:msh cn>=387 cn<=401 is:foil", isFoil: true, isHitSlot: true, hitRank: 3 },
            { weight: 0.8,  query: "e:msh cn=386 is:foil", isFoil: true, isHitSlot: true, hitRank: 2 },
            { weight: 0.1,  query: "e:msh cn=385 is:foil", isFoil: true, isHitSlot: true, hitRank: 1 }
        ]
    },
    {
        slotNumber: 2,
        title: "1 Source Material Card",
        isFoil: false,
        isHitSlot: true,
        subPools: [
            { weight: 75.0, query: "e:mar cn>=41 cn<=100 is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 25.0, query: "e:mar cn>=41 cn<=100 is:foil", isFoil: true, isHitSlot: true, hitRank: 8 }
        ]
    },
    {
        slotNumber: 3,
        title: "1 Non-Foil Booster Fun Rare / Mythic",
        isFoil: false,
        isHitSlot: false,
        subPools: [
            { weight: 27.8, query: "set:msh is:nonfoil rarity:r is:extended", isFoil: false, isHitSlot: false },
            { weight: 2.3,  query: "set:msh is:nonfoil rarity:m is:extended", isFoil: false, isHitSlot: false },
            { weight: 6.4,  query: "e:msh cn>=314 cn<=351 rarity:r is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 4.9,  query: "e:msh cn>=314 cn<=351 rarity:m is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 15.1, query: "e:msh cn>=352 cn<=379 rarity:r is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 4.6,  query: "e:msh cn>=352 cn<=379 rarity:m is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 12.1, query: "e:msh cn>=297 cn<=313 rarity:r is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 2.6,  query: "e:msh cn>=297 cn<=313 rarity:m is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 6.95, query: "e:msc cn>=501 cn<=506 is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 6.95, query: "e:msc cn>=507 cn<=512 is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 5.8,  query: "set:msh type:land is:borderless is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 4.5,  query: "e:mar cn>=41 cn<=100 is:nonfoil is:borderless", isFoil: false, isHitSlot: false }
        ]
    },
    {
        slotNumber: 4,
        title: "1 Non-Foil Commander Booster Fun",
        isFoil: false,
        isHitSlot: false,
        subPools: [
            { weight: 93.6, query: "e:msc cn>=291 cn<=500 rarity:r is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 3.2,  query: "e:msc cn>=291 cn<=500 rarity:m is:nonfoil", isFoil: false, isHitSlot: false },
            { weight: 3.2,  query: "e:msc cn>=1 cn<=7 is:nonfoil", isFoil: false, isHitSlot: false }
        ]
    },
    {
        slotNumber: 5,
        title: "1 Traditional Foil Rare or Mythic",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 45.0, query: "e:msh rarity:r is:foil -is:extended -is:borderless", isFoil: true, isHitSlot: false },
            { weight: 9.4,  query: "e:msh rarity:m is:foil -is:extended -is:borderless", isFoil: true, isHitSlot: false },
            { weight: 1.4,  query: "e:msh rarity:m is:foil is:scene is:modal_dfc", isFoil: true, isHitSlot: false },
            { weight: 1.4,  query: "e:msh cn>=352 cn<=379 is:modal_dfc rarity:m is:foil", isFoil: true, isHitSlot: false },
            { weight: 33.8, query: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:r -is:reprint is:foil", isFoil: true, isHitSlot: false },
            { weight: 4.1,  query: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:m -is:reprint is:foil", isFoil: true, isHitSlot: false },
            { weight: 3.0,  query: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:r is:reprint is:foil", isFoil: true, isHitSlot: false },
            { weight: 1.9,  query: "e:msc cn>=829 cn<=833 is:foil rarity:m", isFoil: true, isHitSlot: false }
        ]
    },
    {
        slotNumber: 6,
        title: "1 Traditional Foil City Land",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 50.0, query: "e:msh (cn:277 OR cn:279 OR cn:281 OR cn:283 OR cn:285) is:foil", isFoil: true, isHitSlot: false },
            { weight: 50.0, query: "e:msh (cn:278 OR cn:280 OR cn:282 OR cn:284 OR cn:286) is:foil", isFoil: true, isHitSlot: false }
        ]
    },
    {
        slotNumber: 7,
        title: "1 Traditional Foil Scene Card",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 20.0, query: "is:scene e:msh rarity:c is:foil", isFoil: true, isHitSlot: false },
            { weight: 80.0, query: "is:scene e:msh rarity:u is:foil", isFoil: true, isHitSlot: false }
        ]
    },
    {
        slotNumber: 8,
        title: "1 Traditional Foil Uncommon MSC Card",
        isFoil: true,
        isHitSlot: false,
        subPools: [
            { weight: 18.6, query: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:u is:reprint is:foil", isFoil: true, isHitSlot: false },
            { weight: 81.4, query: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:u -is:reprint is:foil", isFoil: true, isHitSlot: false }
        ]
    },
    {
        slotNumber: 9,
        title: "1 Traditional Foil Common MSC Card #1",
        isFoil: true,
        isHitSlot: false,
        subPools: MSH_FOIL_COMMON_MSC_SUBPOOLS
    },
    {
        slotNumber: 10,
        title: "1 Traditional Foil Common MSC Card #2",
        isFoil: true,
        isHitSlot: false,
        subPools: MSH_FOIL_COMMON_MSC_SUBPOOLS
    },
    { slotNumber: 11, title: "1 Traditional Foil Uncommon #1", query: "set:msh r:u is:foil", isFoil: true, isHitSlot: false, hitRank: 0 },
    { slotNumber: 12, title: "1 Traditional Foil Uncommon #2", query: "set:msh r:u is:foil", isFoil: true, isHitSlot: false, hitRank: 0 },
    {
        slotNumber: 13,
        title: "1 Traditional Foil Common #1",
        isFoil: true,
        isHitSlot: false,
        subPools: MSH_FOIL_COMMON_SUBPOOLS
    },
    {
        slotNumber: 14,
        title: "1 Traditional Foil Common #2",
        isFoil: true,
        isHitSlot: false,
        subPools: MSH_FOIL_COMMON_SUBPOOLS
    },
    {
        slotNumber: 15,
        title: "1 Traditional Foil Common #3",
        isFoil: true,
        isHitSlot: false,
        subPools: MSH_FOIL_COMMON_SUBPOOLS
    },
    {
        slotNumber: 16,
        title: "1 Art Card or Double-Sided Token",
        isFoil: false,
        isHitSlot: false,
        subPools: [
            { weight: 64.0, query: "set:tmsh is:foil", isFoil: true, isHitSlot: false },
            { weight: 36.0, query: "set:amsh", isFoil: false, isHitSlot: false }
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
    mtghob: HOB_MASTER_SCHEMA,

    // ---------------------------------------------------------------------------
    // REALITY FRACTURE (mtgfra) - LIVE MASTER SCHEMA
    // ---------------------------------------------------------------------------
    mtgfra: FRA_MASTER_SCHEMA,

    // ---------------------------------------------------------------------------
    // MARVEL SUPER HEROES (mtgmsh) - LIVE MASTER SCHEMA
    // ---------------------------------------------------------------------------
    mtgmsh: MSH_MASTER_SCHEMA
};