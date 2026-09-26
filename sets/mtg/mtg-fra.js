// sets/mtg/mtg-fra.js

export const FRA_CONFIG = {
    setKey: 'mtgfra',
    name: 'Reality Fracture (Collector Booster)',
    code: 'fra',
    year: 2026,
    isCollectorBooster: true,
    maxCount: 450,
    coverImage: 'card_images/mtg_sets/mtg_fra_collectorboosterwrapper.jpg',
    themeColor: '#4a154b',
    hitCardNames: ["Fractured Time", "Reality's End"],
    
    hitPoolKeys: new Set([
        'serializedFracture',
        'foilFractureShowcase',
        'foilBorderlessMythic',
        'foilSpecialGuests'
    ]),

    slotQueries: {
        foilCommon: "set:fra r:c is:foil -type:basic",
        foilUncommon: "set:fra r:u is:foil -is:showcase",
        uncommonShowcase: "set:fra r:u is:foil (frame:showcase OR border:borderless)",
        foilLand: "(type:land type:basic) set:fra is:fullart is:foil",
        foilRare: "set:fra rarity:r is:foil -is:showcase",
        foilMythic: "set:fra rarity:m is:foil -is:showcase",
        extendedRare: "(rarity:r OR rarity:m) set:fra is:nonfoil is:extendedart",
        showcaseRare: "rarity:r set:fra frame:showcase is:nonfoil",
        showcaseMythic: "rarity:m set:fra frame:showcase is:nonfoil",
        borderlessRare: "is:borderless set:fra rarity:r -is:showcase -type:land is:nonfoil",
        borderlessMythic: "is:borderless set:fra rarity:m -is:showcase -type:land is:nonfoil",
        foilExtendedRare: "rarity:r set:fra frame:extendedart is:foil",
        foilShowcaseRare: "rarity:r set:fra frame:showcase is:foil",
        foilShowcaseMythic: "rarity:m set:fra frame:showcase is:foil",
        foilBorderlessRare: "is:borderless set:fra rarity:r -is:showcase -type:land is:foil",
        foilBorderlessMythic: "is:borderless set:fra rarity:m -is:showcase -type:land is:foil",
        foilSpecialGuests: "set:spg date:fra is:foil",
        foilFractureShowcase: "rarity:m set:fra is:showcase is:fracturefoil",
        serializedFracture: "set:fra is:serialized is:foil",
        foilToken: "set:tfra is:foil",
        artCard: "set:afra"
    }
};

export function renderFRASubcategoryChecklist(containerEl, savedBaseIds, baseCardsOrConfig, optionalConfig) {
    const setDataset = (optionalConfig && optionalConfig.collectorPools) 
        ? optionalConfig 
        : ((baseCardsOrConfig && baseCardsOrConfig.collectorPools) ? baseCardsOrConfig : {});

    const pools = setDataset.collectorPools || {};

    let allSavedIds = new Set();
    try {
        const lsData = JSON.parse(localStorage.getItem('mtgfra')) || {};
        if (Array.isArray(lsData.base)) lsData.base.forEach(id => allSavedIds.add(String(id)));
        if (Array.isArray(lsData.spectra)) lsData.spectra.forEach(id => allSavedIds.add(String(id)));
    } catch(e) {}

    const subCategorySlots = [
        {
            id: "slot-1",
            name: "Slot 1: Foil Booster Fun Rare / Mythic",
            getCards: () => [
                ...(pools.serializedFracture || []),
                ...(pools.foilFractureShowcase || []),
                ...(pools.foilSpecialGuests || []),
                ...(pools.foilBorderlessMythic || []),
                ...(pools.foilBorderlessRare || []),
                ...(pools.foilShowcaseMythic || []),
                ...(pools.foilShowcaseRare || []),
                ...(pools.foilExtendedRare || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-2",
            name: "Slot 2: Non-Foil Booster Fun Rare / Mythic",
            getCards: () => [
                ...(pools.borderlessMythic || []),
                ...(pools.borderlessRare || []),
                ...(pools.showcaseMythic || []),
                ...(pools.showcaseRare || []),
                ...(pools.extendedRare || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_nf` }))
        },
        {
            id: "slot-3",
            name: "Slot 3: Traditional Foil Rare / Mythic",
            getCards: () => [
                ...(pools.foilMythic || []),
                ...(pools.foilRare || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-4",
            name: "Slot 4: Foil Basic Land",
            getCards: () => (pools.foilLand || []).map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-5",
            name: "Slot 5: Traditional Foil Uncommon",
            getCards: () => [
                ...(pools.uncommonShowcase || []),
                ...(pools.foilUncommon || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-6",
            name: "Slot 6: Traditional Foil Common",
            getCards: () => (pools.foilCommon || []).map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-7",
            name: "Slot 7: Art Card or Token",
            getCards: () => [
                ...(pools.foilToken || []),
                ...(pools.artCard || [])
            ]
        }
    ];

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
        const totalInSlot = slotCards.length;

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