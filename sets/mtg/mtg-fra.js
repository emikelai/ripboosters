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
    hitCardNames: ["Bloodline Recollector", "Jace, Reality Sculptor", "Jace, Multiverse Architect"],
    
    hitPoolKeys: new Set([
        'serializedBloodlineRecollector',
        'facetFoilShatteredMirrorMythic',
        'facetFoilShatteredMirrorRare',
        'fractureFoilJapanShowcase',
        'foilJapanShowcase',
        'foilSpecialGuests'
    ]),

    slotQueries: {
        // Slot 1-4: 4 Traditional Foil Commons
        foilCommon: "set:fra r:c is:foil -type:basic -type:land",
        foilCommonDualLand: "set:fra r:c type:land is:foil",

        // Slot 5-6: 2 Traditional Foil Uncommons
        foilUncommon: "set:fra r:u is:foil -frame:showcase -border:borderless",
        foilUncommonBraintwister: "set:fra r:u is:foil frame:showcase",

        // Slot 7-9: 3 Traditional Foil Uncommon Echoed Pairs
        foilUncommonEchoedPairs: "set:fra r:u is:foil is:echoedpairs -border:borderless",
        foilUncommonEchoedPairsBorderless: "set:fra r:u is:foil is:echoedpairs border:borderless",

        // Slot 10: 1 Traditional Foil Tower Basic Land
        foilTowerLand: "(type:land type:basic) set:fra is:foil name:Tower",

        // Slot 11: 1 Traditional Foil Rare or Mythic Rare
        foilRare: "set:fra rarity:r is:foil -frame:showcase -border:borderless -frame:extendedart",
        foilMythic: "set:fra rarity:m is:foil -frame:showcase -border:borderless -frame:extendedart",

        // Slot 12: 1 Non-Foil Rare/Mythic Braintwister or FRC Commander Card
        braintwisterRareNonfoil: "set:frc rarity:r is:nonfoil frame:showcase",
        braintwisterMythicNonfoil: "set:frc rarity:m is:nonfoil frame:showcase",
        frcBorderlessMythicNonfoil: "set:frc rarity:m is:nonfoil border:borderless",
        frcExtendedRareNonfoil: "set:frc rarity:r is:nonfoil frame:extendedart",

        // Slot 13-14: 2 Non-Foil Rare/Mythic Booster Fun Cards
        borderlessEchoedPairsRareNonfoil: "set:fra rarity:r is:nonfoil is:echoedpairs border:borderless",
        borderlessEchoedPairsMythicNonfoil: "set:fra rarity:m is:nonfoil is:echoedpairs border:borderless",
        shatteredMirrorRareNonfoil: "set:fra rarity:r is:nonfoil frame:shatteredmirror",
        shatteredMirrorMythicNonfoil: "set:fra rarity:m is:nonfoil frame:shatteredmirror",
        sculptorsStrongholdRareNonfoil: "set:fra rarity:r is:nonfoil frame:stronghold",
        sculptorsStrongholdMythicNonfoil: "set:fra rarity:m is:nonfoil frame:stronghold",
        portalViewLandRareNonfoil: "set:fra rarity:r is:nonfoil frame:portalview",
        extendedArtFraRareNonfoil: "set:fra rarity:r is:nonfoil frame:extendedart",
        extendedArtFraMythicNonfoil: "set:fra rarity:m is:nonfoil frame:extendedart",

        // Slot 15: 1 Foil Rare/Mythic Booster Fun, Special Guests, Japan Showcase, Facet Foil, or Serialized
        foilBorderlessEchoedPairsRare: "set:fra rarity:r is:foil is:echoedpairs border:borderless",
        foilBorderlessEchoedPairsMythic: "set:fra rarity:m is:foil is:echoedpairs border:borderless",
        foilSculptorsStrongholdRare: "set:fra rarity:r is:foil frame:stronghold",
        foilSculptorsStrongholdMythic: "set:fra rarity:m is:foil frame:stronghold",
        foilBraintwisterRare: "set:fra rarity:r is:foil frame:showcase",
        foilBraintwisterMythic: "set:fra rarity:m is:foil frame:showcase",
        foilPortalViewLandRare: "set:fra rarity:r is:foil frame:portalview",
        foilExtendedArtFraRare: "set:fra rarity:r is:foil frame:extendedart",
        foilExtendedArtFraMythic: "set:fra rarity:m is:foil frame:extendedart",
        foilSpecialGuests: "set:spg date:fra is:foil",
        foilJapanShowcase: "set:fra is:japanshowcase is:foil -is:fracturefoil",
        fractureFoilJapanShowcase: "set:fra is:japanshowcase is:fracturefoil",
        facetFoilShatteredMirrorRare: "set:fra rarity:r is:facetfoil frame:shatteredmirror",
        facetFoilShatteredMirrorMythic: "set:fra rarity:m is:facetfoil frame:shatteredmirror",
        serializedBloodlineRecollector: "set:fra name:\"Bloodline Recollector\" is:serialized is:foil",

        // Slot 16: 1 Art Card or Traditional Foil Double-Sided Token
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
            name: "Slot 1: Foil Booster Fun Rare / Mythic / Serialized",
            getCards: () => [
                ...(pools.serializedBloodlineRecollector || []),
                ...(pools.facetFoilShatteredMirrorMythic || []),
                ...(pools.facetFoilShatteredMirrorRare || []),
                ...(pools.fractureFoilJapanShowcase || []),
                ...(pools.foilJapanShowcase || []),
                ...(pools.foilSpecialGuests || []),
                ...(pools.foilExtendedArtFraMythic || []),
                ...(pools.foilExtendedArtFraRare || []),
                ...(pools.foilPortalViewLandRare || []),
                ...(pools.foilBraintwisterMythic || []),
                ...(pools.foilBraintwisterRare || []),
                ...(pools.foilSculptorsStrongholdMythic || []),
                ...(pools.foilSculptorsStrongholdRare || []),
                ...(pools.foilBorderlessEchoedPairsMythic || []),
                ...(pools.foilBorderlessEchoedPairsRare || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-2",
            name: "Slot 2 & 3: Non-Foil Booster Fun Rare / Mythic",
            getCards: () => [
                ...(pools.extendedArtFraMythicNonfoil || []),
                ...(pools.extendedArtFraRareNonfoil || []),
                ...(pools.portalViewLandRareNonfoil || []),
                ...(pools.sculptorsStrongholdMythicNonfoil || []),
                ...(pools.sculptorsStrongholdRareNonfoil || []),
                ...(pools.shatteredMirrorMythicNonfoil || []),
                ...(pools.shatteredMirrorRareNonfoil || []),
                ...(pools.borderlessEchoedPairsMythicNonfoil || []),
                ...(pools.borderlessEchoedPairsRareNonfoil || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_nf` }))
        },
        {
            id: "slot-4",
            name: "Slot 4: Non-Foil Braintwister Series / FRC Commander",
            getCards: () => [
                ...(pools.frcExtendedRareNonfoil || []),
                ...(pools.frcBorderlessMythicNonfoil || []),
                ...(pools.braintwisterMythicNonfoil || []),
                ...(pools.braintwisterRareNonfoil || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_nf` }))
        },
        {
            id: "slot-5",
            name: "Slot 5: Traditional Foil Rare / Mythic",
            getCards: () => [
                ...(pools.foilMythic || []),
                ...(pools.foilRare || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-6",
            name: "Slot 6: Foil Tower Basic Land",
            getCards: () => (pools.foilTowerLand || []).map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-7",
            name: "Slot 7-9: Traditional Foil Uncommon Echoed Pairs",
            getCards: () => [
                ...(pools.foilUncommonEchoedPairsBorderless || []),
                ...(pools.foilUncommonEchoedPairs || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-8",
            name: "Slot 10 & 11: Traditional Foil Uncommon",
            getCards: () => [
                ...(pools.foilUncommonBraintwister || []),
                ...(pools.foilUncommon || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-9",
            name: "Slot 12-15: Traditional Foil Common",
            getCards: () => [
                ...(pools.foilCommonDualLand || []),
                ...(pools.foilCommon || [])
            ].map(c => ({ ...c, id: `${String(c.rawId || c.id).replace(/_(f|nf)$/, '')}_f` }))
        },
        {
            id: "slot-10",
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