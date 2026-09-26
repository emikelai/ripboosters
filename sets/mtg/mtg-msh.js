// sets/mtg/mtg-msh.js

export const MSH_CONFIG = {
    setKey: 'mtgmsh',
    name: 'Marvel Super Heroes (Collector Booster)',
    code: 'msh',
    year: 2026,
    isCollectorBooster: true,
    maxCount: 512,
    coverImage: 'card_images/mtg_sets/mtg_msh_collectorboosterwrapper.jpg',
    themeColor: '#e63946',
    hitCardNames: ["The Mind Stone", "Spider-Man", "Wolverine", "Captain America", "Iron Man", "Thanos", "Venom", "Deadpool"],
    
    hitPoolKeys: new Set([
        'cosmicMindStone',
        'borderlessGauntlet',
        'classicComicFoil',
        'foilPanelMythic',
        'foilLogoMythic',
        'foilSceneMythic',
        'foilExtendedMythic',
        'sourceMaterialFoil'
    ]),

    slotQueries: {
        // Slot 1-3: Common Cards (3 cards)
        foilCommon: "set:msh r:c is:foil -type:basic -(type:land AND ci=2)",
        foilCommonDualLand: "set:msh r:c is:foil ci=2",

        // Slot 4-5: Uncommon Cards (2 cards)
        foilUncommon: "set:msh r:uc is:foil",

        // Slot 6-7: Common MSC Cards (2 cards)
        mscFoilCommonReprint: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:c is:reprint is:foil",
        mscFoilCommonNew: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:c -is:reprint is:foil",

        // Slot 8: Uncommon MSC Card (1 card)
        mscFoilUncommonReprint: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:uc is:reprint is:foil",
        mscFoilUncommonNew: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:uc -is:reprint is:foil",

        // Slot 9: Common or Uncommon Scene Card (1 card)
        foilSceneCommon: "is:scene e:msh rarity:c is:foil",
        foilSceneUncommon: "is:scene e:msh rarity:uc is:foil",

        // Slot 10: Basic Land Card (1 card)
        landCityChaos: "e:msh (cn:277 OR cn:279 OR cn:281 OR cn:283 OR cn:285) is:foil",
        landCityCalm: "e:msh (cn:278 OR cn:280 OR cn:282 OR cn:284 OR cn:286) is:foil",

        // Slot 11: Rare or Mythic Rare Card (1 card)
        foilMainSetRare: "e:msh rarity:r is:foil -is:extended -is:borderless",
        foilMainSetMythic: "e:msh rarity:m is:foil -is:extended -is:borderless",
        foilSceneMdfcMythic: "e:msh rarity:m is:foil is:scene is:modal_dfc",
        foilLogoMdfcMythic: "e:msh cn>=352 cn<=379 is:modal_dfc rarity:m is:foil",
        mscFoilNewRare: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:r -is:reprint is:foil",
        mscFoilNewMythic: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:m -is:reprint is:foil",
        mscFoilRareReprint: "e:msc ((cn>=583 cn<=828) OR cn:874) rarity:r is:reprint is:foil",
        welcomeMythic: "e:msc cn>=829 cn<=833 is:foil rarity:m",

        // Slot 12: Commander Booster Fun Card (1 card)
        mscExtendedRareNonfoil: "e:msc cn>=291 cn<=500 rarity:r is:nonfoil",
        mscExtendedMythicNonfoil: "e:msc cn>=291 cn<=500 rarity:m is:nonfoil",
        mscBorderlessFaceCommander: "e:msc cn>=1 cn<=7 is:nonfoil",

        // Slot 13: Rare or Mythic Rare Booster Fun Card (1 card)
        extendedRareNonfoil: "set:msh is:nonfoil rarity:r is:extended",
        extendedMythicNonfoil: "set:msh is:nonfoil rarity:m is:extended",
        sceneRareNonfoil: "e:msh cn>=314 cn<=351 rarity:r is:nonfoil",
        sceneMythicNonfoil: "e:msh cn>=314 cn<=351 rarity:m is:nonfoil",
        logoRareNonfoil: "e:msh cn>=352 cn<=379 rarity:r is:nonfoil",
        logoMythicNonfoil: "e:msh cn>=352 cn<=379 rarity:m is:nonfoil",
        panelRareNonfoil: "e:msh cn>=297 cn<=313 rarity:r is:nonfoil",
        panelMythicNonfoil: "e:msh cn>=297 cn<=313 rarity:m is:nonfoil",
        sceneBoxHeroes: "e:msc cn>=501 cn<=506 is:nonfoil",
        sceneBoxVillains: "e:msc cn>=507 cn<=512 is:nonfoil",
        borderlessRareLandNonfoil: "set:msh type:land is:borderless is:nonfoil",
        borderlessSourceMaterialNonfoil: "e:mar cn>=41 cn<=100 is:nonfoil is:borderless",

        // Slot 14: Source Material Card (1 card)
        sourceMaterialNonfoil: "e:mar cn>=41 cn<=100 is:nonfoil",
        sourceMaterialFoil: "e:mar cn>=41 cn<=100 is:foil",

        // Slot 15: Foil Booster Fun Rare or Mythic Rare Card (1 card)
        foilExtendedRare: "set:msh is:extended is:foil rarity:r",
        foilExtendedMythic: "set:msh is:extended is:foil rarity:m",
        foilSceneRare: "e:msh cn>=314 cn<=351 is:foil rarity:r",
        foilSceneMythic: "e:msh cn>=314 cn<=351 is:foil rarity:m -is:mdfc",
        foilLogoRare: "e:msh cn>=352 cn<=379 is:foil rarity:r",
        foilLogoMythic: "e:msh cn>=352 cn<=379 is:foil rarity:m -is:mdfc",
        foilPanelRare: "e:msh cn>=297 cn<=313 rarity:r is:foil",
        foilPanelMythic: "e:msh cn>=297 cn<=313 rarity:r is:foil",
        foilBorderlessRareLand: "e:msh is:foil is:borderless type:land rarity:r",
        classicComicFoil: "e:msh cn>=387 cn<=401 is:foil",
        borderlessGauntlet: "e:msh cn=386 is:foil",
        cosmicMindStone: "e:msh cn=385 is:foil",

        // Slot 16: Art Card or Token (1 card)
        foilToken: "set:tmsh is:foil",
        artCard: "set:amsh"
    }
};

export function renderMSHSubcategoryChecklist(containerEl, savedBaseIds, baseCardsOrConfig, optionalConfig) {
    const setDataset = (optionalConfig && optionalConfig.collectorPools) 
        ? optionalConfig 
        : ((baseCardsOrConfig && baseCardsOrConfig.collectorPools) ? baseCardsOrConfig : {});

    const pools = setDataset.collectorPools || {};

    let allSavedIds = new Set();
    try {
        const lsData = JSON.parse(localStorage.getItem('mtgmsh')) || {};
        if (Array.isArray(lsData.base)) lsData.base.forEach(id => allSavedIds.add(String(id)));
        if (Array.isArray(lsData.spectra)) lsData.spectra.forEach(id => allSavedIds.add(String(id)));
    } catch(e) {}

    const subCategorySlots = [
        {
            id: "slot-1",
            name: "Slot 1: Foil Booster Fun Rare / Mythic",
            getCards: () => [
                ...(pools.cosmicMindStone || []),
                ...(pools.borderlessGauntlet || []),
                ...(pools.classicComicFoil || []),
                ...(pools.foilPanelMythic || []),
                ...(pools.foilPanelRare || []),
                ...(pools.foilLogoMythic || []),
                ...(pools.foilLogoRare || []),
                ...(pools.foilSceneMythic || []),
                ...(pools.foilSceneRare || []),
                ...(pools.foilBorderlessRareLand || []),
                ...(pools.foilExtendedMythic || []),
                ...(pools.foilExtendedRare || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-2",
            name: "Slot 2: Source Material Card",
            getCards: () => [
                ...(pools.sourceMaterialFoil || []).map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` })),
                ...(pools.sourceMaterialNonfoil || []).map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_nf` }))
            ]
        },
        {
            id: "slot-3",
            name: "Slot 3: Non-Foil Booster Fun Rare / Mythic",
            getCards: () => [
                ...(pools.borderlessSourceMaterialNonfoil || []),
                ...(pools.borderlessRareLandNonfoil || []),
                ...(pools.sceneBoxVillains || []),
                ...(pools.sceneBoxHeroes || []),
                ...(pools.panelMythicNonfoil || []),
                ...(pools.panelRareNonfoil || []),
                ...(pools.logoMythicNonfoil || []),
                ...(pools.logoRareNonfoil || []),
                ...(pools.sceneMythicNonfoil || []),
                ...(pools.sceneRareNonfoil || []),
                ...(pools.extendedMythicNonfoil || []),
                ...(pools.extendedRareNonfoil || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_nf` }))
        },
        {
            id: "slot-4",
            name: "Slot 4: Non-Foil Commander Booster Fun",
            getCards: () => [
                ...(pools.mscBorderlessFaceCommander || []),
                ...(pools.mscExtendedMythicNonfoil || []),
                ...(pools.mscExtendedRareNonfoil || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_nf` }))
        },
        {
            id: "slot-5",
            name: "Slot 5: Foil Rare / Mythic",
            getCards: () => [
                ...(pools.welcomeMythic || []),
                ...(pools.mscFoilRareReprint || []),
                ...(pools.mscFoilNewMythic || []),
                ...(pools.mscFoilNewRare || []),
                ...(pools.foilLogoMdfcMythic || []),
                ...(pools.foilSceneMdfcMythic || []),
                ...(pools.foilMainSetMythic || []),
                ...(pools.foilMainSetRare || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-6",
            name: "Slot 6: Foil Basic Land",
            getCards: () => [
                ...(pools.landCityCalm || []),
                ...(pools.landCityChaos || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-7",
            name: "Slot 7: Foil Common / Uncommon Scene Card",
            getCards: () => [
                ...(pools.foilSceneUncommon || []),
                ...(pools.foilSceneCommon || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-8",
            name: "Slot 8: Foil Uncommon MSC Card",
            getCards: () => [
                ...(pools.mscFoilUncommonNew || []),
                ...(pools.mscFoilUncommonReprint || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-9",
            name: "Slot 9: Foil Common MSC Cards",
            getCards: () => [
                ...(pools.mscFoilCommonNew || []),
                ...(pools.mscFoilCommonReprint || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-10",
            name: "Slot 10: Foil Main Set Uncommons",
            getCards: () => (pools.foilUncommon || []).map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-11",
            name: "Slot 11: Foil Main Set Commons & Dual Lands",
            getCards: () => [
                ...(pools.foilCommonDualLand || []),
                ...(pools.foilCommon || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-12",
            name: "Slot 12: Art Card or Token",
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