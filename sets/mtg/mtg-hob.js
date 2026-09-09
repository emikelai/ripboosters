// sets/mtg/mtg-hob.js

export const HOB_CONFIG = {
    setKey: 'mtghob',
    name: 'The Hobbit (Collector Booster)',
    code: 'hob',
    year: 2026,
    isCollectorBooster: true,
    maxCount: 321,
    coverImage: 'card_images/mtg_sets/mtg_hob_collectorboosterwrapper.jpg',
    themeColor: '#1b4f72',
    hitCardNames: ["Bilbo Baggins", "Thorin Oakenshield", "Smaug the Magnificent", "Gollum", "Gandalf"],

    hitPoolKeys: new Set([
        'surgeFoilClassicArtist',
        'surgeFoilDragonHoardRare',
        'surgeFoilDragonHoardMythic',
        'surgeFoilBookCoverRare',
        'surgeFoilBookCoverMythic',
        'foilDwarvishLanguage',
        'smaugHeadliner'
    ]),

    slotQueries: {
        foilCommon: "set:hob r:c is:foil -type:basic -(type:land AND ci=2)",
        foilCommonDualLand: "set:hob r:c is:foil -type:basic type:land ci=2",
        foilCommonScene: "set:hob (cn=200 OR cn=209)",
        foilUncommon: "set:hob r:uc is:foil -type:basic -(type:land AND ci=2)",
        foilUncommonScene: "set:hob r:uc is:foil -type:basic -(type:land AND ci=2) (cn=199 OR cn=202 OR cn=203 OR cn=206)",
        foilDragonHoardUncommon: "set:hob r:uc is:foil -type:basic -(type:land AND ci=2) cn>=214 cn<=238",
        surgeFoilDragonHoardUncommon: "set:hob r:uc is:surge is:foil",
        foilLand: "e:hob cn>=194 cn<=198",
        foilRare: "set:hob r:r is:foil -frame:showcase -border:borderless -frame:extendedart cn<214",
        foilMythic: "set:hob r:m is:foil -frame:showcase -border:borderless -frame:extendedart cn<214",
        hobSceneRare: "e:hob (cn=201 OR cn=204 OR cn=205 OR cn=207 OR cn=208 OR cn=210 OR cn=211 OR cn=212 OR cn=213)",
        hocSceneRare: "e:hoc cn>=1 cn<=12",
        dragonHoardRare: "set:hob r:r is:nonfoil -type:basic -(type:land AND ci=2) cn>=214 cn<=238",
        dragonHoardMythic: "set:hob r:m is:nonfoil -type:basic -(type:land AND ci=2) cn>=214 cn<=238",
        bookCoverRare: "e:hob cn>=239 cn<=248 r:r",
        bookCoverMythic: "e:hob cn>=239 cn<=248 r:m",
        classicArtist: "e:hoc cn>=13 cn<=52",
        dwarvishLanguage: "e:hoc cn>=93 cn<=97",
        extendedHobRare: "e:hob cn>=285 cn<=312 r:r is:nonfoil",
        extendedHobMythic: "e:hob cn>=285 cn<=312 r:m is:nonfoil",
        extendedHocMythic: "e:hoc cn>=98 cn<=106",
        foilHobSceneRare: "e:hob is:foil (cn=199 OR cn=201 OR cn=204 OR cn=205 OR cn=207 OR cn=210 OR cn=211 OR cn=212 OR cn=213)",
        foilDragonHoardRare: "set:hob r:r is:foil -type:basic -(type:land AND ci=2) cn>=214 cn<=238",
        foilDragonHoardMythic: "set:hob r:m is:foil -type:basic -(type:land AND ci=2) cn>=214 cn<=238",
        surgeFoilDragonHoardRare: "e:hob cn>=250 cn<=274 is:surge r:r",
        surgeFoilDragonHoardMythic: "e:hob cn>=250 cn<=274 is:surge r:m",
        foilBookCoverRare: "e:hob cn>=239 cn<=248 is:foil r:r",
        foilBookCoverMythic: "e:hob cn>=239 cn<=248 is:foil r:m",
        surgeFoilBookCoverRare: "e:hob cn>=275 cn<=284 r:r",
        surgeFoilBookCoverMythic: "e:hob cn>=275 cn<=284 r:m",
        surgeFoilClassicArtist: "e:hoc cn>=53 cn<=92",
        foilDwarvishLanguage: "e:hoc cn>=93 cn<=97 is:foil",
        foilExtendedHobRare: "e:hob cn>=285 cn<=312 r:r is:foil",
        foilExtendedHobMythic: "e:hob cn>=285 cn<=312 r:m is:foil",
        smaugHeadliner: "e:hob cn>=249 cn<=249",
        foilToken: "set:thob is:foil",
        artCard: "set:ahob"
    }
};

export function renderHOBSubcategoryChecklist(containerEl, savedBaseIds, baseCardsOrConfig, optionalConfig) {
    const setDataset = (optionalConfig && optionalConfig.collectorPools) 
        ? optionalConfig 
        : ((baseCardsOrConfig && baseCardsOrConfig.collectorPools) ? baseCardsOrConfig : {});

    const pools = setDataset.collectorPools || {};

    let allSavedIds = new Set();
    try {
        const lsData = JSON.parse(localStorage.getItem('mtghob')) || {};
        if (Array.isArray(lsData.base)) lsData.base.forEach(id => allSavedIds.add(String(id)));
        if (Array.isArray(lsData.spectra)) lsData.spectra.forEach(id => allSavedIds.add(String(id)));
    } catch(e) {}

    const subCategorySlots = [
        {
            id: "slot-1",
            name: "Slot 1: Foil Booster Fun Rare / Mythic",
            getCards: () => [
                ...(pools.smaugHeadliner || []),
                ...(pools.foilExtendedHobMythic || []),
                ...(pools.foilDwarvishLanguage || []),
                ...(pools.surgeFoilBookCoverMythic || []),
                ...(pools.surgeFoilBookCoverRare || []),
                ...(pools.surgeFoilDragonHoardMythic || []),
                ...(pools.foilBookCoverMythic || []),
                ...(pools.foilBookCoverRare || []),
                ...(pools.foilDragonHoardMythic || []),
                ...(pools.surgeFoilDragonHoardRare || []),
                ...(pools.foilHobSceneRare || []),
                ...(pools.surgeFoilClassicArtist || []),
                ...(pools.foilDragonHoardRare || []),
                ...(pools.foilExtendedHobRare || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-2",
            name: "Slot 2-3: Non-Foil Booster Fun Rare / Mythic",
            getCards: () => [
                ...(pools.extendedHobMythic || []),
                ...(pools.dwarvishLanguage || []),
                ...(pools.bookCoverMythic || []),
                ...(pools.bookCoverRare || []),
                ...(pools.dragonHoardMythic || []),
                ...(pools.extendedHocMythic || []),
                ...(pools.hobSceneRare || []),
                ...(pools.classicArtist || []),
                ...(pools.dragonHoardRare || []),
                ...(pools.hocSceneRare || []),
                ...(pools.extendedHobRare || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_nf` }))
        },
        {
            id: "slot-4",
            name: "Slot 4-5: Traditional Foil Rare/Mythic",
            getCards: () => [
                ...(pools.foilMythic || []),
                ...(pools.foilRare || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-6",
            name: "Slot 6: Foil Middle-earth Journey Land",
            getCards: () => (pools.foilLand || []).map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-7",
            name: "Slot 7-10: Traditional Foil Uncommon / Scene",
            getCards: () => [
                ...(pools.surgeFoilDragonHoardUncommon || []),
                ...(pools.foilDragonHoardUncommon || []),
                ...(pools.foilUncommonScene || []),
                ...(pools.foilUncommon || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-11",
            name: "Slot 11-15: Traditional Foil Common / Scene",
            getCards: () => [
                ...(pools.foilCommonScene || []),
                ...(pools.foilCommonDualLand || []),
                ...(pools.foilCommon || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-16",
            name: "Slot 16: Art Card or Token",
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