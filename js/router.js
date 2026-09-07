// js/router.js
import { renderSetGuide } from './guides-renderer.js';

export function updateSpaHeadMetadata(setKey, registry, staticRoutes) {
    const titleNode = document.getElementById('seo-title');
    const descNode = document.getElementById('seo-description');
    
    if (!setKey) {
        titleNode.textContent = "Rip Boosters - Trading Card Pack Opening Simulator";
        descNode.setAttribute('content', "Open free nostalgic trading card booster packs instantly. Revisit retro card sets from Magic: The Gathering, Marvel Masterpieces, Marvel Universe, He-Man, and Garbage Pail Kids with authentic pull rates.");
    } else if (staticRoutes[setKey]) {
        titleNode.textContent = staticRoutes[setKey].seoTitle;
        descNode.setAttribute('content', staticRoutes[setKey].seoDesc);
    } else {
        const setConfig = registry.find(s => s.key === setKey);
        if (setConfig) {
            titleNode.textContent = setConfig.seoTitle;
            descNode.setAttribute('content', setConfig.seoDesc);
        }
    }
}

export function applySetBodyTheme(setKey, registry) {
    if (!setKey) {
        document.body.classList.remove('set-active-bg');
        document.body.style.removeProperty('--set-bg-img');
        return;
    }

    const setConfig = registry.find(s => s.key === setKey);
    if (setConfig && setConfig.coverImage) {
        document.body.style.setProperty('--set-bg-img', `url('${window.location.origin}/${setConfig.coverImage}')`);
        document.body.classList.add('set-active-bg');
    } else {
        document.body.classList.remove('set-active-bg');
        document.body.style.removeProperty('--set-bg-img');
    }
}

export async function navigateToView(setKey, updateHistory = true, context) {
    const { 
        registry, 
        staticRoutes, 
        fetchSetDataModule, 
        loadViewLayout, 
        updateDashboardProgressTracks 
    } = context;

    window.openingPackState = false;
    window.scrollTo({ top: 0, behavior: 'instant' });
    applySetBodyTheme(setKey, registry);

    const viewDashboard = document.getElementById('view-dashboard');
    const viewAppPortal = document.getElementById('view-app-portal');
    const viewPrivacy = document.getElementById('view-privacy-policy');
    const viewTerms = document.getElementById('view-terms-of-service');
    const viewContact = document.getElementById('view-contact-us');
    const spaBackBtn = document.getElementById('spa-back-btn');
    const headerMainTitle = document.getElementById('header-main-title');
    const headerSubtitle = document.getElementById('header-subtitle');
    const archiveSection = document.getElementById('set-descriptions-archive');

    updateSpaHeadMetadata(setKey, registry, staticRoutes);

    if (archiveSection) {
        renderSetGuide(archiveSection, setKey);
    }

    if (!setKey) {
        if (viewPrivacy) viewPrivacy.style.display = 'none';
        if (viewTerms) viewTerms.style.display = 'none';
        if (viewContact) viewContact.style.display = 'none';
        viewAppPortal.style.display = 'none'; 
        viewAppPortal.innerHTML = ''; 
        viewDashboard.style.display = 'block'; 
        spaBackBtn.style.visibility = 'hidden';
        headerMainTitle.textContent = "Rip Boosters"; 
        headerSubtitle.innerHTML = ""; 
        
        updateDashboardProgressTracks();
        
        if (updateHistory) {
            history.pushState({ set: null }, '', window.location.pathname);
        }
    } else if (staticRoutes[setKey]) {
        const routeInfo = staticRoutes[setKey];
        viewDashboard.style.display = 'none';
        viewAppPortal.style.display = 'none';
        viewAppPortal.innerHTML = '';
        
        if (viewPrivacy) viewPrivacy.style.display = setKey === 'privacy' ? 'block' : 'none';
        if (viewTerms) viewTerms.style.display = setKey === 'terms' ? 'block' : 'none';
        if (viewContact) viewContact.style.display = setKey === 'contact' ? 'block' : 'none';
        
        spaBackBtn.style.visibility = 'visible';
        headerMainTitle.textContent = routeInfo.mainTitle;
        headerSubtitle.innerHTML = routeInfo.subTitle;
        
        if (updateHistory) history.pushState({ set: setKey }, '', `?set=${setKey}`);
    } else {
        const setConfig = registry.find(s => s.key === setKey);
        if (!setConfig) return navigateToView(null, true, context);

        if (viewPrivacy) viewPrivacy.style.display = 'none';
        if (viewTerms) viewTerms.style.display = 'none';
        if (viewContact) viewContact.style.display = 'none';

        if (setConfig.isMtg) {
            headerMainTitle.textContent = "Loading Scryfall...";
            headerSubtitle.innerHTML = "Gathering card sheets from historical archives...";
        }

        try {
            await fetchSetDataModule(setKey);
        } catch (e) {
            alert("Could not load card set data. Please check your connection.");
            return navigateToView(null, true, context);
        }

        viewDashboard.style.display = 'none'; 
        viewAppPortal.style.display = 'block'; 
        spaBackBtn.style.visibility = 'visible';
        
        headerMainTitle.textContent = setConfig.name; 
        headerSubtitle.innerHTML = `${setConfig.year} &middot; ${setConfig.publisher} &middot; <span class="set-meta-about-trigger" data-set-key="${setKey}">About</span>`;
        
        loadViewLayout(setKey);
        
        if (updateHistory) history.pushState({ set: setKey }, '', `?set=${setKey}`);
    }
}