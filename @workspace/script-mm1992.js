//  =========================
//   MARVEL MASTERPIECES 1992
//   Pack Opener Script
// =========================

document.addEventListener('DOMContentLoaded', initCollection);

function resetPack() {

    const packEl = document.getElementById('pack');
    const wrapper = document.getElementById('packWrapper');
    const btn = document.getElementById('openBtn');
    const labelEl = document.getElementById('packLabel');
    packEl.classList.remove('pack-tearing');
    packEl.style.animation = 'none'; packEl.offsetHeight; packEl.style.animation = '';
    wrapper.classList.remove('opened'); 
    wrapper.style.opacity = '1'; wrapper.style.pointerEvents = 'auto';
    btn.disabled = false; 
    btn.textContent = 'Open Another Pack'; 
    labelEl.textContent = '';
    opening = false;
}

function openPack() {
    if (opening) return;
    const packEl = document.getElementById('pack');
    const wrapper = document.getElementById('packWrapper');
    const btn = document.getElementById('openBtn');
    const labelEl = document.getElementById('packLabel');
    opening = true;
    labelEl.textContent = 'Opening pack...';
    setTimeout(() => {
        packEl.classList.add('pack-tearing');
        wrapper.classList.add('opened'); 
        wrapper.style.opacity = '0'; wrapper.style.pointerEvents = 'none';
        btn.disabled = true; btn.textContent = 'Opened!'; labelEl.textContent = '';
        const slotMap = document.getElementById('slotMap') || {};
        for (let id in slotMap) {
            const s = slotMap[id];
            if (s && s.type !== 'holos') { 
                if (!s.revealed) {
                    revealCard(s);
                } else {
                    resetCard(s);
                }
            }
        }
    }, 1300);
}

function drawCard(slot) {
    const card = document.createElement('div');
    card.className = 'card';
    if (!slot.noImage) {
        const img = document.createElement('img');
        const id = slot.id.toString().padStart(3, '0');
        let path;
        if (slot.type === 'spectra') { path = "cards/marvel_masterpieces_1992/spectra/impel/" + id + ".webp"; }
        else if (slot.type === 'holos') { path = "cards/marvel_masterpieces_1992/holos/" + id + ".webp"; }
        else { path = "cards/marvel_masterpieces_1992/impel/" + id + ".webp"; }
        img.src = path;
        card.appendChild(img);
    }
    const hint = document.createElement('div');
    hint.className = 'flip-hint';
    hint.textContent = 'tap to flip';
    card.appendChild(hint);
    card.addEventListener('click', () => { if (slot.type === 'holos') { if (!slot.revealed) revealCard(slot); else resetCard(slot); } });
    return card;
}

function revealCard(slot) {
    slot.card = drawCard(slot);
    slot.baseCount++;
    const rowEl = document.querySelector('.row-label[data-type="base"]');
    if (rowEl) rowEl.textContent = 'Base Cards';
    updateProgress();
    saveState(); renderCollection();
}

function resetCard(slot) {
    slot.revealed = false;
    slot.baseCount--;
    updateProgress();
}

function updateProgress() {
    const baseCards = document.getElementById('baseCounter') || {};
    const insertCards = document.getElementById('insertCounter') || {};
    let baseTotal = (baseCards.total || 0) + parseInt(document.querySelector('.set-meta').textContent.match(/\d+/)[0]);
    let insertTotal = 0;
    if ((document.querySelector('.set-meta')?.textContent || '').match(/dyna/)) {
        insertTotal = 18;
    } else if ((document.querySelector('.set-meta')?.textContent || '').match(/holo/)) {
        insertTotal = 24;
    } else if ((document.querySelector('.set-meta')?.textContent || '').match('etch')) {
        insertTotal = 20;
    }
    baseCards.total = baseTotal;
    const total = baseTotal + insertTotal;
    const slots = document.querySelectorAll('.card-slot');
    let collected = 0;
    slots.forEach(s => { if (s.dataset.count) collected += parseInt(s.dataset.count); });
    const pct = Math.round((collected / total) * 100);
    const bar = document.getElementById('baseProgress') || document.getElementById('insertProgress');
    if (bar) bar.style.width = pct + '%';
}

function saveState() {
    const state = {}; baseCards.forEach(s => { state[s.dataset.id] = { revealed: s.revealed, baseCount: s.baseCount, type: s.type }; }); insertCards.forEach(s => { state['insert_' + s.dataset.id] = { revealed: s.revealed, baseCount: s.baseCount, type: s.type }; }); localStorage.setItem('mm1992', JSON.stringify(state));
}

function renderCollection() {
    const slots = document.querySelectorAll('.card-slot');
    const state = JSON.parse(localStorage.getItem('mm1992') || '{}');
    const slotMap = {}; baseCards.forEach((s, i) => { slotMap[s.dataset.id] = s; }); insertCards.forEach(s => { slotMap['insert_' + s.dataset.id] = s; });
    slots.forEach(slot => { const key = slot.dataset.id.replace(/^base_/, '').replace(/^insert_/, '') || slot.dataset.type; const saved = state[key]; if (saved && !slot.card) { if (!saved.revealed) revealCard(slot); else resetCard(slot); }});
}

function initCollection() {
    const baseTotal = 105; const insertTotal = (document.querySelector('.set-meta')?.textContent || '').match(/dyna/ ? 18 : /holo/ ? 24 : 0);
    let id = 1;
    for (let i=0; i<baseTotal; i++) { baseCards.push(createSlot('base', i+1)); id++; }
    for (let i=0; i<insertTotal; i++) { insertCards.push(createSlot('holos', id++)); }
    document.getElementById('baseCounter').total = baseTotal;
    document.getElementById('insertCounter').total = insertTotal;
}

function createSlot(type, id) {
    const slot = document.createElement('div');
    slot.className = 'card-slot';
    slot.id = type + '_' + id;
    slot.dataset.type = type; slot.dataset.id = type + '_' + id; slot.dataset.count = '0';
    const card = drawCard({type});
    const container = document.createElement('div');
    container.style.position='relative'; container.style.height='160px';
    container.appendChild(card);
    const hint = document.createElement('div');
    hint.className = 'flip-hint'; hint.textContent = 'tap to flip'; container.appendChild(hint);
    slot.appendChild(container);
    return slot;
}

let baseCards = []; let insertCards = []; let opening = false;
