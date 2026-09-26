// js/app.js
import { SETS_REGISTRY, STATIC_ROUTES } from '../sets-config.js';
import { MTG_CONFIGS, ensureSetData, renderECLSubcategoryChecklist, renderHOBSubcategoryChecklist, renderMSHSubcategoryChecklist, renderFRASubcategoryChecklist } from '../data-mtg.js';
import { initModals, openSetAboutModal, showLightbox } from './ui-modals.js';
import { navigateToView } from './router.js';

const DATA_MAP = {};

const WRAPPERS_MAP = {
    motu1984: [
        'card_images/motu_1984/motu1984_packwrapper1.jpg',
        'card_images/motu_1984/motu1984_packwrapper2.jpg',
        'card_images/motu_1984/motu1984_packwrapper3.jpg',
        'card_images/motu_1984/motu1984_packwrapper4.jpg'
    ],
    mm1992: [
        'card_images/marvel_masterpieces_1992/mm1992_packimage1_wolverine.jpg',
        'card_images/marvel_masterpieces_1992/mm1992_packimage2_spiderman.jpg'
    ],
    mm1993: [
        'card_images/marvel_masterpieces_1993/mm1993_packimage1_silversurfer.jpg',
        'card_images/marvel_masterpieces_1993/mm1993_packimage2_ironman.jpg'
    ],
    mu1990: [
        'card_images/marvel_impel_1990/marvel_impel_1990_packimage1_capam.jpg',
        'card_images/marvel_impel_1990/marvel_impel_1990_packimage2_spiderman.jpg',
        'card_images/marvel_impel_1990/marvel_impel_1990_packimage3_wolverine.jpg'
    ],
    xmen1992: [
        'card_images/xmen_impel_1992/uncanny_xmen_1992_packimage1_darkblue.jpg',
        'card_images/xmen_impel_1992/uncanny_xmen_1992_packimage2_teal.jpg'
    ],
    rav: [
        'card_images/mtg_sets/mtg_rav_packwrapper1.jpg',
        'card_images/mtg_sets/mtg_rav_packwrapper2.jpg',
        'card_images/mtg_sets/mtg_rav_packwrapper3.jpg',
        'card_images/mtg_sets/mtg_rav_packwrapper4.jpg',
        'card_images/mtg_sets/mtg_rav_packwrapper5.jpg'
    ],
    isd: [
        'card_images/mtg_sets/mtg_isd_packwrapper1.jpg',
        'card_images/mtg_sets/mtg_isd_packwrapper2.jpg',
        'card_images/mtg_sets/mtg_isd_packwrapper3.jpg',
        'card_images/mtg_sets/mtg_isd_packwrapper4.jpg',
        'card_images/mtg_sets/mtg_isd_packwrapper5.jpg'
    ]
};

function getRandomPackWrapper(setKey, fallbackImage) {
    const arr = WRAPPERS_MAP[setKey];
    if (arr && arr.length > 0) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    return fallbackImage;
}

function updateDashboardProgressTracks() {
    SETS_REGISTRY.forEach(set => {
        try {
            const saved = JSON.parse(localStorage.getItem(set.key)) || {};
            const baseArr = Array.isArray(saved.base) ? saved.base.map(String) : [];
            const spectraArr = Array.isArray(saved.spectra) ? saved.spectra.map(String) : [];
            const collected = new Set([...baseArr, ...spectraArr]).size;
            const pct = Math.min(100, Math.round((collected / set.totalCards) * 100));
            
            const barEl = document.getElementById(`prog-${set.key}`);
            const labelEl = document.getElementById(`label-${set.key}`);
            
            if (barEl) barEl.style.width = pct + '%';
            if (labelEl) labelEl.textContent = `${collected} / ${set.totalCards} collected`;
        } catch (e) {
            console.error(`Error updating dashboard progress for ${set.key}:`, e);
        }
    });
}

function renderDashboardGrid() {
    const viewDashboard = document.getElementById('view-dashboard');
    if (!viewDashboard) return;
    
    viewDashboard.innerHTML = '';
    
    const categories = [];
    SETS_REGISTRY.forEach(s => {
        if (!categories.includes(s.category)) categories.push(s.category);
    });

    categories.forEach(cat => {
        const catSets = SETS_REGISTRY.filter(s => s.category === cat);
        const catBlock = document.createElement('div');
        catBlock.className = 'category-block';

        let cardsHTML = '';
        catSets.forEach(set => {
            const cardMetaSub = `${set.year} &middot; ${set.publisher}`;
            const unitLabel = set.key === 'gpk1' ? 'stickers' : 'cards';

            cardsHTML += `
                <div class="set-card" data-set-key="${set.key}">
                    <div class="set-cover"><img src="${set.coverImage}" alt="${set.name} pack"></div>
                    <div class="set-body">
                        <div class="set-name">${set.name}</div>
                        <div class="set-meta">${cardMetaSub} &middot; <span class="set-meta-about-trigger" data-set-key="${set.key}">About</span> &middot; ${set.totalCards} ${unitLabel}</div>
                        <div class="set-progress-track"><div class="set-progress-bar" id="prog-${set.key}" style="width:0%;background:${set.themeColor}"></div></div>
                        <div class="set-progress-label" id="label-${set.key}">0 / ${set.totalCards} collected</div>
                    </div>
                </div>
            `;
        });

        catBlock.innerHTML = `
            <div class="category-label">${cat}</div>
            <div class="category-sub">${catSets.length} set${catSets.length > 1 ? 's' : ''} available</div>
            <div class="sets-grid">${cardsHTML}</div>
        `;

        viewDashboard.appendChild(catBlock);
    });

    const overviewBlock = document.createElement('div');
    overviewBlock.className = 'dashboard-bottom-overview';
    overviewBlock.innerHTML = `
        <h2>About Rip Boosters</h2>
        <p>Hey there, welcome to Rip Boosters! This site is a completely free, non-commercial passion project built for anyone who loves trading cards and the classic rush of opening a fresh pack. Whether you're chasing the Power Nine in Magic: The Gathering sets, hunting for Spectra Hits in Marvel Masterpieces, or looking for retro Garbage Pail Kids stickers and Masters of the Universe cards, we've built this simulator to recreate those exact card-opening experiences online.</p>
        <div class="dashboard-feature-summary">
            <div class="summary-item-card">
                <strong>Authentic Pull Simulation</strong>
                <span>We structure our packs around accurate set checklists, historic rarity drop distributions, and true pull ratios.</span>
            </div>
            <div class="summary-item-card">
                <strong>Interactive Card Art</strong>
                <span>Click or tap any card you pull to launch a deep lightbox view, letting you check out the high-quality front and back artwork details.</span>
            </div>
            <div class="summary-item-card">
                <strong>Local Progress Tracking</strong>
                <span>Your collection binder counts are tracked dynamically and stored right in your local browser storage cache so you don't lose your progress.</span>
            </div>
        </div>
    `;
    viewDashboard.appendChild(overviewBlock);

    document.querySelectorAll('.set-card').forEach(card => {
        card.onclick = (e) => {
            if (e.target.closest('.set-meta-about-trigger')) return;
            const targetKey = card.getAttribute('data-set-key');
            triggerNavigation(targetKey, true);
        };
    });

    updateDashboardProgressTracks();
}

async function fetchSetDataModule(setKey) {
    if (DATA_MAP[setKey]) return DATA_MAP[setKey];

    const setConfig = SETS_REGISTRY.find(s => s.key === setKey);
    if (!setConfig) return null;

    if (setConfig.isMtg) {
        const fetchedConfig = await ensureSetData(setKey);
        DATA_MAP[setKey] = fetchedConfig;
        return fetchedConfig;
    } else if (setConfig.dataFile) {
        const path = setConfig.dataFile.startsWith('./') 
            ? `../${setConfig.dataFile.slice(2)}` 
            : setConfig.dataFile;
            
        const mod = await import(path);
        DATA_MAP[setKey] = mod[setConfig.dataExport];
        return DATA_MAP[setKey];
    }
    return null;
}

function loadViewLayout(setKey) {
    const viewAppPortal = document.getElementById('view-app-portal');
    let rowLabelHTML = '', collectionHeaderHTML = '', packCoverHTML = '';
    const setConfig = SETS_REGISTRY.find(s => s.key === setKey);

    if (setKey === 'gpk1') {
        rowLabelHTML = '<div class="row-label">Series 1 &mdash; 5 stickers per pack &middot; click to view back</div>';
        collectionHeaderHTML = `<div class="collection-header"><div><h2 class="collection-title">Collection Checklist</h2><p class="collection-sub">82 stickers &mdash; 41 pairs</p></div><span class="collection-count" id="collectionCount">0 / 82</span></div><div class="collection-grid" id="collectionGrid"></div>`;
        packCoverHTML = `<img id="packWrapperImg" src="card_images/gpk_series1/gpk_series1_pack_wrapper.jpg" alt="Garbage Pail Kids Series 1 pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
    } else if (setKey === 'motu1984') {
        rowLabelHTML = `<div id="spectraRow" style="display:none; margin-bottom: 1rem;"><div class="row-label" id="spectraLabel">Sticker Insert</div><div class="cards-row" id="slots-spectra"></div></div><div><div class="row-label">Base Set cards</div></div>`;
        
        collectionHeaderHTML = `
            <div class="collection-header">
                <div>
                    <h2 class="collection-title">Collection Checklist</h2>
                    <p class="collection-sub" style="color:#d87b28">Sticker Inserts &mdash; 22 cards</p>
                </div>
                <span class="collection-count" id="collectionCount">0/110</span>
            </div>
            <div class="collection-grid" id="spectraGrid"></div>

            <div class="collection-header" style="margin-top:2.5rem;">
                <div>
                    <h2 class="collection-title">Red Border Picture</h2>
                    <p class="collection-sub" style="color:#e03e2d">2x5 Interlocking Sticker Back Puzzle</p>
                </div>
            </div>
            <div class="puzzle-2x5-grid" id="motuRedPuzzleGrid"></div>

            <div class="collection-header" style="margin-top:2.5rem;">
                <div>
                    <h2 class="collection-title">Blue Border Picture</h2>
                    <p class="collection-sub" style="color:#3a6ea5">2x5 Interlocking Sticker Back Puzzle</p>
                </div>
            </div>
            <div class="puzzle-2x5-grid" id="motuBluePuzzleGrid"></div>

            <div class="collection-header" style="margin-top:2.5rem;">
                <div>
                    <p class="collection-sub">Base Set &mdash; 88 cards</p>
                </div>
            </div>
            <div class="collection-grid" id="collectionGrid"></div>`;
        
        const activeWrapper = getRandomPackWrapper(setKey, setConfig.coverImage);
        packCoverHTML = `<img id="packWrapperImg" src="${activeWrapper}" alt="Masters of the Universe 1984 pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
    } else if (setKey === 'mm1992') {
        rowLabelHTML = `<div id="spectraRow" style="display:none; margin-bottom: 1rem;"><div class="row-label" id="spectraLabel">Battle Spectra Hit</div><div class="cards-row" id="slots-spectra"></div></div><div><div class="row-label">Base Set cards</div></div>`;
        collectionHeaderHTML = `<div class="collection-header"><div><h2 class="collection-title">Collection Checklist</h2><p class="collection-sub" style="color:var(--spectra)">Battle Spectra &mdash; 5 cards</p></div><span class="collection-count" id="collectionCount">0/105</span></div><div class="collection-grid" id="spectraGrid"></div><div class="collection-header" style="margin-top:2rem;"><div><p class="collection-sub">Base Set &mdash; 100 cards</p></div></div><div class="collection-grid" id="collectionGrid"></div>`;
        
        const activeWrapper = getRandomPackWrapper(setKey, setConfig.coverImage);
        packCoverHTML = `<img id="packWrapperImg" src="${activeWrapper}" alt="Marvel Masterpieces 1992 pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
    } else if (setKey === 'mm1993') {
        rowLabelHTML = `<div id="spectraRow" style="display:none; margin-bottom: 1rem;"><div class="row-label" id="spectraLabel">Dyna-Etch Hit</div><div class="cards-row" id="slots-spectra"></div></div><div><div class="row-label">Base Set cards</div></div>`;
        collectionHeaderHTML = `<div class="collection-header"><div><h2 class="collection-title">Collection Checklist</h2><p class="collection-sub" style="color:#1a6a1a;">Dyna-Etch &mdash; 8 cards</p></div><span class="collection-count" id="collectionCount">0/98</span></div><div class="collection-grid" id="spectraGrid"></div><div class="collection-header" style="margin-top:2rem;"><div><p class="collection-sub">Base Set &mdash; 90 cards</p></div></div><div class="collection-grid" id="collectionGrid"></div>`;
        
        const activeWrapper = getRandomPackWrapper(setKey, setConfig.coverImage);
        packCoverHTML = `<img id="packWrapperImg" src="${activeWrapper}" alt="Marvel Masterpieces 1993 pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
    } else if (setKey === 'mu1990') {
        rowLabelHTML = `<div id="spectraRow" style="display:none; margin-bottom: 1rem;"><div class="row-label" id="spectraLabel">Hologram Hit</div><div class="cards-row" id="slots-spectra"></div></div><div><div class="row-label">Base Set cards</div></div>`;
        collectionHeaderHTML = `<div class="collection-header"><div><h2 class="collection-title">Collection Checklist</h2><p class="collection-sub" style="color:#1a3a8a;">Holograms &mdash; 5 cards</p></div><span class="collection-count" id="collectionCount">0/167</span></div><div class="collection-grid" id="spectraGrid"></div><div class="collection-header" style="margin-top:2rem;"><div><p class="collection-sub">Base Set &mdash; 162 cards</p></div></div><div class="collection-grid" id="collectionGrid"></div>`;
        
        const activeWrapper = getRandomPackWrapper(setKey, setConfig.coverImage);
        packCoverHTML = `<img id="packWrapperImg" src="${activeWrapper}" alt="Marvel Universe 1990 pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
    } else if (setKey === 'xmen1992') {
        rowLabelHTML = `<div id="spectraRow" style="display:none; margin-bottom: 1rem;"><div class="row-label" id="spectraLabel">Gold Hologram Hit</div><div class="cards-row" id="slots-spectra"></div></div><div><div class="row-label">Base Set cards</div></div>`;
        collectionHeaderHTML = `
            <div class="collection-header">
                <div>
                    <h2 class="collection-title">Collection Checklist</h2>
                    <p class="collection-sub" style="color:#b8860b">Gold Holograms &mdash; 5 cards</p>
                </div>
                <span class="collection-count" id="collectionCount">0/105</span>
            </div>
            <div class="collection-grid" id="spectraGrid"></div>
            
            <div class="collection-header" style="margin-top:2.5rem;">
                <div>
                    <h2 class="collection-title">Danger Room Test Sequence 9-card interlocking puzzle (base cards 91 through 99)</h2>
                    <p class="collection-sub" style="color:#df9845">3x3 Interlocking Jim Lee Mural</p>
                </div>
            </div>
            <div class="puzzle-3x3-grid" id="puzzleGrid"></div>

            <div class="collection-header" style="margin-top:2.5rem;">
                <div>
                    <p class="collection-sub">Base Set &mdash; 91 cards (excluding puzzle cards 91–99)</p>
                </div>
            </div>
            <div class="collection-grid" id="collectionGrid"></div>`;
        
        const activeWrapper = getRandomPackWrapper(setKey, setConfig.coverImage);
        packCoverHTML = `<img id="packWrapperImg" src="${activeWrapper}" alt="The Uncanny X-Men 1992 pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
    } else if (setConfig && setConfig.isMtg) {
        const config = DATA_MAP[setKey] || setConfig;
        const setName = setConfig.name || (config ? config.name : 'MTG');
        const setMaxCount = setConfig.totalCards || (config ? config.maxCount : 0);

        rowLabelHTML = `
            <div class="mtg-row" id="mtgMainRow" style="display:none;">
                <div class="cards-row" id="slots-mtg-main"></div>
            </div>`;

        let showcaseSubText = "";
        const isAbu = ['mtglea', 'mtgleb', 'mtg2ed'].includes(setKey);
        
        if (isAbu) showcaseSubText = "Dual Lands & Power Nine";
        else if (setKey === "mtg3ed") showcaseSubText = "Dual Lands & Wheel of Fortune";
        else if (setKey === "rav") showcaseSubText = "Shock Lands & Guild Staples";
        else if (setKey === "isd") showcaseSubText = "Gothic Mythics & Planeswalkers";
        else if (setKey === "mtgecl") showcaseSubText = "Serialized Bitterbloom Bearer &middot; Japan Showcase Fracture Foil &middot; Borderless Nonland Mythic &middot; Reversible Shock Land &middot; Borderless Nonland Rare &middot; Fable Frame Mythic &middot; Japan Showcase Foil &middot; Special Guests";
        else if (setKey === "mtgtmt") showcaseSubText = "Kevin Eastman Signatures & Sewer Frames";
        else if (setKey === "mtgsos") showcaseSubText = "Japanese Mystical Archive & Serialized Emeritus";
        else if (setKey === "mtgmsh") showcaseSubText = "Cosmic Foil Mind Stone &middot; Borderless Gauntlet Mind Stone &middot; Classic Comic Foil &middot; Panel Mythic &middot; Logo Mythic &middot; Scene Mythic &middot; Extended Mythic &middot; Source Material Foil";
        else if (setKey === "mtghob") showcaseSubText = "Gleaming Gold Smaug the Magnificent &middot; Foil Dwarvish Language &middot; Surge Foil Book Cover Mythic &middot; Surge Foil Book Cover Rare &middot; Surge Foil Dragon Hoard Mythic &middot; Surge Foil Dragon Hoard Rare &middot; Surge Foil Classic Artist";
        else if (setKey === "mtgfra") showcaseSubText = "Serialized Bloodline Recollector &middot; Facet Foil Shattered Mirror &middot; Fracture Foil Japan Showcase &middot; Japan Showcase Foil &middot; Special Guests";

        const subMarkup = showcaseSubText ? `<p class="collection-sub" style="color:#b08d24;">${showcaseSubText}</p>` : ``;

        let hobSceneGridsHTML = '';
        if (setKey === 'mtghob') {
            hobSceneGridsHTML = `
                <div class="collection-header" style="margin-top: 2.5rem;">
                    <div>
                        <h2 class="collection-title">Fight with the Great Goblin</h2>
                        <p class="collection-sub" style="color: #b08d24;">2x3 Scene Cards (#199 - #204)</p>
                    </div>
                </div>
                <div class="puzzle-3x3-grid hob-scene-2x3-grid" id="hobScene1Grid"></div>

                <div class="collection-header" style="margin-top: 2.5rem;">
                    <div>
                        <h2 class="collection-title">The Five Armies Clash!</h2>
                        <p class="collection-sub" style="color: #b08d24;">3x3 Scene Cards (#205 - #213)</p>
                    </div>
                </div>
                <div class="puzzle-3x3-grid hob-scene-3x3-grid" id="hobScene2Grid"></div>

                <div class="collection-header" style="margin-top: 2.5rem;">
                    <div>
                        <h2 class="collection-title">Crack the Plates</h2>
                        <p class="collection-sub" style="color: #b08d24;">2x3 Scene Cards (HOC #1 - #6)</p>
                    </div>
                </div>
                <div class="puzzle-3x3-grid hob-scene-2x3-grid" id="hobScene3Grid"></div>
            `;
        }

        collectionHeaderHTML = `
            <div class="collection-header">
                <div>
                    <h2 class="collection-title">Hits Showcase</h2>
                    ${subMarkup}
                </div>
            </div>
            <div class="collection-grid" id="spectraGrid"></div>
            
            ${hobSceneGridsHTML}

            <div class="collection-header" style="margin-top: 2.5rem;">
                <div>
                    <h2 class="collection-title">Collection Checklist</h2>
                    <p class="collection-sub">${setName} Complete Set</p>
                </div>
                <span class="collection-count" id="collectionCount">0/${setMaxCount}</span>
            </div>
            <div id="eclSubcategoriesContainer"></div>
            <div class="collection-grid" id="collectionGrid"></div>`;
        
        if (setKey === 'rav' || setKey === 'isd') {
            const activeWrapper = getRandomPackWrapper(setKey, setConfig.coverImage);
            packCoverHTML = `<img id="packWrapperImg" src="${activeWrapper}" alt="Pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
        } else if (setKey === 'mtgecl') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_ecl_collectorboosterwrapper.jpg" alt="Lorwyn Eclipsed Collector Pack" style="width:100%;height:100%;object-fit:contain;border-radius:6px;">`;
        else if (setKey === 'mtgtmt') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_tmt_collectorboosterwrapper.jpg" alt="Teenage Mutant Ninja Turtles Collector Pack" style="width:100%;height:100%;object-fit:contain;border-radius:6px;">`;
        else if (setKey === 'mtgsos') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_sos_collectorboosterwrapper.jpg" alt="Secrets of Strixhaven Collector Pack" style="width:100%;height:100%;object-fit:contain;border-radius:6px;">`;
        else if (setKey === 'mtgmsh') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_msh_collectorboosterwrapper.jpg" alt="Marvel Super Heroes Collector Pack" style="width:100%;height:100%;object-fit:contain;border-radius:6px;">`;
        else if (setKey === 'mtghob') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_hob_collectorboosterwrapper.jpg" alt="The Hobbit Collector Pack" style="width:100%;height:100%;object-fit:contain;border-radius:6px;">`;
        else if (setKey === 'mtgfra') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_fra_collectorboosterwrapper.jpg" alt="Reality Fracture Collector Pack" style="width:100%;height:100%;object-fit:contain;border-radius:6px;">`;
        else if (setKey === 'mtg3ed') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_3ed_revised_pack_wrapper.jpg" alt="Pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
        else if (setKey === 'mtglea' || setKey === 'mtgleb') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_alpha_beta_pack_wrapper.jpg" alt="Pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
        else if (setKey === 'mtg2ed') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_unlimited_pack_wrapper.jpg" alt="Pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
        else if (setKey === 'mtgarn') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_arn_pack_wrapper.jpg" alt="Pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
        else if (setKey === 'mtgatq') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_atq_pack_wrapper.jpg" alt="Pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
        else if (setKey === 'mtgleg') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_leg_pack_wrapper.jpg" alt="Pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
        else if (setKey === 'mtgdrk') packCoverHTML = `<img id="packWrapperImg" src="card_images/mtg_sets/mtg_drk_pack_wrapper.jpg" alt="Pack" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
    }

    const aboutBlurb = setConfig ? { title: setConfig.aboutTitle, text: setConfig.aboutText } : { title: "About This Set", text: "" };

    viewAppPortal.innerHTML = `
        <div class="pack-section">
            <div class="pack-row">
                <div class="pack-wrapper" id="packWrapper">
                    <div class="pack" id="pack">${packCoverHTML}</div>
                </div>
                <div class="pack-counter">
                    <span class="counter-num" id="packsTotal">0</span>
                    <span class="counter-label">Total Packs<br>Opened</span>
                    <span class="counter-divider"></span>
                    <span class="counter-num counter-num--session" id="packsSession">0</span>
                    <span class="counter-label">This<br>Session</span>
                </div>
            </div>
            <div class="pack-action-row">
                <button class="open-btn" id="openBtn">Open Pack</button>
                <p class="pack-instructions">Drag across the pack to tear it open,<br>or click the button above.</p>
            </div>
        </div>

        <div class="section-divider" id="divider"><span>Cards Pulled</span></div>
        <div class="cards-section" id="cardsSection">
            ${rowLabelHTML}
            <div class="cards-row" id="slots-base"></div>
        </div>

        <div class="collection-section">${collectionHeaderHTML}</div>

        <div class="set-about-section">
            <h3>${aboutBlurb.title}</h3>
            <p>${aboutBlurb.text}</p>
        </div>

        <div id="lightbox"><button id="lightbox-close">&times;</button><div style="display:flex; gap:1rem; max-width:90vw; align-items:center; justify-content:center;"><img id="lightbox-front" src=""><img id="lightbox-back" src=""></div ></div>
    `;

    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.onclick = () => lb.classList.remove('open');
        const lbClose = document.getElementById('lightbox-close');
        if (lbClose) lbClose.onclick = (e) => { e.stopPropagation(); lb.classList.remove('open'); };
    }

    initializePackOpenerScript(setKey);
}

function triggerNavigation(setKey, updateHistory = true) {
    navigateToView(setKey, updateHistory, {
        registry: SETS_REGISTRY,
        staticRoutes: STATIC_ROUTES,
        fetchSetDataModule,
        loadViewLayout,
        updateDashboardProgressTracks
    });
}

function initializePackOpenerScript(setKey) {
    const wrapper = document.getElementById('packWrapper'); 
    const MIN_DRAG = 60; 
    let dragging = false, lastX = 0, lastY = 0, cumDist = 0, canvas, ctx, points = [];
    
    function initCanvas() {
        const pack = document.getElementById('pack'); if (!pack) return; pack.style.position = 'relative'; canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border-radius:6px;pointer-events:none;z-index:10;';
        canvas.width = pack.offsetWidth || 150; canvas.height = pack.offsetHeight || 224; pack.appendChild(canvas); ctx = canvas.getContext('2d');
    }
    
    function getPos(e) { const rect = canvas.getBoundingClientRect(); const src = e.touches ? e.touches[0] : e; return { x: (src.clientX - rect.left) * (canvas.width / rect.width), y: (src.clientY - rect.top) * (canvas.height / rect.height) }; }
    function drawLine() { ctx.clearRect(0, 0, canvas.width, canvas.height); if (points.length < 2) return; ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.92)'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y); for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y); ctx.stroke(); ctx.restore(); }
    
    if (wrapper) {
        wrapper.onpointerdown = (e) => { if (window.openingPackState) return; if (!canvas) initCanvas(); dragging = true; points = []; cumDist = 0; ctx.clearRect(0,0,canvas.width,canvas.height); const pos = getPos(e); lastX = pos.x; lastY = pos.y; points.push(pos); wrapper.setPointerCapture(e.pointerId); e.preventDefault(); };
        wrapper.onpointermove = (e) => { if (!dragging) return; const pos = getPos(e); cumDist += Math.sqrt(Math.pow(pos.x-lastX,2)+Math.pow(pos.y-lastY,2)); lastX = pos.x; lastY = pos.y; points.push(pos); drawLine(); e.preventDefault(); };
        wrapper.onpointerup = () => { if (!dragging) return; dragging = false; ctx.clearRect(0,0,canvas.width,canvas.height); if (cumDist >= MIN_DRAG) window.openPack(); };
    }

    const activeSetData = DATA_MAP[setKey];
    const setConfig = SETS_REGISTRY.find(s => s.key === setKey);
    const isMtg = setConfig ? setConfig.isMtg : false;

    let savedData = JSON.parse(localStorage.getItem(setKey)) || { base: [], spectra: [], totalPacks: 0 };
    if (!Array.isArray(savedData.base)) savedData.base = [];
    if (!Array.isArray(savedData.spectra)) savedData.spectra = [];
    let sessionPacks = 0;

    const getImgPath = (n, side = 'front', isInsert = false, variant = '') => {
        const targetSide = side === 'back' ? 'back' : 'front';

        if (isMtg) {
            const cardObj = activeSetData.baseCards.find(c => c.n == n);
            if (targetSide === 'front') {
                return cardObj ? cardObj.frontImg : "card_images/card_back.jpg";
            } else {
                return (cardObj && cardObj.backImg) 
                    ? cardObj.backImg 
                    : "card_images/mtg_sets/Magic_the_Gathering_Card_Back.jpg";
            }
        }
        if (setKey === 'gpk1') {
            return targetSide === 'back' 
                ? `card_images/gpk_series1/back_${String(n).padStart(3, '0')}ab.jpg`
                : `card_images/gpk_series1/${targetSide}_${String(n).padStart(3, '0')}${variant}.jpg`;
        }
        if (setKey === 'motu1984') {
            let numVal = typeof n === 'string' ? n.replace(/^\D+/g, '') : n;
            let numStr = String(numVal).padStart(isInsert ? 2 : 3, '0');
            if (variant && variant === 'b' && targetSide === 'back') {
                return `card_images/motu_1984/sticker_${targetSide}_${numStr}b.jpg`;
            }
            return isInsert 
                ? `card_images/motu_1984/sticker_${targetSide}_${numStr}.jpg`
                : `card_images/motu_1984/${targetSide}_${numStr}.jpg`;
        }
        if (setKey === 'mm1992') return isInsert ? `card_images/marvel_masterpieces_1992/spectra_${targetSide}_${n}.jpg` : `card_images/marvel_masterpieces_1992/${targetSide}_${String(n).padStart(3, '0')}.jpg`;
        if (setKey === 'mm1993') return isInsert ? `card_images/marvel_masterpieces_1993/dynaetch_${targetSide}_${n}.jpg` : `card_images/marvel_masterpieces_1993/${targetSide}_${String(n).padStart(3, '0')}.jpg`;
        
        if (setKey === 'mu1990') {
            let numStr = String(n).trim().toUpperCase();
            if (numStr.startsWith('MH')) numStr = numStr.substring(2);
            let parsedNum = parseInt(numStr, 10);

            if (isInsert || parsedNum > 162) {
                let holoIdx = isInsert ? parsedNum : (parsedNum - 162);
                return targetSide === 'front'
                    ? `card_images/marvel_impel_1990/mh${holoIdx}_hologram_front.png`
                    : `card_images/marvel_impel_1990/mh_hologram_back.png`;
            }
            return `card_images/marvel_impel_1990/${targetSide}_${numStr.padStart(3, '0')}.jpg`;
        }
        if (setKey === 'xmen1992') return isInsert ? `card_images/xmen_impel_1992/holo_${targetSide}_${n}.jpg` : `card_images/xmen_impel_1992/${targetSide}_${String(n).padStart(3, '0')}.jpg`;
    };

    const updateCounters = () => {
        document.getElementById('packsTotal').textContent = savedData.totalPacks || 0;
        document.getElementById('packsSession').textContent = sessionPacks;
        
        const uniqueCollected = new Set([
            ...(Array.isArray(savedData.base) ? savedData.base.map(String) : []),
            ...(Array.isArray(savedData.spectra) ? savedData.spectra.map(String) : [])
        ]).size;
        
        const maxCount = (setConfig ? setConfig.totalCards : 105);
        const collectionCountEl = document.getElementById('collectionCount');
        if (collectionCountEl) {
            collectionCountEl.textContent = `${Math.min(uniqueCollected, maxCount)} / ${maxCount}`;
        }
    };

    const gridBase = document.getElementById('collectionGrid');
    const gridInsert = document.getElementById('spectraGrid');
    const gridPuzzle = document.getElementById('puzzleGrid');
    const gridMotuRedPuzzle = document.getElementById('motuRedPuzzleGrid');
    const gridMotuBluePuzzle = document.getElementById('motuBluePuzzleGrid');

    const gridHobScene1 = document.getElementById('hobScene1Grid');
    const gridHobScene2 = document.getElementById('hobScene2Grid');
    const gridHobScene3 = document.getElementById('hobScene3Grid');
    const containerECLSub = document.getElementById('eclSubcategoriesContainer');

    if (setKey === 'mtgecl' && containerECLSub) {
        gridBase.style.display = 'none';
        renderECLSubcategoryChecklist(containerECLSub, savedData.base, activeSetData);
    } else if (setKey === 'mtghob' && containerECLSub) {
        gridBase.style.display = 'none';
        renderHOBSubcategoryChecklist(containerECLSub, savedData.base, activeSetData);

        const renderHobScene = (container, filterFn) => {
            if (!container) return;
            container.innerHTML = '';
            
            const filteredCards = activeSetData.baseCards.filter(filterFn);
            const sceneMap = new Map();

            for (const card of filteredCards) {
                const cnKey = String(card.collectorNumber || card.n);
                if (!sceneMap.has(cnKey)) {
                    sceneMap.set(cnKey, card);
                }
            }

            const sceneCards = Array.from(sceneMap.values())
                .sort((a, b) => parseInt(a.collectorNumber || a.n, 10) - parseInt(b.collectorNumber || b.n, 10));

            sceneCards.forEach(card => {
                const slot = document.createElement('div');
                const rawId = String(card.rawId || card.id || card.n).replace(/_(f|nf)$/, '');
                
                const isCollected = savedData.base.some(savedId => {
                    const cleanSaved = String(savedId).replace(/_(f|nf)$/, '');
                    return cleanSaved === rawId;
                }) || savedData.spectra.some(savedId => {
                    const cleanSaved = String(savedId).replace(/_(f|nf)$/, '');
                    return cleanSaved === rawId;
                });
                
                slot.className = `col-slot ${isCollected ? 'filled' : 'no-image'}`;
                slot.id = `col-hob-scene-${card.setCode || 'hob'}-${card.collectorNumber || card.n}`;

                if (isCollected) {
                    const frontImg = card.frontImg || getImgPath(card.n, 'front', false);
                    const backImg = card.backImg || getImgPath(card.n, 'back', false);
                    slot.innerHTML = `<img src="${frontImg}">`;
                    slot.onclick = () => showLightbox(frontImg, backImg);
                } else {
                    const codePrefix = card.setCode ? `${card.setCode.toUpperCase()} ` : '';
                    slot.innerHTML = `<span class="col-num">#${codePrefix}${card.collectorNumber || card.n}</span><span class="col-name">${card.name}</span>`;
                }
                container.appendChild(slot);
            });
        };

        renderHobScene(gridHobScene1, c => (c.setCode === 'hob' || !c.setCode) && parseInt(c.collectorNumber || c.n, 10) >= 199 && parseInt(c.collectorNumber || c.n, 10) <= 204);
        renderHobScene(gridHobScene2, c => (c.setCode === 'hob' || !c.setCode) && parseInt(c.collectorNumber || c.n, 10) >= 205 && parseInt(c.collectorNumber || c.n, 10) <= 213);
        renderHobScene(gridHobScene3, c => c.setCode === 'hoc' && parseInt(c.collectorNumber || c.n, 10) >= 1 && parseInt(c.collectorNumber || c.n, 10) <= 6);
    } else if (setKey === 'mtgmsh' && containerECLSub) {
        gridBase.style.display = 'none';
        renderMSHSubcategoryChecklist(containerECLSub, savedData.base, activeSetData);
    } else if (setKey === 'mtgfra' && containerECLSub) {
        gridBase.style.display = 'none';
        renderFRASubcategoryChecklist(containerECLSub, savedData.base, activeSetData);
    }

    if (gridBase && setKey !== 'mtgecl' && setKey !== 'mtghob' && setKey !== 'mtgmsh' && setKey !== 'mtgfra') {
        let loopPool = activeSetData.baseCards;
        if (setKey === 'mu1990') {
            loopPool = loopPool.filter(card => parseInt(String(card.n).trim().replace(/^\D+/g, ''), 10) <= 162);
        }
        if (setKey === 'xmen1992') {
            loopPool = loopPool.filter(card => card.n < 91 || card.n > 99);
        }

        loopPool.forEach(card => {
            const slot = document.createElement('div');
            const matchKey = setKey === 'gpk1' ? `${card.n}${card.v}` : String(card.n);
            
            const isCollected = savedData.base.map(String).includes(matchKey);
            slot.className = `col-slot ${isCollected ? 'filled' : 'no-image'}`;
            slot.id = `col-base-${matchKey}`;
            
            if (isCollected) {
                const frontImg = card.frontImg || getImgPath(card.n, 'front', false, card.v || '');
                const backImg = card.backImg || getImgPath(card.n, 'back', false, card.v || '');
                slot.innerHTML = `<img src="${frontImg}">`;
                slot.onclick = () => showLightbox(frontImg, backImg);
            } else {
                slot.innerHTML = `<span class="col-num">#${String(card.n).padStart(3, '0')}${card.v || ''}</span><span class="col-name">${card.name}</span>`;
            }
            gridBase.appendChild(slot);
        });
    }

    if (gridPuzzle && setKey === 'xmen1992') {
        const puzzleCards = activeSetData.baseCards.filter(c => c.n >= 91 && c.n <= 99);
        puzzleCards.forEach(card => {
            const slot = document.createElement('div');
            const isCollected = savedData.base.map(String).includes(String(card.n));
            slot.className = `col-slot ${isCollected ? 'filled' : 'no-image'}`;
            slot.id = `col-puzzle-${card.n}`;
            
            if (isCollected) {
                slot.innerHTML = `<img src="${getImgPath(card.n, 'front', false)}">`;
                slot.onclick = () => showLightbox(getImgPath(card.n, 'front', false), getImgPath(card.n, 'back', false));
            } else {
                slot.innerHTML = `<span class="col-num">#${String(card.n).padStart(3, '0')}</span><span class="col-name">${card.name}</span>`;
            }
            gridPuzzle.appendChild(slot);
        });
    }

    if (gridMotuRedPuzzle && setKey === 'motu1984') {
        const redPuzzleSequence = [
            { id: "S18", n: 18, variant: "" }, { id: "S11", n: 11, variant: "" },
            { id: "S13", n: 13, variant: "" }, { id: "S15", n: 15, variant: "" },
            { id: "S12", n: 12, variant: "" }, { id: "S19R", n: 19, variant: "" },
            { id: "S21", n: 21, variant: "" }, { id: "S17", n: 17, variant: "" },
            { id: "S20", n: 20, variant: "" }, { id: "S16", n: 16, variant: "" }
        ];
        
        redPuzzleSequence.forEach(item => {
            const slot = document.createElement('div');
            const isCollected = savedData.spectra.map(String).includes(item.id);
            const stickerObj = activeSetData.stickerCards.find(s => s.id === item.id);
            const displayName = stickerObj ? stickerObj.name : `Sticker #${item.n}`;
            
            slot.className = `col-slot ${isCollected ? 'filled' : 'no-image'}`;
            slot.id = `col-motu-red-puzzle-${item.id}`;
            
            if (isCollected) {
                slot.innerHTML = `<img src="${getImgPath(item.n, 'back', true, item.variant)}">`;
                slot.onclick = () => showLightbox(getImgPath(item.n, 'front', true, item.variant), getImgPath(item.n, 'back', true, item.variant));
            } else {
                slot.innerHTML = `<span class="col-num">#${item.n}</span><span class="col-name">${displayName}</span>`;
            }
            gridMotuRedPuzzle.appendChild(slot);
        });
    }

    if (gridMotuBluePuzzle && setKey === 'motu1984') {
        const bluePuzzleSequence = [
            { id: "S19B", n: 19, variant: "b" }, { id: "S10", n: 10, variant: "" },
            { id: "S08", n: 8, variant: "" }, { id: "S05", n: 5, variant: "" },
            { id: "S04", n: 4, variant: "" }, { id: "S14", n: 14, variant: "" },
            { id: "S09", n: 9, variant: "" }, { id: "S07", n: 7, variant: "" },
            { id: "S06", n: 6, variant: "" }, { id: "S03", n: 3, variant: "" }
        ];

        bluePuzzleSequence.forEach(item => {
            const slot = document.createElement('div');
            const isCollected = savedData.spectra.map(String).includes(item.id);
            const stickerObj = activeSetData.stickerCards.find(s => s.id === item.id);
            const displayName = stickerObj ? stickerObj.name : `Sticker #${item.n}`;

            slot.className = `col-slot ${isCollected ? 'filled' : 'no-image'}`;
            slot.id = `col-motu-blue-puzzle-${item.id}`;

            if (isCollected) {
                slot.innerHTML = `<img src="${getImgPath(item.n, 'back', true, item.variant)}">`;
                slot.onclick = () => showLightbox(getImgPath(item.n, 'front', true, item.variant), getImgPath(item.n, 'back', true, item.variant));
            } else {
                slot.innerHTML = `<span class="col-num">#${item.n}</span><span class="col-name">${displayName}</span>`;
            }
            gridMotuBluePuzzle.appendChild(slot);
        });
    }

    if (gridInsert) {
        if (isMtg) {
            let sortedHits = [...activeSetData.pools.hits];

            if (setKey === 'mtghob') {
                const cPools = activeSetData.collectorPools || {};
                const poolRarityOrder = [
                    cPools.smaugHeadliner,
                    cPools.foilDwarvishLanguage,
                    cPools.surgeFoilBookCoverMythic,
                    cPools.surgeFoilBookCoverRare,
                    cPools.surgeFoilDragonHoardMythic,
                    cPools.surgeFoilDragonHoardRare,
                    cPools.surgeFoilClassicArtist
                ];

                sortedHits.sort((a, b) => {
                    const getRank = (card) => {
                        const cardRawId = String(card.rawId || card.id || card.n || '').replace(/_(f|nf)$/, '');
                        const cardNum = String(card.collectorNumber || card.n || '');

                        for (let r = 0; r < poolRarityOrder.length; r++) {
                            const pool = poolRarityOrder[r];
                            if (pool && pool.some(c => {
                                const poolRawId = String(c.rawId || c.id || c.n || '').replace(/_(f|nf)$/, '');
                                const poolNum = String(c.collectorNumber || c.n || '');
                                return (cardRawId && cardRawId === poolRawId) || (cardNum && cardNum === poolNum);
                            })) {
                                return r;
                            }
                        }
                        return 99;
                    };
                    return getRank(a) - getRank(b);
                });
            } else if (setKey === 'mtgecl') {
                const cPools = activeSetData.collectorPools || {};
                const poolRarityOrder = [
                    cPools.serializedBitterbloom,
                    cPools.japanShowcaseFracture,
                    cPools.foilBorderlessMythic,
                    cPools.foilReversibleShock,
                    cPools.foilBorderlessRare,
                    cPools.foilFableMythic,
                    cPools.japanShowcaseFoil,
                    cPools.foilSpecialGuests
                ];

                sortedHits.sort((a, b) => {
                    const getRank = (card) => {
                        const cardRawId = String(card.rawId || card.id || card.n || '').replace(/_(f|nf)$/, '');
                        const cardNum = String(card.collectorNumber || card.n || '');

                        for (let r = 0; r < poolRarityOrder.length; r++) {
                            const pool = poolRarityOrder[r];
                            if (pool && pool.some(c => {
                                const poolRawId = String(c.rawId || c.id || c.n || '').replace(/_(f|nf)$/, '');
                                const poolNum = String(c.collectorNumber || c.n || '');
                                return (cardRawId && cardRawId === poolRawId) || (cardNum && cardNum === poolNum);
                            })) {
                                return r;
                            }
                        }
                        return 99;
                    };
                    return getRank(a) - getRank(b);
                });
            } else if (setKey === 'mtgmsh') {
                const cPools = activeSetData.collectorPools || {};
                const poolRarityOrder = [
                    cPools.cosmicMindStone,
                    cPools.borderlessGauntlet,
                    cPools.classicComicFoil,
                    cPools.foilPanelMythic,
                    cPools.foilLogoMythic,
                    cPools.foilSceneMythic,
                    cPools.foilExtendedMythic,
                    cPools.sourceMaterialFoil
                ];

                sortedHits.sort((a, b) => {
                    const getRank = (card) => {
                        const cardRawId = String(card.rawId || card.id || card.n || '').replace(/_(f|nf)$/, '');
                        const cardNum = String(card.collectorNumber || card.n || '');

                        for (let r = 0; r < poolRarityOrder.length; r++) {
                            const pool = poolRarityOrder[r];
                            if (pool && pool.some(c => {
                                const poolRawId = String(c.rawId || c.id || c.n || '').replace(/_(f|nf)$/, '');
                                const poolNum = String(c.collectorNumber || c.n || '');
                                return (cardRawId && cardRawId === poolRawId) || (cardNum && cardNum === poolNum);
                            })) {
                                return r;
                            }
                        }
                        return 99;
                    };
                    return getRank(a) - getRank(b);
                });
            } else if (setKey === 'mtgfra') {
                const cPools = activeSetData.collectorPools || {};
                const poolRarityOrder = [
                    cPools.serializedBloodlineRecollector,
                    cPools.facetFoilShatteredMirrorMythic,
                    cPools.facetFoilShatteredMirrorRare,
                    cPools.fractureFoilJapanShowcase,
                    cPools.foilJapanShowcase,
                    cPools.foilSpecialGuests
                ];

                sortedHits.sort((a, b) => {
                    const getRank = (card) => {
                        const cardRawId = String(card.rawId || card.id || card.n || '').replace(/_(f|nf)$/, '');
                        const cardNum = String(card.collectorNumber || card.n || '');

                        for (let r = 0; r < poolRarityOrder.length; r++) {
                            const pool = poolRarityOrder[r];
                            if (pool && pool.some(c => {
                                const poolRawId = String(c.rawId || c.id || c.n || '').replace(/_(f|nf)$/, '');
                                const poolNum = String(c.collectorNumber || c.n || '');
                                return (cardRawId && cardRawId === poolRawId) || (cardNum && cardNum === poolNum);
                            })) {
                                return r;
                            }
                        }
                        return 99;
                    };
                    return getRank(a) - getRank(b);
                });
            }

            sortedHits.forEach(card => {
                const slot = document.createElement('div');
                const hitKey = String(card.id || card.n);
                const isCollected = savedData.spectra.map(String).includes(hitKey);
                
                slot.className = `col-slot ${isCollected ? 'filled' : 'no-image'}`;
                slot.id = `col-insert-${card.id || card.n}`;
                
                if (isCollected) {
                    const frontImg = card.frontImg || getImgPath(card.n, 'front', false);
                    const backImg = card.backImg || getImgPath(card.n, 'back', false);
                    slot.innerHTML = `<img src="${frontImg}">`;
                    slot.onclick = () => showLightbox(frontImg, backImg);
                } else {
                    let displayName = card.name;
                    if (setKey === 'mtgfra' && card.name === 'Bloodline Recollector' && card.isSerialized) {
                        displayName = 'Serialized Bloodline Recollector';
                    }
                    slot.innerHTML = `<span class="col-num">HIT</span><span class="col-name">${displayName}</span>`;
                }
                gridInsert.appendChild(slot);
            });
        } else {
            let explicitInserts = activeSetData.spectraCards || activeSetData.dynaCards || activeSetData.holoCards || activeSetData.stickerCards || [];
            explicitInserts.forEach(card => {
                const slot = document.createElement('div');
                const trackKey = (setKey === 'xmen1992' || setKey === 'motu1984' || setKey === 'mu1990' || setKey === 'mm1992' || setKey === 'mm1993') ? card.id : String(card.n);
                const isCollected = savedData.spectra.map(String).includes(trackKey);
                slot.className = `col-slot ${isCollected ? 'filled' : 'no-image'}`;
                slot.id = `col-insert-${card.id || card.n}`;
                
                if (isCollected) {
                    slot.innerHTML = `<img src="${getImgPath(card.n, 'front', true, card.variant || '')}">`;
                    slot.onclick = () => showLightbox(getImgPath(card.n, 'front', true, card.variant || ''), getImgPath(card.n, 'back', true, card.variant || ''));
                } else {
                    slot.innerHTML = `<span class="col-num">${card.id || 'S'+card.n}</span><span class="col-name">${card.name}</span>`;
                }
                gridInsert.appendChild(slot);
            });
        }
    }

    updateCounters();

    window.openPack = function() {
        if (window.openingPackState) return; 
        window.openingPackState = true;
        
        const btn = document.getElementById('openBtn'); if (btn) btn.disabled = true;
        const pack = document.getElementById('pack'); if (pack) pack.classList.add('pack-tearing');
        const wrapperEl = document.getElementById('packWrapper');

        savedData.totalPacks = (savedData.totalPacks || 0) + 1; sessionPacks++;
        document.getElementById('packsTotal').textContent = savedData.totalPacks;
        document.getElementById('packsSession').textContent = sessionPacks;

        setTimeout(() => {
            if (wrapperEl) { wrapperEl.classList.add('opened'); wrapperEl.style.opacity = '0.35'; }
            const sBase = document.getElementById('slots-base');
            const sInsert = document.getElementById('slots-spectra');
            const rowIns = document.getElementById('spectraRow');

            if (sBase) sBase.innerHTML = ''; 
            if (sInsert) sInsert.innerHTML = ''; 
            if (rowIns) rowIns.style.display = 'none';

            document.getElementById('divider').classList.add('visible');

            let delay = 0; const step = 80; 

            if (isMtg) {
                const mainRow = document.getElementById('mtgMainRow');
                const mainContainer = document.getElementById('slots-mtg-main');

                if (mainRow && mainContainer) {
                    mainContainer.innerHTML = '';
                    mainRow.style.display = 'block';

                    const appendCardSlot = (poolArray, labelText, rarityType, count = 1, isHitSlot = false) => {
                        const sourcePool = (poolArray && poolArray.length) ? poolArray : activeSetData.pools.rare;
                        if (!sourcePool || !sourcePool.length) return;
                        
                        const isFoilSlot = labelText.toLowerCase().includes('foil') && !labelText.toLowerCase().includes('non-foil');

                        for (let i = 0; i < count; i++) {
                            const rawPickedCard = sourcePool[Math.floor(Math.random() * sourcePool.length)];
                            
                            const pickedCard = { ...rawPickedCard };
                            
                            const baseRawId = String(pickedCard.rawId || pickedCard.id || '').replace(/_(f|nf)$/, '');
                            
                            pickedCard.id = isFoilSlot ? `${baseRawId}_f` : `${baseRawId}_nf`;
                            pickedCard.rawId = baseRawId;
                            pickedCard.isFoil = isFoilSlot;

                            const cardSaveKey = String(pickedCard.id);
                            
                            if (isHitSlot) {
                                if (!savedData.spectra.map(String).includes(cardSaveKey)) savedData.spectra.push(cardSaveKey);
                            } else {
                                if (!savedData.base.map(String).includes(cardSaveKey)) savedData.base.push(cardSaveKey);
                            }
                            
                            const slotLabel = count > 1 ? `${labelText} #${i + 1}` : labelText;
                            mainContainer.appendChild(createPackCardElement(pickedCard, isHitSlot, delay, slotLabel, rarityType));
                            delay += step;
                        }
                    };

                    if (setKey === 'mtghob') {
                        const cPools = activeSetData.collectorPools || {};

                        const rollFoilBF = Math.random() * 100;
                        let poolFoilBF = cPools.foilExtendedHobRare;
                        let isHitSlot1 = false;

                        if (rollFoilBF < 33.8) {
                            poolFoilBF = cPools.foilExtendedHobRare;
                        } else if (rollFoilBF < 33.8 + 14.3) {
                            poolFoilBF = cPools.foilDragonHoardRare;
                        } else if (rollFoilBF < 33.8 + 14.3 + 11.9) {
                            poolFoilBF = cPools.surgeFoilClassicArtist;
                            isHitSlot1 = true;
                        } else if (rollFoilBF < 33.8 + 14.3 + 11.9 + 11.0) {
                            poolFoilBF = cPools.foilHobSceneRare;
                        } else if (rollFoilBF < 33.8 + 14.3 + 11.9 + 11.0 + 6.5) {
                            poolFoilBF = cPools.surgeFoilDragonHoardRare;
                            isHitSlot1 = true;
                        } else if (rollFoilBF < 33.8 + 14.3 + 11.9 + 11.0 + 6.5 + 4.9) {
                            poolFoilBF = cPools.foilDragonHoardMythic;
                        } else if (rollFoilBF < 33.8 + 14.3 + 11.9 + 11.0 + 6.5 + 4.9 + 4.6) {
                            poolFoilBF = cPools.foilBookCoverRare;
                        } else if (rollFoilBF < 33.8 + 14.3 + 11.9 + 11.0 + 6.5 + 4.9 + 4.6 + 3.6) {
                            poolFoilBF = cPools.foilBookCoverMythic;
                        } else if (rollFoilBF < 33.8 + 14.3 + 11.9 + 11.0 + 6.5 + 4.9 + 4.6 + 3.6 + 2.4) {
                            poolFoilBF = cPools.surgeFoilDragonHoardMythic;
                            isHitSlot1 = true;
                        } else if (rollFoilBF < 33.8 + 14.3 + 11.9 + 11.0 + 6.5 + 4.9 + 4.6 + 3.6 + 2.4 + 2.4) {
                            poolFoilBF = cPools.surgeFoilBookCoverRare;
                            isHitSlot1 = true;
                        } else if (rollFoilBF < 33.8 + 14.3 + 11.9 + 11.0 + 6.5 + 4.9 + 4.6 + 3.6 + 2.4 + 2.4 + 1.8) {
                            poolFoilBF = cPools.surgeFoilBookCoverMythic;
                            isHitSlot1 = true;
                        } else if (rollFoilBF < 33.8 + 14.3 + 11.9 + 11.0 + 6.5 + 4.9 + 4.6 + 3.6 + 2.4 + 2.4 + 1.8 + 1.6) {
                            poolFoilBF = cPools.foilDwarvishLanguage;
                            isHitSlot1 = true;
                        } else if (rollFoilBF < 33.8 + 14.3 + 11.9 + 11.0 + 6.5 + 4.9 + 4.6 + 3.6 + 2.4 + 2.4 + 1.8 + 1.6 + 1.3) {
                            poolFoilBF = cPools.foilExtendedHobMythic;
                        } else {
                            poolFoilBF = cPools.smaugHeadliner;
                            isHitSlot1 = true;
                        }

                        appendCardSlot(poolFoilBF, '1 Foil Booster Fun Card', 'rare', 1, isHitSlot1);

                        for (let i = 0; i < 2; i++) {
                            const roll = Math.random() * 100;
                            let pool = cPools.extendedHobRare;
                            if (roll < 30.9) pool = cPools.extendedHobRare;
                            else if (roll < 30.9 + 14.2) pool = cPools.hocSceneRare;
                            else if (roll < 30.9 + 14.2 + 13.1) pool = cPools.dragonHoardRare;
                            else if (roll < 30.9 + 14.2 + 13.1 + 11.9) pool = cPools.classicArtist;
                            else if (roll < 30.9 + 14.2 + 13.1 + 11.9 + 10.1) pool = cPools.hobSceneRare;
                            else if (roll < 30.9 + 14.2 + 13.1 + 11.9 + 10.1 + 5.3) pool = cPools.extendedHocMythic;
                            else if (roll < 30.9 + 14.2 + 13.1 + 11.9 + 10.1 + 5.3 + 4.5) pool = cPools.dragonHoardMythic;
                            else if (roll < 30.9 + 14.2 + 13.1 + 11.9 + 10.1 + 5.3 + 4.5 + 4.2) pool = cPools.bookCoverRare;
                            else if (roll < 30.9 + 14.2 + 13.1 + 11.9 + 10.1 + 5.3 + 4.5 + 4.2 + 3.3) pool = cPools.bookCoverMythic;
                            else if (roll < 30.9 + 14.2 + 13.1 + 11.9 + 10.1 + 5.3 + 4.5 + 4.2 + 3.3 + 1.5) pool = cPools.dwarvishLanguage;
                            else pool = cPools.extendedHobMythic;
                            appendCardSlot(pool, `Non-Foil Booster Fun Card #${i + 1}`, 'rare', 1, false);
                        }

                        for (let i = 0; i < 2; i++) {
                            const roll = Math.random() * 100;
                            const pool = roll < 12.4 ? cPools.foilMythic : cPools.foilRare;
                            appendCardSlot(pool, `Traditional Foil Rare or Mythic Rare Card #${i + 1}`, 'rare', 1, false);
                        }

                        appendCardSlot(cPools.foilLand, '1 Traditional Foil Middle-earth Journey Basic Land', 'common', 1, false);

                        for (let i = 0; i < 4; i++) {
                            const roll = Math.random() * 100;
                            let pool = cPools.foilUncommon;
                            if (roll < 9.2) {
                                const surgeRoll = Math.random();
                                pool = surgeRoll < 0.10 ? cPools.surgeFoilDragonHoardUncommon : cPools.foilDragonHoardUncommon;
                            } else if (roll < 9.2 + 6.2) {
                                pool = cPools.foilUncommonScene;
                            }
                            appendCardSlot(pool, `Traditional Foil Uncommon Card #${i + 1}`, 'uncommon', 1, false);
                        }

                        for (let i = 0; i < 5; i++) {
                            const roll = Math.random() * 100;
                            let pool = cPools.foilCommon;
                            if (roll < 7.5) pool = cPools.foilCommonDualLand;
                            else if (roll < 7.5 + 3.0) pool = cPools.foilCommonScene;
                            appendCardSlot(pool, `Traditional Foil Common Card #${i + 1}`, 'common', 1, false);
                        }

                        const rollToken = Math.random() * 100;
                        if (rollToken < 65.0) {
                            appendCardSlot(cPools.foilToken, '1 Traditional Foil Double-Sided Token', 'common', 1, false);
                        } else {
                            const isSigned = Math.random() < (1 / 7);
                            const label = isSigned ? '1 Gold Stamped Signature Art Card' : '1 Art Card';
                            appendCardSlot(cPools.artCard, label, 'common', 1, false);
                        }

                    } else if (setKey === 'mtgtmt') {
                        const cPools = activeSetData.collectorPools || {};

                        appendCardSlot(cPools.foilBoosterFun, '1 Foil Booster Fun rare or mythic rare card', 'rare', 1, true);

                        const isFoilSource = Math.random() < 0.25;
                        const sourceLabel = isFoilSource ? '1 Traditional foil source material card' : '1 Non-foil source material card';
                        appendCardSlot(cPools.sourceMaterial, sourceLabel, 'rare', 1, true);

                        appendCardSlot(cPools.nonfoilExtended, 'Booster Fun or TMC card', 'rare', 2, true);

                        appendCardSlot(cPools.foilRare, '1 Traditional foil rare or mythic rare card', 'rare', 1, true);

                        const landRoll = Math.random() * 100;
                        let landLabel = '1 Traditional foil pizza basic land';
                        if (landRoll < 11.1) landLabel = '1 Surge foil pizza basic land';
                        else if (landRoll < 11.1 + 22.2) landLabel = '1 Surge foil rooftop basic land';
                        appendCardSlot(cPools.foilLand, landLabel, 'common', 1, false);

                        const repRoll = Math.random() * 100;
                        let repLabel = '1 Non-foil common Commander reprint';
                        if (repRoll < 23.1) repLabel = '1 Surge foil common Commander reprint';
                        else if (repRoll < 23.1 + 17.3) repLabel = '1 Non-foil uncommon Commander reprint';
                        else if (repRoll < 23.1 + 17.3 + 7.7) repLabel = '1 Surge foil uncommon Commander reprint';
                        appendCardSlot(cPools.commanderRare, repLabel, 'common', 1, false);

                        appendCardSlot(cPools.foilUncommon, 'Traditional foil uncommon', 'uncommon', 3, false);

                        appendCardSlot(cPools.foilCommon, 'Traditional foil common', 'common', 5, false);

                        const isToken = Math.random() < 0.65;
                        if (isToken) {
                            appendCardSlot(cPools.tokens, '1 Traditional foil double-sided token', 'common', 1, false);
                        } else {
                            const isSigned = Math.random() < (1 / 7);
                            const artLabel = isSigned ? '1 Gold stamped signature art card' : '1 Art card';
                            appendCardSlot(cPools.artCards, artLabel, 'common', 1, false);
                        }

                    } else if (setKey === 'mtgecl') {
                        const cPools = activeSetData.collectorPools || {};

                        const foilRoll = Math.random() * 100;
                        let targetFoilPool, isHitSlot = false;

                        if (foilRoll < 30.4) {
                            targetFoilPool = cPools.foilExtendedRare;
                        } else if (foilRoll < 30.4 + 27.2) {
                            targetFoilPool = cPools.foilFableRare;
                        } else if (foilRoll < 30.4 + 27.2 + 7.3) {
                            targetFoilPool = cPools.foilFableMythic;
                            isHitSlot = true;
                        } else if (foilRoll < 30.4 + 27.2 + 7.3 + 5.2) {
                            targetFoilPool = cPools.foilBorderlessRare;
                            isHitSlot = true;
                        } else if (foilRoll < 30.4 + 27.2 + 7.3 + 5.2 + 4.2) {
                            targetFoilPool = cPools.foilBorderlessMythic;
                            isHitSlot = true;
                        } else if (foilRoll < 30.4 + 27.2 + 7.3 + 5.2 + 4.2 + 5.2) {
                            targetFoilPool = cPools.foilReversibleShock;
                            isHitSlot = true;
                        } else if (foilRoll < 30.4 + 27.2 + 7.3 + 5.2 + 4.2 + 5.2 + 10.5) {
                            targetFoilPool = cPools.foilSpecialGuests;
                            isHitSlot = true;
                        } else if (foilRoll < 30.4 + 27.2 + 7.3 + 5.2 + 4.2 + 5.2 + 10.5 + 9.0) {
                            targetFoilPool = cPools.japanShowcaseFoil;
                            isHitSlot = true;
                        } else if (foilRoll < 30.4 + 27.2 + 7.3 + 5.2 + 4.2 + 5.2 + 10.5 + 9.0 + 0.8) {
                            targetFoilPool = cPools.japanShowcaseFracture;
                            isHitSlot = true;
                        } else {
                            targetFoilPool = cPools.serializedBitterbloom;
                            isHitSlot = true;
                        }

                        appendCardSlot(targetFoilPool, '1 Foil Booster Fun Rare / Mythic', 'rare', 1, isHitSlot);

                        for (let i = 0; i < 2; i++) {
                            const roll = Math.random() * 100;
                            let targetPool;

                            if (roll < 37.7) {
                                targetPool = cPools.extendedRare;
                            } else if (roll < 37.7 + 33.7) {
                                targetPool = cPools.fableRare;
                            } else if (roll < 37.7 + 33.7 + 9.1) {
                                targetPool = cPools.fableMythic;
                            } else if (roll < 37.7 + 33.7 + 9.1 + 13.0) {
                                targetPool = cPools.borderlessRare;
                            } else if (roll < 37.7 + 33.7 + 9.1 + 13.0 + 4.5) {
                                targetPool = cPools.borderlessMythic;
                            } else {
                                targetPool = cPools.reversibleShock;
                            }

                            appendCardSlot(targetPool, `Non-Foil Booster Fun Rare / Mythic #${i + 1}`, 'rare', 1, false);
                        }

                        const isEccMythic = Math.random() < 0.09;
                        const eccPool = isEccMythic ? cPools.eccMythicBorderless : cPools.eccRareExtended;
                        appendCardSlot(eccPool, '1 Non-Foil Commander (ECC) Rare or Mythic', 'rare', 1, false);

                        const isMythic = Math.random() < 0.145;
                        const rarePool = isMythic ? cPools.foilMythic : cPools.foilRare;
                        appendCardSlot(rarePool, '1 Traditional Foil Rare or Mythic', 'rare', 1, false);

                        appendCardSlot(cPools.foilLand, '1 Traditional Foil Full-Art Basic Land', 'common', 1, false);

                        for (let i = 0; i < 4; i++) {
                            const isFable = Math.random() < 0.364;
                            const targetPool = isFable ? cPools.uncommonFable : cPools.foilUncommon;
                            appendCardSlot(targetPool, `Traditional Foil Uncommon #${i + 1}`, 'uncommon', 1, false);
                        }

                        for (let i = 0; i < 5; i++) {
                            appendCardSlot(cPools.foilCommon, `Traditional Foil Common #${i + 1}`, 'common', 1, false);
                        }

                        const tokenRoll = Math.random() * 100;
                        const targetTokenPool = tokenRoll < 65.0 ? cPools.foilToken : cPools.artCard;
                        appendCardSlot(targetTokenPool, '1 Art Card or Foil Double-Sided Token', 'common', 1, false);

                    } else if (setKey === 'mtgmsh') {
                        const cPools = activeSetData.collectorPools || {};

                        const rollBF = Math.random() * 100;
                        let poolBF = cPools.foilExtendedRare;
                        let isHitSlot1 = false;

                        if (rollBF < 31.8) poolBF = cPools.foilExtendedRare;
                        else if (rollBF < 31.8 + 2.7) poolBF = cPools.foilExtendedMythic;
                        else if (rollBF < 31.8 + 2.7 + 7.3) poolBF = cPools.foilSceneRare;
                        else if (rollBF < 31.8 + 2.7 + 7.3 + 4.0) { poolBF = cPools.foilSceneMythic; isHitSlot1 = true; }
                        else if (rollBF < 31.8 + 2.7 + 7.3 + 4.0 + 17.2) poolBF = cPools.foilLogoRare;
                        else if (rollBF < 31.8 + 2.7 + 7.3 + 4.0 + 17.2 + 3.6) { poolBF = cPools.foilLogoMythic; isHitSlot1 = true; }
                        else if (rollBF < 31.8 + 2.7 + 7.3 + 4.0 + 17.2 + 3.6 + 13.9) poolBF = cPools.foilPanelRare;
                        else if (rollBF < 31.8 + 2.7 + 7.3 + 4.0 + 17.2 + 3.6 + 13.9 + 3.0) { poolBF = cPools.foilPanelMythic; isHitSlot1 = true; }
                        else if (rollBF < 31.8 + 2.7 + 7.3 + 4.0 + 17.2 + 3.6 + 13.9 + 3.0 + 6.6) poolBF = cPools.foilBorderlessRareLand;
                        else if (rollBF < 31.8 + 2.7 + 7.3 + 4.0 + 17.2 + 3.6 + 13.9 + 3.0 + 6.6 + 9.9) { poolBF = cPools.classicComicFoil; isHitSlot1 = true; }
                        else if (rollBF < 31.8 + 2.7 + 7.3 + 4.0 + 17.2 + 3.6 + 13.9 + 3.0 + 6.6 + 9.9 + 0.8) { poolBF = cPools.borderlessGauntlet; isHitSlot1 = true; }
                        else { poolBF = cPools.cosmicMindStone; isHitSlot1 = true; }

                        appendCardSlot(poolBF, '1 Foil Booster Fun Rare / Mythic', 'rare', 1, isHitSlot1);

                        const rollSM = Math.random() < 0.25;
                        const poolSM = rollSM ? cPools.sourceMaterialFoil : cPools.sourceMaterialNonfoil;
                        const labelSM = rollSM ? '1 Traditional Foil Source Material' : '1 Non-Foil Source Material';
                        appendCardSlot(poolSM, labelSM, 'rare', 1, rollSM);

                        const rollNBF = Math.random() * 100;
                        let poolNBF = cPools.extendedRareNonfoil;
                        if (rollNBF < 27.8) poolNBF = cPools.extendedRareNonfoil;
                        else if (rollNBF < 27.8 + 2.3) poolNBF = cPools.extendedMythicNonfoil;
                        else if (rollNBF < 27.8 + 2.3 + 6.4) poolNBF = cPools.sceneRareNonfoil;
                        else if (rollNBF < 27.8 + 2.3 + 6.4 + 4.9) poolNBF = cPools.sceneMythicNonfoil;
                        else if (rollNBF < 27.8 + 2.3 + 6.4 + 4.9 + 15.1) poolNBF = cPools.logoRareNonfoil;
                        else if (rollNBF < 27.8 + 2.3 + 6.4 + 4.9 + 15.1 + 4.6) poolNBF = cPools.logoMythicNonfoil;
                        else if (rollNBF < 27.8 + 2.3 + 6.4 + 4.9 + 15.1 + 4.6 + 12.1) poolNBF = cPools.panelRareNonfoil;
                        else if (rollNBF < 27.8 + 2.3 + 6.4 + 4.9 + 15.1 + 4.6 + 12.1 + 2.6) poolNBF = cPools.panelMythicNonfoil;
                        else if (rollNBF < 27.8 + 2.3 + 6.4 + 4.9 + 15.1 + 4.6 + 12.1 + 2.6 + 6.95) poolNBF = cPools.sceneBoxHeroes;
                        else if (rollNBF < 27.8 + 2.3 + 6.4 + 4.9 + 15.1 + 4.6 + 12.1 + 2.6 + 13.9) poolNBF = cPools.sceneBoxVillains;
                        else if (rollNBF < 27.8 + 2.3 + 6.4 + 4.9 + 15.1 + 4.6 + 12.1 + 2.6 + 13.9 + 5.8) poolNBF = cPools.borderlessRareLandNonfoil;
                        else poolNBF = cPools.borderlessSourceMaterialNonfoil;

                        appendCardSlot(poolNBF, '1 Non-Foil Booster Fun Rare / Mythic', 'rare', 1, false);

                        const rollCmd = Math.random() * 100;
                        let poolCmd = cPools.mscExtendedRareNonfoil;
                        if (rollCmd < 93.6) poolCmd = cPools.mscExtendedRareNonfoil;
                        else if (rollCmd < 93.6 + 3.2) poolCmd = cPools.mscExtendedMythicNonfoil;
                        else poolCmd = cPools.mscBorderlessFaceCommander;

                        appendCardSlot(poolCmd, '1 Non-Foil Commander Booster Fun', 'rare', 1, false);

                        const rollFR = Math.random() * 100;
                        let poolFR = cPools.foilMainSetRare;
                        if (rollFR < 45.0) poolFR = cPools.foilMainSetRare;
                        else if (rollFR < 45.0 + 9.4) poolFR = cPools.foilMainSetMythic;
                        else if (rollFR < 45.0 + 9.4 + 1.4) poolFR = cPools.foilSceneMdfcMythic;
                        else if (rollFR < 45.0 + 9.4 + 1.4 + 1.4) poolFR = cPools.foilLogoMdfcMythic;
                        else if (rollFR < 45.0 + 9.4 + 1.4 + 1.4 + 33.8) poolFR = cPools.mscFoilNewRare;
                        else if (rollFR < 45.0 + 9.4 + 1.4 + 1.4 + 33.8 + 4.1) poolFR = cPools.mscFoilNewMythic;
                        else if (rollFR < 45.0 + 9.4 + 1.4 + 1.4 + 33.8 + 4.1 + 3.0) poolFR = cPools.mscFoilRareReprint;
                        else poolFR = cPools.welcomeMythic;

                        appendCardSlot(poolFR, '1 Traditional Foil Rare or Mythic', 'rare', 1, false);

                        const poolLand = (Math.random() < 0.5) ? cPools.landCityChaos : cPools.landCityCalm;
                        appendCardSlot(poolLand, '1 Traditional Foil City Land', 'common', 1, false);

                        const poolScene = (Math.random() < 0.20) ? cPools.foilSceneCommon : cPools.foilSceneUncommon;
                        appendCardSlot(poolScene, '1 Traditional Foil Scene Card', 'uncommon', 1, false);

                        const poolUncMsc = (Math.random() < 0.186) ? cPools.mscFoilUncommonReprint : cPools.mscFoilUncommonNew;
                        appendCardSlot(poolUncMsc, '1 Traditional Foil Uncommon MSC Card', 'uncommon', 1, false);

                        for (let i = 0; i < 2; i++) {
                            const poolComMsc = (Math.random() < 0.50) ? cPools.mscFoilCommonReprint : cPools.mscFoilCommonNew;
                            appendCardSlot(poolComMsc, `Traditional Foil Common MSC Card #${i + 1}`, 'common', 1, false);
                        }

                        for (let i = 0; i < 2; i++) {
                            appendCardSlot(cPools.foilUncommon, `Traditional Foil Uncommon #${i + 1}`, 'uncommon', 1, false);
                        }

                        for (let i = 0; i < 3; i++) {
                            const poolCom = (Math.random() < 0.11) ? cPools.foilCommonDualLand : cPools.foilCommon;
                            appendCardSlot(poolCom, `Traditional Foil Common #${i + 1}`, 'common', 1, false);
                        }

                        const rollArtToken = Math.random() * 100;
                        if (rollArtToken < 64.0) {
                            appendCardSlot(cPools.foilToken, '1 Traditional Foil Double-Sided Token', 'common', 1, false);
                        } else {
                            const isSigned = Math.random() < (4 / 36);
                            const label = isSigned ? '1 Gold Stamped Signature Art Card' : '1 Art Card';
                            appendCardSlot(cPools.artCard, label, 'common', 1, false);
                        }

                    } else if (setKey === 'mtgfra') {
                        const cPools = activeSetData.collectorPools || {};

                        const rollFoilBF = Math.random() * 100;
                        let poolFoilBF = cPools.foilBorderlessEchoedPairsRare;
                        let isHitSlot1 = false;

                        if (rollFoilBF < 17.1) {
                            poolFoilBF = cPools.foilBorderlessEchoedPairsRare;
                        } else if (rollFoilBF < 17.1 + 3.7) {
                            poolFoilBF = cPools.foilBorderlessEchoedPairsMythic;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0) {
                            poolFoilBF = cPools.foilSculptorsStrongholdRare;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0 + 4.3) {
                            poolFoilBF = cPools.foilSculptorsStrongholdMythic;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0 + 4.3 + 18.3) {
                            poolFoilBF = cPools.foilBraintwisterRare;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0 + 4.3 + 18.3 + 1.8) {
                            poolFoilBF = cPools.foilBraintwisterMythic;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0 + 4.3 + 18.3 + 1.8 + 6.1) {
                            poolFoilBF = cPools.foilPortalViewLandRare;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0 + 4.3 + 18.3 + 1.8 + 6.1 + 8.5) {
                            poolFoilBF = cPools.foilExtendedArtFraRare;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0 + 4.3 + 18.3 + 1.8 + 6.1 + 8.5 + 1.2) {
                            poolFoilBF = cPools.foilExtendedArtFraMythic;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0 + 4.3 + 18.3 + 1.8 + 6.1 + 8.5 + 1.2 + 6.1) {
                            poolFoilBF = cPools.foilSpecialGuests;
                            isHitSlot1 = true;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0 + 4.3 + 18.3 + 1.8 + 6.1 + 8.5 + 1.2 + 6.1 + 9.0) {
                            poolFoilBF = cPools.foilJapanShowcase;
                            isHitSlot1 = true;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0 + 4.3 + 18.3 + 1.8 + 6.1 + 8.5 + 1.2 + 6.1 + 9.0 + 1.0) {
                            poolFoilBF = cPools.fractureFoilJapanShowcase;
                            isHitSlot1 = true;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0 + 4.3 + 18.3 + 1.8 + 6.1 + 8.5 + 1.2 + 6.1 + 9.0 + 1.0 + 0.4) {
                            poolFoilBF = cPools.facetFoilShatteredMirrorRare;
                            isHitSlot1 = true;
                        } else if (rollFoilBF < 17.1 + 3.7 + 22.0 + 4.3 + 18.3 + 1.8 + 6.1 + 8.5 + 1.2 + 6.1 + 9.0 + 1.0 + 0.4 + 0.4) {
                            poolFoilBF = cPools.facetFoilShatteredMirrorMythic;
                            isHitSlot1 = true;
                        } else {
                            poolFoilBF = cPools.serializedBloodlineRecollector;
                            isHitSlot1 = true;
                        }

                        appendCardSlot(poolFoilBF, '1 Foil Rare / Mythic Booster Fun Card', 'rare', 1, isHitSlot1);

                        for (let i = 0; i < 2; i++) {
                            const rollNBF = Math.random() * 100;
                            let poolNBF = cPools.borderlessEchoedPairsRareNonfoil;

                            if (rollNBF < 23.1) {
                                poolNBF = cPools.borderlessEchoedPairsRareNonfoil;
                            } else if (rollNBF < 23.1 + 5.0) {
                                poolNBF = cPools.borderlessEchoedPairsMythicNonfoil;
                            } else if (rollNBF < 23.1 + 5.0 + 8.3) {
                                poolNBF = cPools.shatteredMirrorRareNonfoil;
                            } else if (rollNBF < 23.1 + 5.0 + 8.3 + 6.6) {
                                poolNBF = cPools.shatteredMirrorMythicNonfoil;
                            } else if (rollNBF < 23.1 + 5.0 + 8.3 + 6.6 + 29.8) {
                                poolNBF = cPools.sculptorsStrongholdRareNonfoil;
                            } else if (rollNBF < 23.1 + 5.0 + 8.3 + 6.6 + 29.8 + 5.8) {
                                poolNBF = cPools.sculptorsStrongholdMythicNonfoil;
                            } else if (rollNBF < 23.1 + 5.0 + 8.3 + 6.6 + 29.8 + 5.8 + 8.3) {
                                poolNBF = cPools.portalViewLandRareNonfoil;
                            } else if (rollNBF < 23.1 + 5.0 + 8.3 + 6.6 + 29.8 + 5.8 + 8.3 + 11.6) {
                                poolNBF = cPools.extendedArtFraRareNonfoil;
                            } else {
                                poolNBF = cPools.extendedArtFraMythicNonfoil;
                            }

                            appendCardSlot(poolNBF, `Non-Foil Booster Fun Rare / Mythic #${i + 1}`, 'rare', 1, false);
                        }

                        const rollCmd = Math.random() * 100;
                        let poolCmd = cPools.braintwisterRareNonfoil;

                        if (rollCmd < 44.8) {
                            poolCmd = cPools.braintwisterRareNonfoil;
                        } else if (rollCmd < 44.8 + 4.5) {
                            poolCmd = cPools.braintwisterMythicNonfoil;
                        } else if (rollCmd < 44.8 + 4.5 + 3.0) {
                            poolCmd = cPools.frcBorderlessMythicNonfoil;
                        } else {
                            poolCmd = cPools.frcExtendedRareNonfoil;
                        }

                        appendCardSlot(poolCmd, '1 Non-Foil Braintwister / FRC Commander Card', 'rare', 1, false);

                        const isMythicFoil = Math.random() < 0.169;
                        const poolFoilRM = isMythicFoil ? cPools.foilMythic : cPools.foilRare;
                        appendCardSlot(poolFoilRM, '1 Traditional Foil Rare or Mythic', 'rare', 1, false);

                        appendCardSlot(cPools.foilTowerLand, '1 Traditional Foil Tower Basic Land', 'common', 1, false);

                        for (let i = 0; i < 3; i++) {
                            const isBorderlessEP = Math.random() < 0.132;
                            const poolEP = isBorderlessEP ? cPools.foilUncommonEchoedPairsBorderless : cPools.foilUncommonEchoedPairs;
                            appendCardSlot(poolEP, `Traditional Foil Echoed Pairs Uncommon #${i + 1}`, 'uncommon', 1, false);
                        }

                        for (let i = 0; i < 2; i++) {
                            const isBraintwister = Math.random() < 0.104;
                            const poolUnc = isBraintwister ? cPools.foilUncommonBraintwister : cPools.foilUncommon;
                            appendCardSlot(poolUnc, `Traditional Foil Uncommon #${i + 1}`, 'uncommon', 1, false);
                        }

                        for (let i = 0; i < 4; i++) {
                            appendCardSlot(cPools.foilCommon, `Traditional Foil Common #${i + 1}`, 'common', 1, false);
                        }

                        const rollArtToken = Math.random() * 100;
                        if (rollArtToken < 65.0) {
                            appendCardSlot(cPools.foilToken, '1 Traditional Foil Double-Sided Token', 'common', 1, false);
                        } else {
                            const isSigned = Math.random() < 0.05;
                            const label = isSigned ? '1 Gold Stamped / Symbol Art Card' : '1 Art Card';
                            appendCardSlot(cPools.artCard, label, 'common', 1, false);
                        }

                    } else if (setKey === 'mtgsos') {
                        const cPools = activeSetData.collectorPools || {};

                        appendCardSlot(cPools.foilBoosterFun, '1 Foil Booster Fun / Serialized Chase', 'rare', 1, true);
                        appendCardSlot(cPools.rareMythicArchive, '1 Rare / Mythic Mystical Archive', 'rare', 1, true);
                        appendCardSlot(cPools.nonfoilBoosterFun, '1 Non-Foil Booster Fun Rare / Mythic', 'rare', 1, true);
                        appendCardSlot(cPools.commanderRare, '1 Non-Foil Secrets of Strixhaven Commander R/M', 'rare', 1, false);
                        appendCardSlot(cPools.foilRare, '1 Traditional Foil Main Set Rare / Mythic', 'rare', 1, true);
                        appendCardSlot(cPools.jpArchive, '1 Japanese Mystical Archive (Silver Scroll / Foil)', 'rare', 1, true);
                        appendCardSlot(cPools.uncommonArchive, 'Uncommon Mystical Archive', 'uncommon', 2, false);
                        appendCardSlot(cPools.foilLand, '1 Traditional Foil Spellcraft Land', 'common', 1, false);
                        appendCardSlot(cPools.foilUncommon, 'Traditional Foil Uncommon', 'uncommon', 3, false);
                        appendCardSlot(cPools.foilCommon, 'Traditional Foil Common', 'common', 4, false);

                    } else {
                        const pickedRare = activeSetData.pools.rare[Math.floor(Math.random() * activeSetData.pools.rare.length)];
                        const isHit = activeSetData.pools.hits.some(h => (h.id && h.id === pickedRare.id) || h.n === pickedRare.n);
                        const hitKey = String(pickedRare.id || pickedRare.n);
                        const baseKey = String(pickedRare.n);

                        if (isHit) {
                            if (!savedData.spectra.map(String).includes(hitKey)) savedData.spectra.push(hitKey);
                        } else {
                            if (!savedData.base.map(String).includes(baseKey)) savedData.base.push(baseKey);
                        }
                        mainContainer.appendChild(createPackCardElement(pickedRare, isHit, delay, 'Rare / Mythic', 'rare'));
                        delay += step;

                        for (let u = 0; u < 3; u++) {
                            const poolU = activeSetData.pools.uncommon;
                            const pickedU = poolU[Math.floor(Math.random() * poolU.length)];
                            const strUKey = String(pickedU.n);
                            if (!savedData.base.map(String).includes(strUKey)) savedData.base.push(strUKey);
                            mainContainer.appendChild(createPackCardElement(pickedU, false, delay, `Uncommon #${u + 1}`, 'uncommon'));
                            delay += step;
                        }

                        const totalCommons = ['mtglea', 'mtgleb', 'mtg2ed', 'mtg3ed'].includes(setKey) ? 12 : 11;
                        for (let c = 0; c < totalCommons; c++) {
                            const poolC = activeSetData.pools.common;
                            const pickedC = poolC[Math.floor(Math.random() * poolC.length)];
                            const strCKey = String(pickedC.n);
                            if (!savedData.base.map(String).includes(strCKey)) savedData.base.push(strCKey);
                            mainContainer.appendChild(createPackCardElement(pickedC, false, delay, `Common #${c + 1}`, 'common'));
                            delay += step;
                        }
                    }
                }

            } else {
                let insertArr = activeSetData.spectraCards || activeSetData.dynaCards || activeSetData.holoCards || activeSetData.stickerCards || [];
                let pullRate = setKey === 'motu1984' ? 1.0 : (setKey === 'mm1993' ? (1/9) : (setKey === 'mm1992' ? 0.25 : (1/12)));
                let hasInsert = setKey !== 'gpk1' && Math.random() <= pullRate;

                if (hasInsert && sInsert && rowIns) {
                    const rInsert = insertArr[Math.floor(Math.random() * insertArr.length)];
                    const trackingId = (setKey === 'xmen1992' || setKey === 'motu1984' || setKey === 'mu1990' || setKey === 'mm1992' || setKey === 'mm1993') ? rInsert.id : String(rInsert.n);
                    if (!savedData.spectra.map(String).includes(trackingId)) savedData.spectra.push(trackingId);
                    rowIns.style.display = 'block';
                    sInsert.appendChild(createPackCardElement(rInsert, true, delay, 'Insert Slot', 'rare'));
                    delay += step;
                }

                let targetAmt = 5; 
                if (setKey === 'gpk1') targetAmt = 5;
                else if (setKey === 'motu1984') targetAmt = 10;
                else if (setKey === 'mu1990') targetAmt = hasInsert ? 11 : 12;
                else targetAmt = hasInsert ? 5 : 6;

                let availablePool = [...activeSetData.baseCards];
                if (setKey === 'mu1990') availablePool = availablePool.filter(c => parseInt(String(c.n).trim().replace(/^\D+/g, ''), 10) <= 162);
                
                for (let i = availablePool.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [availablePool[i], availablePool[j]] = [availablePool[j], availablePool[i]];
                }

                let pulledBase = availablePool.slice(0, Math.min(targetAmt, availablePool.length));
                pulledBase.forEach((rc, idx) => {
                    const uniqKey = setKey === 'gpk1' ? `${rc.n}${rc.v}` : String(rc.n);
                    if (!savedData.base.map(String).includes(uniqKey)) savedData.base.push(uniqKey);
                    sBase.appendChild(createPackCardElement(rc, false, delay, `Card #${idx + 1}`, 'common'));
                    delay += step;
                });
            }

            localStorage.setItem(setKey, JSON.stringify(savedData));
            refreshGridSlots();

            setTimeout(() => {
                if (pack) pack.classList.remove('pack-tearing');
                
                const packImgEl = document.getElementById('packWrapperImg');
                if (packImgEl && setConfig) {
                    const nextPackArt = getRandomPackWrapper(setKey, setConfig.coverImage);
                    if (nextPackArt) packImgEl.src = nextPackArt;
                }

                if (wrapperEl) { wrapperEl.classList.remove('opened'); wrapperEl.style.opacity = '1'; }
                window.openingPackState = false; 
                if (btn) { btn.disabled = false; btn.textContent = 'Open Another Pack'; }
            }, delay + 400);

            setTimeout(() => { 
                const divider = document.getElementById('divider');
                if (divider) divider.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); 
            }, 300);
        }, 460);
    };

    const openBtn = document.getElementById('openBtn');
    if (openBtn) openBtn.onclick = window.openPack;

    function createPackCardElement(card, isInsert, currentDelay, slotLabel = '', rarityClass = 'common') {
        const slot = document.createElement('div'); slot.className = 'card-slot';
        
        if (slotLabel) {
            const headerLabel = document.createElement('div');
            headerLabel.className = `slot-header-label ${rarityClass}`;
            headerLabel.textContent = slotLabel;
            slot.appendChild(headerLabel);
        }

        const cardDiv = document.createElement('div'); cardDiv.className = 'card';
        cardDiv.style.animationDelay = currentDelay + 'ms';

        const frontImg = card.frontImg || getImgPath(card.n, 'front', isInsert, card.variant || card.v || '');
        const backImg = card.backImg || getImgPath(card.n, 'back', isInsert, card.variant || card.v || '');

        cardDiv.innerHTML = `<img src="${frontImg}">`;
        cardDiv.onclick = () => showLightbox(frontImg, backImg);

        setTimeout(() => { cardDiv.classList.add('revealed'); }, currentDelay + 20);
        const hint = document.createElement('div'); hint.className = 'flip-hint'; hint.textContent = 'click to view';
        slot.appendChild(cardDiv); slot.appendChild(hint); return slot;
    }

    function refreshGridSlots() {
        if (setKey === 'mtgecl' && containerECLSub) {
            renderECLSubcategoryChecklist(containerECLSub, savedData.base, activeSetData);
        } else if (setKey === 'mtghob' && containerECLSub) {
            renderHOBSubcategoryChecklist(containerECLSub, savedData.base, activeSetData);
        } else if (setKey === 'mtgmsh' && containerECLSub) {
            renderMSHSubcategoryChecklist(containerECLSub, savedData.base, activeSetData);
        } else if (setKey === 'mtgfra' && containerECLSub) {
            renderFRASubcategoryChecklist(containerECLSub, savedData.base, activeSetData);
        } else {
            savedData.base.forEach(k => {
                const slot = document.getElementById(`col-base-${k}`);
                if (slot && slot.classList.contains('no-image')) {
                    const card = activeSetData.baseCards.find(c => (setKey === 'gpk1' ? `${c.n}${c.v}` : String(c.n)) == k);
                    if (card) {
                        const frontImg = card.frontImg || getImgPath(card.n, 'front', false, card.v || '');
                        const backImg = card.backImg || getImgPath(card.n, 'back', false, card.v || '');
                        slot.className = 'col-slot filled'; slot.innerHTML = `<img src="${frontImg}">`;
                        slot.onclick = () => showLightbox(frontImg, backImg);
                    }
                }

                if (setKey === 'xmen1992') {
                    const pSlot = document.getElementById(`col-puzzle-${k}`);
                    if (pSlot && pSlot.classList.contains('no-image')) {
                        const pCard = activeSetData.baseCards.find(c => String(c.n) == k);
                        if (pCard) {
                            pSlot.className = 'col-slot filled'; pSlot.innerHTML = `<img src="${getImgPath(pCard.n, 'front', false)}">`;
                            pSlot.onclick = () => showLightbox(getImgPath(pCard.n, 'front', false), getImgPath(pCard.n, 'back', false));
                        }
                    }
                }
            });
        }

        if (setKey === 'mtghob') {
            activeSetData.baseCards.forEach(card => {
                const cn = parseInt(card.collectorNumber || card.n, 10);
                const isHobScene1 = (card.setCode === 'hob' || !card.setCode) && cn >= 199 && cn <= 204;
                const isHobScene2 = (card.setCode === 'hob' || !card.setCode) && cn >= 205 && cn <= 213;
                const isHocScene3 = card.setCode === 'hoc' && cn >= 1 && cn <= 6;

                if (isHobScene1 || isHobScene2 || isHocScene3) {
                    const slot = document.getElementById(`col-hob-scene-${card.setCode || 'hob'}-${card.collectorNumber || card.n}`);
                    const rawId = String(card.rawId || card.id || card.n).replace(/_(f|nf)$/, '');
                    
                    const isCollected = savedData.base.some(savedId => {
                        const cleanSaved = String(savedId).replace(/_(f|nf)$/, '');
                        return cleanSaved === rawId;
                    }) || savedData.spectra.some(savedId => {
                        const cleanSaved = String(savedId).replace(/_(f|nf)$/, '');
                        return cleanSaved === rawId;
                    });
                    
                    if (slot && isCollected && slot.classList.contains('no-image')) {
                        const frontImg = card.frontImg || getImgPath(card.n, 'front', false);
                        const backImg = card.backImg || getImgPath(card.n, 'back', false);
                        slot.className = 'col-slot filled';
                        slot.innerHTML = `<img src="${frontImg}">`;
                        slot.onclick = () => showLightbox(frontImg, backImg);
                    }
                }
            });
        }

        if (isMtg) {
            activeSetData.pools.hits.forEach(card => {
                const hitKey = String(card.id || card.n);
                const isCollected = savedData.spectra.map(String).includes(hitKey);
                const slot = document.getElementById(`col-insert-${card.id || card.n}`);
                if (slot && isCollected && slot.classList.contains('no-image')) {
                    const frontImg = card.frontImg || getImgPath(card.n, 'front', false);
                    const backImg = card.backImg || getImgPath(card.n, 'back', false);
                    slot.className = 'col-slot filled';
                    slot.innerHTML = `<img src="${frontImg}">`;
                    slot.onclick = () => showLightbox(frontImg, backImg);
                }
            });
        } else {
            let explicitInserts = activeSetData.spectraCards || activeSetData.dynaCards || activeSetData.holoCards || activeSetData.stickerCards || [];
            explicitInserts.forEach(card => {
                const slot = document.getElementById(`col-insert-${card.id || card.n}`);
                const trackKey = (setKey === 'xmen1992' || setKey === 'motu1984' || setKey === 'mu1990' || setKey === 'mm1992' || setKey === 'mm1993') ? card.id : String(card.n);
                const isCollected = savedData.spectra.map(String).includes(trackKey);
                if (slot && isCollected && slot.classList.contains('no-image')) {
                    slot.className = 'col-slot filled'; slot.innerHTML = `<img src="${getImgPath(card.n, 'front', true, card.variant || '')}">`;
                    slot.onclick = () => showLightbox(getImgPath(card.n, 'front', true, card.variant || ''), getImgPath(card.n, 'back', true, card.variant || ''));
                }

                if (setKey === 'motu1984') {
                    const redPuzzleSlot = document.getElementById(`col-motu-red-puzzle-${card.id}`);
                    if (redPuzzleSlot && isCollected && redPuzzleSlot.classList.contains('no-image')) {
                        redPuzzleSlot.className = 'col-slot filled';
                        redPuzzleSlot.innerHTML = `<img src="${getImgPath(card.n, 'back', true, card.variant || '')}">`;
                        redPuzzleSlot.onclick = () => showLightbox(getImgPath(card.n, 'front', true, card.variant || ''), getImgPath(card.n, 'back', true, card.variant || ''));
                    }

                    const bluePuzzleSlot = document.getElementById(`col-motu-blue-puzzle-${card.id}`);
                    if (bluePuzzleSlot && isCollected && bluePuzzleSlot.classList.contains('no-image')) {
                        bluePuzzleSlot.className = 'col-slot filled';
                        bluePuzzleSlot.innerHTML = `<img src="${getImgPath(card.n, 'back', true, card.variant || '')}">`;
                        bluePuzzleSlot.onclick = () => showLightbox(getImgPath(card.n, 'front', true, card.variant || ''), getImgPath(card.n, 'back', true, card.variant || ''));
                    }
                }
            });
        }
        updateCounters();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initModals();
    renderDashboardGrid();

    const menuTriggerBtn = document.getElementById('menu-trigger-btn');
    const headerDropdownMenu = document.getElementById('header-dropdown-menu');

    if (menuTriggerBtn && headerDropdownMenu) {
        menuTriggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            headerDropdownMenu.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!headerDropdownMenu.contains(e.target) && e.target !== menuTriggerBtn) {
                headerDropdownMenu.classList.remove('open');
            }
        });
    }

    document.getElementById('privacy-nav-btn')?.addEventListener('click', (e) => { e.preventDefault(); triggerNavigation('privacy', true); });
    document.getElementById('terms-nav-btn')?.addEventListener('click', (e) => { e.preventDefault(); triggerNavigation('terms', true); });
    document.getElementById('contact-nav-btn')?.addEventListener('click', (e) => { e.preventDefault(); triggerNavigation('contact', true); });

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.set-meta-about-trigger');
        if (trigger) {
            e.stopPropagation();
            e.preventDefault();
            const targetKey = trigger.getAttribute('data-set-key');
            openSetAboutModal(targetKey, SETS_REGISTRY);
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const activeSetQuery = urlParams.get('set');
    if (activeSetQuery && (SETS_REGISTRY.some(s => s.key === activeSetQuery) || STATIC_ROUTES[activeSetQuery])) {
        triggerNavigation(activeSetQuery, false);
    } else {
        triggerNavigation(null, false);
    }

    const spaBackBtn = document.getElementById('spa-back-btn');
    if (spaBackBtn) {
        spaBackBtn.onclick = (e) => { e.preventDefault(); triggerNavigation(null, true); };
    }
});

window.onpopstate = (event) => {
    const targetSet = event.state ? event.state.set : null;
    triggerNavigation(targetSet, false);
};