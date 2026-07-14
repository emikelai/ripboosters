//- 1993 SKYBOX MARVEL MASTERPIECES
const IMG_DIR = 'card_images/marvel_masterpieces_1993/';

function imgPath(n, side) {
    return IMG_DIR + side + '_' + String(n).padStart(3, '0') + '.jpg';
}

const base = [
    { n: 1, name: "Hulk" }, { n: 2, name: "Human Torch" }, { n: 3, name: "Thor" },
    { n: 4, name: "Iron Man" }, { n: 5, name: "Spider-Man" }, { n: 6, name: "Wolverine" },
    { n: 7, name: "Cyclops" }, { n: 8, name: "Doctor Strange" }, { n: 9, name: "Namor" },
    { n: 10, name: "Storm" }, { n: 11, name: "SilverSurfer" }, { n: 12, name: "Vision" },
    { n: 13, name: "Ghost Rider" }, { n: 14, name: "Thing" }, { n: 15, name: "Captain America" },
    { n: 16, name: "Archangel" }, { n: 17, name: "Beast" }, { n: 18, name: "Cable" },
    { n: 19, name: "Carnage" }, { n: 20, name: "Hulk 2099" }, { n: 21, name: "Doctor Doom" },
    { n: 22, name: "Daredevil" }, { n: 23, name: "Iron Fist" }, { n: 24, name: "Psylocke" },
    { n: 25, name: "Morbius" }, { n: 26, name: "Punisher" }, { n: 27, name: "Rogue" },
    { n: 28, name: "Sabretooth" }, { n: 29, name: "Forge" }, { n: 30, name: "She-Hulk" },
    { n: 31, name: "Gambit" }, { n: 32, name: "U.S. Agent" }, { n: 33, name: "Spider-Woman" },
    { n: 34, name: "Stryfe" }, { n: 35, name: "Thanos" }, { n: 36, name: "Blade" },
    { n: 37, name: "Adam Warlock" }, { n: 38, name: "Colossus" }, { n: 39, name: "Magneto" },
    { n: 40, name: "Vulture" }, { n: 41, name: "Spider-Man 2099" }, { n: 42, name: "Punisher 2099" },
    { n: 43, name: "Doom 2099" }, { n: 44, name: "Ravage 2099" }, { n: 45, name: "Venom" },
    { n: 46, name: "Domino" }, { n: 47, name: "Annihilus" }, { n: 48, name: "Rhino" },
    { n: 49, name: "Puma" }, { n: 50, name: "Cannonball" }, { n: 51, name: "Polaris" },
    { n: 52, name: "Longshot" }, { n: 53, name: "Cyber" }, { n: 54, name: "Omega Red" },
    { n: 55, name: "Deadpool" }, { n: 56, name: "Kingpin" }, { n: 57, name: "Bishop" },
    { n: 58, name: "Absorbing Man" }, { n: 59, name: "Darkhawk" }, { n: 60, name: "Mystique" },
    { n: 61, name: "Abomination" }, { n: 62, name: "Wasp" }, { n: 63, name: "Scorpion" },
    { n: 64, name: "Captain Britain" }, { n: 65, name: "Black Knight" }, { n: 66, name: "Sasquatch" },
    { n: 67, name: "Black Widow" }, { n: 68, name: "Typhoid Mary" }, { n: 69, name: "War Machine" },
    { n: 70, name: "Hawkeye" }, { n: 71, name: "Deathlok" }, { n: 72, name: "Nightcrawler" },
    { n: 73, name: "Thunderstrike" }, { n: 74, name: "Vengeance" }, { n: 75, name: "Jean Grey" },
    { n: 76, name: "Shatterstar" }, { n: 77, name: "Beta Ray Bill" }, { n: 78, name: "Night Thrasher" },
    { n: 79, name: "Red Skull" }, { n: 80, name: "Lilith" }, { n: 81, name: "Falcon" },
    { n: 82, name: "Hercules" }, { n: 83, name: "Nova" }, { n: 84, name: "Havok" },
    { n: 85, name: "Phoenix" }, { n: 86, name: "Crystal" }, { n: 87, name: "Drax" },
    { n: 88, name: "Terrax" }, { n: 89, name: "Vulture 2099" }, { n: 90, name: "Checklist" }
];

const dynaEtch = [
    { n: 1, id: 'S1', name: "Meanstreak" }, { n: 2, id: 'S2', name: "Cerebra" },
    { n: 3, id: 'S3', name: "Krystalin" }, { n: 4, id: 'S4', name: "Metalhead" },
    { n: 5, id: 'S5', name: "Serpentina" }, { n: 6, id: 'S6', name: "Bloodhawk" },
    { n: 7, id: 'S7', name: "Skullfire" }, { n: 8, id: 'S8', name: "Xi'an" },
];

function drawPack() {
    const shuffled = [...base].sort(() => Math.random() - .5);
    const dynaHit = Math.random() < (1 / 9);
    return {
        base: shuffled.slice(0, dynaHit ? 5 : 6),
        dynaEtch: dynaHit ? [dynaEtch[Math.floor(Math.random() * dynaEtch.length)]] : []
    };
}

function makeCard(card, isDyna, delay) {
    const slot = document.createElement('div');
    slot.className = 'card-slot' + (isDyna ? ' dyna' : '');

    const frontSrc = isDyna
        ? IMG_DIR + 'dynaetch_front_' + card.n + '.jpg' : imgPath(card.n, 'front');
    const backSrc = isDyna
        ? IMG_DIR + 'dynaetch_back_' + card.n + '.jpg' : imgPath(card.n, 'back');
    const cardEl = document.createElement('div');

    cardEl.className = 'card'; cardEl.style.animationDelay = delay + 'ms';

    const img = document.createElement('img');

    img.src = frontSrc; img.alt = card.name; img.loading = 'lazy';

    img.onerror = function () { if (this.src !== frontSrc) this.src = frontSrc; };
    cardEl.appendChild(img);

    cardEl.addEventListener('click', function () { openLightbox(frontSrc, backSrc, card.name); });
    const hint = document.createElement('div');

    hint.className = 'flip-hint'; hint.textContent = 'click to view';

    slot.appendChild(cardEl); slot.appendChild(hint);

    return { slot, cardEl };
}
let opening = false, packsOpenedCount = 0, sessionPacksCount = 0, collectedCount = 0;
const STORE_KEY = 'mm1993', TOTAL_CARDS = 98;

function saveState() {
    const cb = [], cd = [];
    document.querySelectorAll('.col-slot.filled').forEach(function (s) {
        s.classList.contains('dyna-slot') ? cd.push(s.id.replace('col-dyna-', '')) : cb.push(s.id.replace('col-base-', ''));
    });
    localStorage.setItem(STORE_KEY, JSON.stringify({ base: cb, dyna: cd, packs: packsOpenedCount }));

}
function loadState() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }

function initCollection() {
    const grid = document.getElementById('collectionGrid'), dgrid = document.getElementById('dynaGrid');
    base.forEach(function (card) {
        const slot = document.createElement('div');
        slot.className = 'col-slot'; slot.id = 'col-base-' + card.n;

        slot.innerHTML = '<span class="col-num">#' + String(card.n).padStart(3, '0') + '</span><span class="col-name">' + card.name + '</span>';

        grid.appendChild(slot);

    });
    dynaEtch.forEach(function (card) {
        const slot = document.createElement('div');

        slot.className = 'col-slot dyna-slot'; slot.id = 'col-dyna-' + card.n;
        slot.innerHTML = '<span class="col-num">' + card.id + '</span><span class="col-name">' + card.name + '</span>';
        dgrid.appendChild(slot);

    });

    const saved = loadState();

    if (saved.packs) { packsOpenedCount = saved.packs; document.getElementById('packsTotal').textContent = packsOpenedCount; }

    if (saved.base) saved.base.forEach(function (n) {
        const c = base.find(function (x) { return x.n === parseInt(n); }); if (c) fillSlot(c, false, true);
    });

    if (saved.dyna) saved.dyna.forEach(function (n) { const c = dynaEtch.find(function (x) { return x.n === parseInt(n); }); if (c) fillSlot(c, true, true); });
}
function fillSlot(card, isDyna, silent) {

    const id = isDyna ? 'col-dyna-' + card.n : 'col-base-' + card.n;

    const slot = document.getElementById(id);

    if (!slot || slot.classList.contains('filled')) return;

    const frontSrc = isDyna ? IMG_DIR + 'dynaetch_front_' + card.n + '.jpg' : imgPath(card.n, 'front');
    const backSrc = isDyna ? IMG_DIR + 'dynaetch_back_' + card.n + '.jpg' : imgPath(card.n, 'back');
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
        const dynaRow = document.getElementById('dynaRow'), dynaSlots = document.getElementById('slots-dyna');
        dynaSlots.innerHTML = '';
        if (pulled.dynaEtch.length > 0) {
            dynaRow.classList.add('visible');
            const { slot, cardEl } = makeCard(pulled.dynaEtch[0], true, delay); dynaSlots.appendChild(slot);
            setTimeout(function () { cardEl.classList.add('revealed'); fillSlot(pulled.dynaEtch[0], true); }, delay + 20);
            delay += step;
        } else { dynaRow.classList.remove('visible'); }
        setTimeout(resetPack, delay + 400);
        setTimeout(function () { divider.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 300);
    }, 460);
}

//DRAG TO OPEN
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
        ctx.shadowColor = 'rgba(232,208,138,0.9)'; ctx.shadowBlur = 14;
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

    lb.onerror = function () {
        this.src = frontSrc;
    };

    document.getElementById('lightbox').classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });