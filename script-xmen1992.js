//-1992 IMPELX-MEN
const IMG_DIR = 'card_images/xmen_impel_1992/';

function imgPath(n, side) { return IMG_DIR + side + '_' + String(n).padStart(3, '0') + '.jpg'; }

const base = [
    { n: 1, name: "Beast" }, { n: 2, name: "Wolverine" }, { n: 3, name: "Havok" },
    { n: 4, name: "Iceman" }, { n: 5, name: "Phoenix" }, { n: 6, name: "Nightcrawler" },
    { n: 7, name: "Cannonball" }, { n: 8, name: "Wolfsbane" }, { n: 9, name: "Siryn" },
    { n: 10, name: "Lockheed" }, { n: 11, name: "Professor X" }, { n: 12, name: "Psylocke" },
    { n: 13, name: "Domino" }, { n: 14, name: "Storm" }, { n: 15, name: "Meggan" },
    { n: 16, name: "Feral" }, { n: 17, name: "Cyclops" }, { n: 18, name: "Gambit" },
    { n: 19, name: "Cable" }, { n: 20, name: "Archangel" }, { n: 21, name: "Banshee" },
    { n: 22, name: "Shadowcat" }, { n: 23, name: "Kylun" }, { n: 24, name: "Jean Grey" },
    { n: 25, name: "Colossus" }, { n: 26, name: "Warpath" }, { n: 27, name: "Polaris" },
    { n: 28, name: "Boom Boom" }, { n: 29, name: "Jubilee" }, { n: 30, name: "Shatterstar" },
    { n: 31, name: "Strong Guy" }, { n: 32, name: "Captain Britain" }, { n: 33, name: "Forge" },
    { n: 34, name: "Multiple Man" }, { n: 35, name: "Quicksilver" }, { n: 36, name: "Rogue" },
    { n: 37, name: "Widget" }, { n: 38, name: "Bishop" }, { n: 39, name: "Maverick" }, { n: 40, name: "Cerise" },
    { n: 41, name: "Magneto" }, { n: 42, name: "Mr. Sinister" }, { n: 43, name: "Deadpool" },
    { n: 44, name: "Proteus" }, { n: 45, name: "Mojo Il" }, { n: 46, name: "Juggernaut" },
    { n: 47, name: "Sentinels" }, { n: 48, name: "Gideon" }, { n: 49, name: "Masque" },
    { n: 50, name: "Shiva" }, { n: 51, name: "Apocalypse" }, { n: 52, name: "Sabretooth" },
    { n: 53, name: "Mojo" }, { n: 54, name: "Caliban" }, { n: 55, name: "Gatecrasher" },
    { n: 56, name: "Brood" }, { n: 57, name: "Blob" }, { n: 58, name: "Stryfe" },
    { n: 59, name: "Warwolves" }, { n: 60, name: "Omega Red" }, { n: 61, name: "Black Tom" },
    { n: 62, name: "Mystique" }, { n: 63, name: "Sauron" }, { n: 64, name: "Saturnyne" },
    { n: 65, name: "Toad" }, { n: 66, name: "Shadow King" }, { n: 67, name: "White Queen" },
    { n: 68, name: "Mastermind" }, { n: 69, name: "Deathbird" }, { n: 70, name: "Lady Deathstrike" },
    { n: 71, name: "X-Men Gold Strike Force" }, { n: 72, name: "X-Men Blue Strike Force" },
    { n: 73, name: "X-Factor" }, { n: 74, name: "X-Force" }, { n: 75, name: "Excalibur" },
    { n: 76, name: "Hellfire Club" }, { n: 77, name: "Mutant Liberation Front" },
    { n: 78, name: "Brotherhood of Evil Mutants" }, { n: 79, name: "Upstarts" }, { n: 80, name: "Technet" },
    { n: 81, name: "Sunspot" }, { n: 82, name: "Dark Phoenix" }, { n: 83, name: "Longshot" },
    { n: 84, name: "Magik" }, { n: 85, name: "Dazzler" },
    { n: 86, name: "Starjammers" }, { n: 87, name: "Imperial Guard" },
    { n: 88, name: "Lilandra" }, { n: 89, name: "W.H.O." }, { n: 90, name: "Roma" },
    { n: 91, name: "Danger Room: Nightcrawler" }, { n: 92, name: "Danger Room: Archangel" },
    { n: 93, name: "Danger Room: Storm" }, { n: 94, name: "Danger Room: Gambit" },
    { n: 95, name: "Danger Room: Wolverine" }, { n: 96, name: "Danger Room: Shatterstar" },
    { n: 97, name: "Danger Room: Cyclops" }, { n: 98, name: "Danger Room: Cable" },
    { n: 99, name: "Danger Room: Colossus" }, { n: 100, name: "Checklist / Cerebro" }
];

const holos = [
    { n: 1, id: 'XH-1', name: "Wolverine" }, { n: 2, id: 'XH-2', name: "Cable" },
    { n: 3, id: 'XH-3', name: "Gambit" }, { n: 4, id: 'XH-4', name: "Magneto" },
    { n: 5, id: 'XH-5', name: "X-Men" }
];

function drawPack() {
    const shuffled = [...base].sort(() => Math.random() - .5);
    const holoHit = Math.random() < (1 / 36);
    return { base: shuffled.slice(0, holoHit ? 5 : 6), holo: holoHit ? [holos[Math.floor(Math.random() * holos.length)]] : [] };

}

function makeCard(card, isHolo, delay) {

    const slot = document.createElement('div');

    slot.className = 'card-slot' + (isHolo ? ' holo' : '');

    const frontSrc = isHolo ? IMG_DIR + 'holo_front_' + card.n + '.jpg' : imgPath(card.n, 'front');
    const backSrc = isHolo ? IMG_DIR + 'holo_back_' + card.n + '.jpg' : imgPath(card.n, 'back');
    const cardEl = document.createElement('div');

    cardEl.className = 'card'; cardEl.style.animationDelay = delay + 'ms';

    const img = document.createElement('img');

    img.src = frontSrc; img.alt = card.name; img.loading = 'lazy';

    img.onerror = function () { if (this.src !== frontSrc) this.src = frontSrc; };

    cardEl.appendChild(img);

    cardEl.addEventListener('click', function () { openLightbox(frontSrc, backSrc, card.name); });
    const hint = document.createElement('div');

    hint.className = 'flip-hint';
    hint.textContent = 'click to view';

    slot.appendChild(cardEl); slot.appendChild(hint);

    return { slot, cardEl };
}
let opening = false, packsOpenedCount = 0, sessionPacksCount = 0, collectedCount = 0;
const STORE_KEY = 'xmen1992', TOTAL_CARDS = 105;

function saveState() {
    const cb = [], ch = [];
    document.querySelectorAll('.col-slot.filled').forEach(function (s) {
        s.classList.contains('holo-slot') ? ch.push(s.id.replace('col-holo-', '')) : cb.push(s.id.replace('col-base-', ''));
    });
    localStorage.setItem(STORE_KEY, JSON.stringify({ base: cb, holos: ch, packs: packsOpenedCount }));
}

function loadState() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
}

function initCollection() {
    const grid = document.getElementById('collectionGrid'), hgrid = document.getElementById('holoGrid');
    base.forEach(function (card) {
        const slot = document.createElement('div');
        slot.className = 'col-slot'; slot.id = 'col-base-' + card.n;

        slot.innerHTML = '<span class="col-num">#' + String(card.n).padStart(3, '0') + '</span><span class="col-name">' + card.name + '</span>';

        grid.appendChild(slot);
    });

    holos.forEach(function (card) {
        const slot = document.createElement('div');
        slot.className = 'col-slot holo-slot'; slot.id = 'col-holo-' + card.n;
        slot.innerHTML = '<span class="col-num">' + card.id + '</span><span class="col-name">' + card.name + '</span>';
        hgrid.appendChild(slot);
    });
    const saved = loadState();
    if (saved.packs) { packsOpenedCount = saved.packs; document.getElementById('packsTotal').textContent = packsOpenedCount; }
    if (saved.base) saved.base.forEach(function (n) { const c = base.find(function (x) { return x.n === parseInt(n); }); if (c) fillSlot(c, false, true); });
    if (saved.holos) saved.holos.forEach(function (n) { const c = holos.find(function (x) { return x.n === parseInt(n); }); if (c) fillSlot(c, true, true); });
}
function fillSlot(card, isHolo, silent) {

    const id = isHolo ? 'col-holo-' + card.n : 'col-base-' + card.n;

    const slot = document.getElementById(id);

    if (!slot || slot.classList.contains('filled')) return;

    const frontSrc = isHolo ? IMG_DIR + 'holo_front_' + card.n + '.jpg' : imgPath(card.n, 'front');
    const backSrc = isHolo ? IMG_DIR + 'holo_back_' + card.n + '.jpg' : imgPath(card.n, 'back');
    slot.innerHTML = '';

    const img = document.createElement('img'); img.src = frontSrc; img.alt = card.name;
    img.onerror = function () { if (this.src !== frontSrc) this.src = frontSrc; };
    slot.appendChild(img); slot.classList.add('filled');

    if (!silent) slot.classList.add('filling');

    slot.addEventListener('animationend', function () { slot.classList.remove('filling'); });
    slot.addEventListener('click', function () { openLightbox(frontSrc, backSrc, card.name); });
    collectedCount++;

    document.getElementById('collectionCount').textContent = collectedCount + ' / ' + TOTAL_CARDS;
    if (!silent) saveState();
}
document.addEventListener('DOMContentLoaded', initCollection);

function resetPack() {

    const packEl = document.getElementById('pack'), wrapper = document.getElementById('packWrapper');
    const btn = document.getElementById('openBtn'), labelEl = document.getElementById('packLabel');
    packEl.classList.remove('pack-tearing');

    packEl.style.animation = 'none'; 
    packEl.offsetHeight; 
    packEl.style.animation = '';
    wrapper.classList.remove('opened'); 
    wrapper.style.opacity = '1'; 
    wrapper.style.pointerEvents = 'auto';
    btn.disabled = false; 
    btn.textContent = 'Open Another Pack'; 
    labelEl.textContent = ''; 
    opening = false;
}
function openPack() {
    if (opening) return; opening = true;
    const packEl = document.getElementById('pack'), btn = document.getElementById('openBtn');
    const labelEl = document.getElementById('packLabel'), wrapper = document.getElementById('packWrapper');
    const divider = document.getElementById('divider');
    btn.disabled = true; labelEl.textContent = '';
    packEl.classList.add('pack-tearing');
    packsOpenedCount++; sessionPacksCount++;
    document.getElementById('packsTotal').textContent = packsOpenedCount;
    document.getElementById('packsSession').textContent = sessionPacksCount;
    saveState();
    setTimeout(function () {
        wrapper.classList.add('opened'); wrapper.style.opacity = '0.35';
        divider.classList.add('visible');
        const pulled = drawPack(); let delay = 0; const step = 120;
        const baseSlots = document.getElementById('slots-base'); baseSlots.innerHTML = '';
        pulled.base.forEach(function (card) {
            const { slot, cardEl } = makeCard(card, false, delay); baseSlots.appendChild(slot);
            setTimeout(function () { cardEl.classList.add('revealed'); fillSlot(card, false); }, delay + 20);
            delay += step;
        });
        const holoRow = document.getElementById('holoRow'), holoSlots = document.getElementById('slots-holo');
        holoSlots.innerHTML = '';
        if (pulled.holo.length > 0) {
            holoRow.classList.add('visible');
            const { slot, cardEl } = makeCard(pulled.holo[0], true, delay); holoSlots.appendChild(slot);
            setTimeout(function () { cardEl.classList.add('revealed'); fillSlot(pulled.holo[0], true); }, delay + 20);
            delay += step;
        } else { holoRow.classList.remove('visible'); }
        setTimeout(resetPack, delay + 400);
        setTimeout(function () { divider.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 300);
    }, 460);
}

document.addEventListener('DOMContentLoaded', function () {

    const wrapper = document.getElementById('packWrapper');

    if (!wrapper) return;

    const MIN_DRAG = 60; let dragging = false, lastX = 0, lastY = 0, cumDist = 0, canvas, ctx, points = [];

    function initCanvas() {
        const pack = document.getElementById('pack'); pack.style.position = 'relative';
        canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border-radius:6px;pointer-events:none;z-index:10;';
        canvas.width = pack.offsetWidth || 150; canvas.height = pack.offsetHeight || 224;

        pack.appendChild(canvas); ctx = canvas.getContext('2d');
    }
    function getPos(e) {
        const rect = canvas.getBoundingClientRect(), src = e.touches ? e.touches[0] : e; return {
            x: (src.clientX -
                rect.left) * (canvas.width / rect.width), y: (src.clientY - rect.top) * (canvas.height / rect.height)
        };
    }
    function drawLine() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); if (points.length < 2) return;
        ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.92)'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(255,200,0,0.9)'; ctx.shadowBlur = 14;
        ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke(); ctx.restore();
    }
    wrapper.addEventListener('pointerdown', function (e) {
        if (opening) return; if (!canvas) initCanvas();
        dragging = true; points = []; cumDist = 0; ctx.clearRect(0, 0, canvas.width, canvas.height);
        const pos = getPos(e); lastX = pos.x; lastY = pos.y; points.push(pos);
        wrapper.setPointerCapture(e.pointerId); e.preventDefault();
    });
    wrapper.addEventListener('pointermove', function (e) {
        if (!dragging) return; const pos = getPos(e);
        cumDist += Math.sqrt(Math.pow(pos.x - lastX, 2) + Math.pow(pos.y - lastY, 2));
        lastX = pos.x; lastY = pos.y; points.push(pos); drawLine(); e.preventDefault();
    });
    wrapper.addEventListener('pointerup', function () {
        if (!dragging) return; dragging = false; ctx.clearRect(0, 0, canvas.width, canvas.height); if
            (cumDist >= MIN_DRAG) openPack();
    });
    wrapper.addEventListener('pointercancel', function () { dragging = false; if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height); });

});

function openLightbox(frontSrc, backSrc, name) {
    const lf = document.getElementById('lightbox-front'), lb = document.getElementById('lightbox-back');
    lf.src = frontSrc; lf.alt = name; lb.src = backSrc; lb.alt = name + ' back';
    lb.onerror = function () { this.src = frontSrc; };
    document.getElementById('lightbox').classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow = '';
}
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
