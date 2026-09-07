// js/ui-modals.js

export function initModals() {
    const aboutNavBtn = document.getElementById('about-nav-btn');
    const menuAboutBtn = document.getElementById('menu-about-btn');
    const aboutModal = document.getElementById('aboutModal');
    const aboutModalClose = document.getElementById('aboutModalClose');

    const setAboutModal = document.getElementById('setAboutModal');
    const setAboutModalClose = document.getElementById('setAboutModalClose');

    function triggerAboutModal(e) {
        if (e) e.preventDefault();
        const headerDropdownMenu = document.getElementById('header-dropdown-menu');
        if (headerDropdownMenu) headerDropdownMenu.classList.remove('open');
        if (aboutModal) aboutModal.classList.add('open');
    }

    if (aboutNavBtn) aboutNavBtn.onclick = triggerAboutModal;
    if (menuAboutBtn) menuAboutBtn.onclick = triggerAboutModal;

    if (aboutModalClose && aboutModal) {
        aboutModalClose.onclick = () => aboutModal.classList.remove('open');
        aboutModal.onclick = (e) => { if (e.target === aboutModal) aboutModal.classList.remove('open'); };
    }

    if (setAboutModalClose && setAboutModal) {
        setAboutModalClose.onclick = () => setAboutModal.classList.remove('open');
        setAboutModal.onclick = (e) => { if (e.target === setAboutModal) setAboutModal.classList.remove('open'); };
    }
}

export function openSetAboutModal(setKey, registry) {
    const setAboutTitle = document.getElementById('setAboutTitle');
    const setAboutText = document.getElementById('setAboutText');
    const setAboutModal = document.getElementById('setAboutModal');

    const setConfig = registry.find(s => s.key === setKey);
    if (setConfig && setAboutTitle && setAboutText && setAboutModal) {
        setAboutTitle.textContent = setConfig.aboutTitle;
        setAboutText.textContent = setConfig.aboutText;
        setAboutModal.classList.add('open');
    }
}

export function showLightbox(front, back) {
    const frontImg = document.getElementById('lightbox-front');
    const backImg = document.getElementById('lightbox-back');
    const lb = document.getElementById('lightbox');

    if (frontImg) frontImg.src = front;
    
    if (backImg) {
        backImg.onerror = null;
        backImg.src = back;
        backImg.style.display = 'block';
    }
    
    if (lb) lb.classList.add('open');
}

// Global exposure for dynamic module click handlers
window.showLightbox = showLightbox;