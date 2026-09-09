// sets/mtg/mtg-ecl.js

export const ECL_CONFIG = {
    setKey: 'mtgecl',
    name: 'Lorwyn Eclipsed (Collector Booster)',
    code: 'ecl',
    year: 2026,
    isCollectorBooster: true,
    maxCount: 498,
    coverImage: 'card_images/mtg_sets/mtg_ecl_collectorboosterwrapper.jpg',
    themeColor: '#1e3d59',
    hitCardNames: ["Bitterbloom Bearer"],
    
    hitPoolKeys: new Set([
        'foilFableMythic',
        'foilBorderlessRare',
        'foilBorderlessMythic',
        'foilReversibleShock',
        'foilSpecialGuests',
        'japanShowcaseFoil',
        'japanShowcaseFracture',
        'serializedBitterbloom'
    ]),

    slotQueries: {
        foilCommon: "set:ecl r:c is:foil -type:basic",
        foilUncommon: "set:ecl r:u is:foil -is:showcase",
        uncommonFable: "set:ecl r:u is:foil (frame:showcase OR border:borderless OR frame:extendedart)",
        foilLand: "(type:land type:basic) set:ecl is:fullart is:foil",
        foilRare: "set:ecl rarity:r is:foil",
        foilMythic: "set:ecl rarity:m is:foil -is:showcase",
        eccRareExtended: "is:extended set:ecc rarity:r",
        eccMythicBorderless: "is:borderless set:ecc rarity:m",
        extendedRare: "(rarity:r OR rarity:m) set:ecl is:nonfoil is:extendedart",
        fableRare: "rarity:r set:ecl -is:japanshowcase frame:showcase is:nonfoil",
        fableMythic: "rarity:m set:ecl -is:japanshowcase frame:showcase is:nonfoil",
        borderlessRare: "is:borderless set:ecl rarity:r -is:showcase -type:land -is:serialized is:nonfoil",
        borderlessMythic: "is:borderless set:ecl rarity:m -is:showcase -type:land -is:serialized is:nonfoil",
        reversibleShock: "is:shockland set:ecl rarity:r is:reversible is:nonfoil",
        foilExtendedRare: "rarity:r set:ecl -is:japanshowcase frame:extendedart is:foil",
        foilFableRare: "rarity:r set:ecl -is:japanshowcase frame:showcase is:foil",
        foilFableMythic: "rarity:m set:ecl -is:japanshowcase frame:showcase is:foil",
        foilBorderlessRare: "is:borderless set:ecl rarity:r -is:showcase -type:land -is:serialized is:foil",
        foilBorderlessMythic: "is:borderless set:ecl rarity:m -is:showcase -type:land -is:serialized is:foil",
        foilReversibleShock: "is:shockland set:ecl rarity:r is:reversible is:foil",
        foilSpecialGuests: "set:spg date:ecl is:foil",
        japanShowcaseFoil: "rarity:m set:ecl is:japanshowcase is:foil",
        japanShowcaseFracture: "rarity:m set:ecl is:japanshowcase is:fracturefoil",
        serializedBitterbloom: "set:ecl is:serialized is:foil",
        foilToken: "set:tecl is:foil",
        artCard: "set:aecl"
    }
};

export function renderECLSubcategoryChecklist(containerEl, savedBaseIds, baseCardsOrConfig, optionalConfig) {
    const setDataset = (optionalConfig && optionalConfig.collectorPools) 
        ? optionalConfig 
        : ((baseCardsOrConfig && baseCardsOrConfig.collectorPools) ? baseCardsOrConfig : {});

    const pools = setDataset.collectorPools || {};

    let allSavedIds = new Set();
    try {
        const lsData = JSON.parse(localStorage.getItem('mtgecl')) || {};
        if (Array.isArray(lsData.base)) lsData.base.forEach(id => allSavedIds.add(String(id)));
        if (Array.isArray(lsData.spectra)) lsData.spectra.forEach(id => allSavedIds.add(String(id)));
    } catch(e) {}

    const subCategorySlots = [
        {
            id: "slot-1",
            name: "Slot 1: Foil Booster Fun Rare / Mythic",
            totalCards: 128,
            getCards: () => [
                ...(pools.serializedBitterbloom || []),
                ...(pools.japanShowcaseFracture || []),
                ...(pools.japanShowcaseFoil || []),
                ...(pools.foilSpecialGuests || []),
                ...(pools.foilReversibleShock || []),
                ...(pools.foilBorderlessMythic || []),
                ...(pools.foilBorderlessRare || []),
                ...(pools.foilFableMythic || []),
                ...(pools.foilFableRare || []),
                ...(pools.foilExtendedRare || [])
            ].filter(card => card && String(card.id).endsWith('_f'))
        },
        {
            id: "slot-2",
            name: "Slot 2: Non-Foil Booster Fun Rare / Mythic",
            totalCards: 87,
            getCards: () => [
                ...(pools.reversibleShock || []),
                ...(pools.borderlessMythic || []),
                ...(pools.borderlessRare || []),
                ...(pools.fableMythic || []),
                ...(pools.fableRare || []),
                ...(pools.extendedRare || [])
            ].filter(card => card && String(card.id).endsWith('_nf'))
        },
        {
            id: "slot-3",
            name: "Slot 3: Non-Foil Commander (ECC) Rare/Mythic",
            totalCards: 24,
            getCards: () => [
                ...(pools.eccMythicBorderless || []),
                ...(pools.eccRareExtended || [])
            ].filter(card => card && String(card.id).endsWith('_nf'))
        },
        {
            id: "slot-4",
            name: "Slot 4: Traditional Foil Rare/Mythic",
            totalCards: 87,
            getCards: () => [
                ...(pools.foilMythic || []),
                ...(pools.foilRare || [])
            ].filter(card => card && String(card.id).endsWith('_f'))
        },
        {
            id: "slot-5",
            name: "Slot 5: Foil Full-Art Basic Land",
            totalCards: 5,
            getCards: () => (pools.foilLand || []).filter(card => card && String(card.id).endsWith('_f'))
        },
        {
            id: "slot-6",
            name: "Slot 6: Traditional Foil Uncommon",
            totalCards: 110,
            getCards: () => [
                ...(pools.uncommonFable || []),
                ...(pools.foilUncommon || [])
            ].filter(card => card && String(card.id).endsWith('_f'))
        },
        {
            id: "slot-7",
            name: "Slot 7: Traditional Foil Common",
            totalCards: 81,
            getCards: () => (pools.foilCommon || []).filter(card => card && String(card.id).endsWith('_f'))
        },
        {
            id: "slot-8",
            name: "Slot 8: Art Card or Token",
            totalCards: 67,
            getCards: () => [
                ...(pools.foilToken || []),
                ...(pools.artCard || [])
            ]
        }
    ];

    // STRICT COMPOSITE MATCH: Compares exact composite ID ending in _f or _nf against LocalStorage
    const isCardCollected = (card) => {
        const cid = String(card.id || '');
        return cid ? allSavedIds.has(cid) : false;
    };

    let html = `<div class="checklist-subcategories-container">`;

    subCategorySlots.forEach((slot) => {
        const rawCards = slot.getCards();

        const slotCards = [];
        const seenIds = new Set();
        for (const card of rawCards) {
            if (card && card.id && !seenIds.has(card.id)) {
                seenIds.add(card.id);
                slotCards.push(card);
            }
        }

        const collectedInSlot = slotCards.filter(isCardCollected).length;
        const totalInSlot = slotCards.length || slot.totalCards;

        html += `
            <div class="checklist-subcategory-group" id="${slot.id}" style="margin-bottom: 2rem;">
                <div class="subcategory-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                    <h4 style="font-size: 1rem; color: var(--accent-gold); margin: 0;">${slot.name}</h4>
                    <span class="subcategory-count" style="font-size: 0.85rem; color: var(--text-sub);">${collectedInSlot} / ${totalInSlot}</span>
                </div>
                <div class="subcategory-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(68px, 1fr)); gap: 0.5rem;">
        `;

        slotCards.forEach((card) => {
            const isPulled = isCardCollected(card);
            const safeName = (card.name || '').replace(/"/g, '&quot;');
            const backImg = card.backImg || "card_images/mtg_sets/Magic_the_Gathering_Card_Back.jpg";
            const displayNum = card.collectorNumber || card.n || '---';

            html += `
                <div class="col-slot ${isPulled ? 'filled' : 'no-image'}" 
                     data-card-id="${card.id}" 
                     data-front-img="${card.frontImg || ''}" 
                     data-back-img="${backImg}" 
                     data-card-name="${safeName}" 
                     id="col-base-${card.id}">
                    ${isPulled 
                        ? `<img src="${card.frontImg}">`
                        : `<span class="col-num">#${displayNum}</span><span class="col-name">${card.name}</span>`
                    }
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    html += `</div>`;
    containerEl.innerHTML = html;

    const slots = containerEl.querySelectorAll('.col-slot');
    slots.forEach((slot) => {
        slot.addEventListener('click', () => {
            const isPulled = slot.classList.contains('filled');
            if (isPulled) {
                const frontImg = slot.getAttribute('data-front-img');
                const backImg = slot.getAttribute('data-back-img');
                if (typeof window.showLightbox === 'function') {
                    window.showLightbox(frontImg, backImg);
                }
            }
        });
    });
}