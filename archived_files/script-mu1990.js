//-199O IMPEL MARVEL UNIVERSE
const IMG_DIR = 'card_images/marvel_impel_1990/';

function imgPath(n, side) { return IMG_DIR + side + '_' + String(n).padStart(3, '0') + '.jpg'; }

const allCards = [

    { n: 1, name: "Captain America" }, { n: 2, name: "Spider-Man" }, { n: 3, name: "Hulk" },
    { n: 4, name: "Daredevil" }, { n: 5, name: "Nick Fury" }, { n: 6, name: "Thing" },
    { n: 7, name: "Professor X" }, { n: 8, name: "Cyclops" }, { n: 9, name: "Marvel Girl" },
    { n: 10, name: "Wolverine" }, { n: 11, name: "Phoenix" }, { n: 12, name: "Power Man" },
    { n: 13, name: "Dazzler" }, { n: 14, name: "Dagger" }, { n: 15, name: "Quasar" },
    { n: 16, name: "Sub-Mariner" }, { n: 17, name: "Hulk" }, { n: 18, name: "Thor" },
    { n: 19, name: "Mister Fantastic" }, { n: 20, name: "Black Panther" },
    { n: 21, name: "Archangel" }, { n: 22, name: "Iceman" }, { n: 23, name: "Wolverine" },
    { n: 24, name: "Storm" }, { n: 25, name: "Shadowcat" }, { n: 26, name: "Moon Knight" },
    { n: 27, name: "Lockheed" }, { n: 28, name: "Aunt May" }, { n: 29, name: "Spider-Man" },
    { n: 30, name: "Spider-Man" }, { n: 31, name: "Captain America" }, { n: 32, name: "Silver Surfer" },
    { n: 33, name: "Human Torch" }, { n: 34, name: "Doctor Strange" }, { n: 35, name: "Havok" },
    { n: 36, name: "Colossus" }, { n: 37, name: "Wolverine" }, { n: 38, name: "Nightcrawler" },
    { n: 39, name: "She-Hulk" }, { n: 40, name: "Captain Britain" }, { n: 41, name: "Rogue" },
    { n: 42, name: "Iron Man" }, { n: 43, name: "Invisible Woman" }, { n: 44, name: "Punisher" },
    { n: 45, name: "Longshot" }, { n: 46, name: "Beast" }, { n: 47, name: "Punisher" },
    { n: 48, name: "Storm" }, { n: 49, name: "Elektra" }, { n: 50, name: "Cloak" },
    { n: 51, name: "Wasp" }, { n: 52, name: "Kingpin" }, { n: 53, name: "Baron Zemo" },
    { n: 54, name: "Loki" }, { n: 55, name: "Juggernaut" }, { n: 56, name: "Nightmare" },
    { n: 57, name: "Sabretooth" }, { n: 58, name: "Electro" }, { n: 59, name: "Doctor Octopus" },
    { n: 60, name: "Doctor Doom" }, { n: 61, name: "Ultron" }, { n: 62, name: "Enchantress" },
    { n: 63, name: "Magneto" }, { n: 64, name: "Bullseye" }, { n: 65, name: "Mister Sinister" },
    { n: 66, name: "Sandman" }, { n: 67, name: "Lizard" }, { n: 68, name: "Mole Man" },
    { n: 69, name: "Dormammu" }, { n: 70, name: "Leader" }, { n: 71, name: "Blob" },
    { n: 72, name: "Black Cat" }, { n: 73, name: "Venom" }, { n: 74, name: "Green Goblin" },
    { n: 75, name: "Galactus" }, { n: 76, name: "Mandarin" }, { n: 77, name: "High Evolutionary" },
    { n: 78, name: "Mephisto" }, { n: 79, name: "Thanos" }, { n: 80, name: "Apocalypse" },
    { n: 81, name: "Red Skull" }, { n: 82, name: "Ghost Rider" }, { n: 83, name: "Deathlok" },
    { n: 84, name: "Guardians of the Galaxy" }, { n: 85, name: "New Warriors" },
    { n: 86, name: "Nomad" }, { n: 87, name: "Foolkiller" },
    { n: 88, name: "Thing vs. Hulk" }, { n: 89, name: "Fantastic Fourvs. Galactus" },
    { n: 90, name: "Fantastic Four vs. Doctor Doom" }, { n: 91, name: "Thor vs. Surtur" },
    { n: 92, name: "Spider-Man vs. Kraven" }, { n: 93, name: "Spider-Man vs. Dr. Octopus" },
    { n: 94, name: "Daredevil vs. Bullseye" }, { n: 95, name: "Daredevil vs. Kingpin" },
    { n: 96, name: "Silver Surfer vs. Mephisto" }, { n: 97, name: "Captain America vs. Red Skull" },
    { n: 98, name: "Dark Phoenix Saga" }, { n: 99, name: "X-Men vs. Avengers" },
    { n: 100, name: "X-Men vs. Magneto" }, { n: 101, name: "X-Men vs. Fantastic Four" },
    { n: 102, name: "Fall of the Mutants" }, { n: 103, name: "Evolutionary War" },
    { n: 104, name: "Atlantis Attacks" }, { n: 105, name: "Acts of Vengeance" },
    { n: 106, name: "Spider-Man vs. Venom" }, { n: 107, name: "Nick Fury vs. Hydra" },
    { n: 108, name: "Armor Wars I" }, { n: 109, name: "Daredevil vs. Wolverine" },
    { n: 110, name: "Daredevilvs. Punisher" }, { n: 111, name: "Spider-Man vs. Green Goblin" },
    { n: 112, name: "Spider-Man vs. Hobgoblin" }, { n: 113, name: "Hulk vs. Wolverine" },
    { n: 114, name: "Hulk vs. Spider-Man" }, { n: 115, name: "Captain America vs. Wolverine" },
    { n: 116, name: "Silver Surfer vs. Thanos" }, { n: 117, name: "X-Factor vs. Apocalypse" },
    { n: 118, name: "X-Men vs. Freedom Force" }, { n: 119, name: "Wolverine vs. Sabretooth" },
    { n: 120, name: "X-Men in the Savage Land" }, { n: 121, name: "Iron Man vs. Titanium Man" },
    { n: 122, name: "Thor vs. Loki" }, { n: 123, name: "First Kree-Skrull War" },
    { n: 124, name: "Fantastic Four #1 " }, { n: 125, name: "X-Men #1" },
    { n: 126, name: "Amazing Fantasy #15" }, { n: 127, name: "The Punisher Vol. 2 #1 " },
    { n: 128, name: "Journey into Mystery #83" }, { n: 129, name: "Amazing Spider-Man #129" },
    { n: 130, name: "Avengers #1" }, { n: 131, name: "Amazing Spider-Man #1" },
    { n: 132, name: "Giant-Size X-Men #1 " }, { n: 133, name: "Wolverine Limited Series #1" },
    { n: 134, name: "Incredible Hulk #181 " }, { n: 135, name: "Tales of Suspense #39" },
    { n: 136, name: "Avengers #4" }, { n: 137, name: "Fantastic Four" },
    { n: 138, name: "Avengers" }, { n: 139, name: "X-Men" }, { n: 140, name: "X-Men" },
    { n: 141, name: "Cloak and Dagger" }, { n: 142, name: "New Mutants" },
    { n: 143, name: "X-Factor" }, { n: 144, name: "Excalibur" },
    { n: 145, name: "Brotherhood of Evil Mutants" }, { n: 146, name: "Sinister Six" },
    { n: 147, name: "Hellfire Club" }, { n: 148, name: "Alpha Flight" },
    { n: 149, name: "Spider-Man" }, { n: 150, name: "Doctor Doom" },
    { n: 151, name: "Doctor Octopus" }, { n: 152, name: "The Hulk" },
    { n: 153, name: "Silver Surfer" }, { n: 154, name: "Thor" },
    { n: 155, name: "Punisher" }, { n: 156, name: "Magneto" },
    { n: 157, name: "Captain America" }, { n: 158, name: "Doctor Strange" },
    { n: 159, name: "Iron Man" }, { n: 160, name: "Wolverine" },
    { n: 161, name: "Stan Lee" }, { n: 162, name: "Checklist" }
];
const base = allCards.slice();

const holos = [
    { id: 'MH1', n: 1, name: "Cosmic Spider-Man" }, { id: 'MH2', n: 2, name: "Magneto" },
    { id: 'MH3', n: 3, name: "Silver Surfer" }, { id: 'MH4', n: 4, name: "Wolverine" },
    { id: 'MH5', n: 5, name: "Spider-Man vs. Green Goblin" },
];

function drawPack() {
    const shuffled = [...base].sort(() => Math.random() - .5);
    const holoHit = Math.random() < (1 / 36);
    return {
        base: shuffled.slice(0, holoHit ? 11 : 12),
        holo: holoHit ? [holos[Math.floor(Math.random() * holos.length)]] : []
    };
}

function makeCard(card, isHolo, delay) {
    const slot = document.createElement('div');
    slot.className = 'card-slot' + (isHolo ? ' holo' : '');

    const frontSrc = isHolo
        ? IMG_DIR + 'mh' + card.n + '_hologram_front.png'
        : imgPath(card.n, 'front');
    const backSrc = isHolo
        ? IMG_DIR + 'mh_hologram_back.png'
        : imgPath(card.n, 'back');

    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.style.animationDelay = delay + 'ms';

    const img = document.createElement('img');
    img.src = frontSrc;
    img.alt = card.name;
    img.loading = 'lazy';

    img.onerror = function () { if (this.src !== frontSrc) this.src = frontSrc; };
    cardEl.appendChild(img);

    cardEl.addEventListener('click', function () { openLightbox(frontSrc, backSrc, card.name); });

    const hint = document.createElement('div');
    hint.className = 'flip-hint'; hint.textContent = 'click to view';

    slot.appendChild(cardEl);
    slot.appendChild(hint);

    return { slot, cardEl };
}

let opening = false, packsOpenedCount = 0, sessionPacksCount = 0, collectedCount = 0;
const STORE_KEY = 'mu1990';
const TOTAL_CARDS = 167;

function saveState() {
    const cb = [], ch = [];
    document.querySelectorAll('.col-slot.filled').forEach(function (s) {
        s.classList.contains('holo-slot') ? ch.push(s.id.replace('col-holo-', '')) : cb.push(s.id.replace('col-base-', ''));
    });
    localStorage.setItem(STORE_KEY, JSON.stringify({ base: cb, holos: ch, packs: packsOpenedCount }));
}
function loadState() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }

function initCollection() {
    const grid = document.getElementById('collectionGrid'), hgrid = document.getElementById('holoGrid');
    allCards.forEach(function (card) {
        const slot = document.createElement('div');
        slot.className = 'col-slot'; slot.id = 'col-base-' + card.n;
        slot.innerHTML = '<span class="col-num">#' + String(card.n).padStart(3, '0') + '</span><span class="col-name">' + card.name + '</span>';
        grid.appendChild(slot);
    });
    holos.forEach(function (h) {
        const slot = document.createElement('div');
        slot.className = 'col-slot holo-slot'; slot.id = 'col-holo-' + h.n;
        slot.innerHTML = '<span class="col-num">' + h.id + '</span><span class="col-name">' + h.name + '</span>';
        hgrid.appendChild(slot);
    });
    const saved = loadState();
    if (saved.packs) { packsOpenedCount = saved.packs; document.getElementById('packsTotal').textContent = packsOpenedCount; }
    if (saved.base) saved.base.forEach(function (n) { const c = allCards.find(function (x) { return x.n === parseInt(n); }); if (c) fillSlot(c, false, true); });
    if (saved.holos) saved.holos.forEach(function (n) { const h = holos.find(function (x) { return x.n === parseInt(n); }); if (h) fillSlot(h, true, true); });
    updateCount();
}
function fillSlot(card, isHolo, silent) {

    const id = isHolo ? 'col-holo-' + card.n : 'col-base-' + card.n;

    const slot = document.getElementById(id);

    if (!slot || slot.classList.contains('filled')) return;

    const frontSrc = isHolo
        ? IMG_DIR + 'mh' + card.n + '_hologram_front.png'
        : imgPath(card.n, 'front');
    const backSrc = isHolo
        ? IMG_DIR + 'mh_hologram_back.png'
        : imgPath(card.n, 'back');
    slot.innerHTML = '';

    const img = document.createElement('img'); img.src = frontSrc; img.alt = card.name;
    img.onerror = function () { if (this.src !== frontSrc) this.src = frontSrc; };
    slot.appendChild(img); slot.classList.add('filled');

    if (!silent) slot.classList.add('filling');

    slot.addEventListener('animationend', function () { slot.classList.remove('filling'); });
    slot.addEventListener('click', function () { openLightbox(frontSrc, backSrc, card.name); });

    collectedCount++; updateCount(); if (!silent) saveState();
}

function updateCount() { document.getElementById('collectionCount').textContent = collectedCount + ' /' + TOTAL_CARDS; }
document.addEventListener('DOMContentLoaded', initCollection);

function resetPack() {

    const packEl = document.getElementById('pack'), wrapper = document.getElementById('packWrapper');
    const btn = document.getElementById('openBtn'), labelEl = document.getElementById('packLabel');
    packEl.classList.remove('pack-tearing');

    packEl.style.animation = 'none'; packEl.offsetHeight; packEl.style.animation = '';
    wrapper.classList.remove('opened'); wrapper.style.opacity = '1'; wrapper.style.pointerEvents = 'auto';
    btn.disabled = false; btn.textContent = 'Open Another Pack'; labelEl.textContent = ''; opening = false;
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

        const pulled = drawPack(); let delay = 0; const step = 100;
        const baseSlots = document.getElementById('slots-base');
        baseSlots.innerHTML = '';

        pulled.base.forEach(function (card) {
            const { slot, cardEl } = makeCard(card, false, delay);
            baseSlots.appendChild(slot);
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
        // ctx.shadowColor = 'rgba(232,208,138,0.9)'; ctx.shadowBlur = 14;
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
        if (!dragging) return; dragging = false; ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (cumDist >= MIN_DRAG) openPack();
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
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

