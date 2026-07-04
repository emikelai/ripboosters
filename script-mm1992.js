//--- CARD DATA
const base = [

    { n: 1, name: "Blob" }, { n: 2, name: "Blaze" }, { n: 3, name: "Black Widow" }, { n: 4, name: "Black Panther" },
    { n: 5, name: "Black Cat" }, { n: 6, name: "Bishop" }, { n: 7, name: "Beast" }, { n: 8, name: "Archangel" },
    { n: 9, name: "Apocalypse" }, { n: 10, name: "Adam Warlock" }, { n: 11, name: "Darkhawk" }, { n: 12, name: "Daredevil" },
    { n: 13, name: "Cyclops" }, { n: 14, name: "Colossus" }, { n: 15, name: "Captain Britain" }, { n: 16, name: "Captain America" },
    { n: 17, name: "Cage" }, { n: 18, name: "Cable" }, { n: 19, name: "Bullseye" }, { n: 20, name: "Dazzler" },
    { n: 21, name: "Enchantress" }, { n: 22, name: "Elektra" }, { n: 23, name: "Electro" }, { n: 24, name: "Dr. Strange" },
    { n: 25, name: "Dr. Octopus" }, { n: 26, name: "Dr. Doom" }, { n: 27, name: "Dormammu" }, { n: 28, name: "Deathlok" },
    { n: 29, name: "Gambit" }, { n: 30, name: "Galactus" }, { n: 31, name: "Human Torch" }, { n: 32, name: "Hulk" },
    { n: 33, name: "Hobgoblin" }, { n: 34, name: "Hawkeye" }, { n: 35, name: "Havok" }, { n: 36, name: "Green Goblin" },
    { n: 37, name: "Ghost Rider" }, { n: 38, name: "Iron Man" }, { n: 39, name: "Invisible Woman" }, { n: 40, name: "Iceman" },
    { n: 41, name: "Lizard" }, { n: 42, name: "Leader" }, { n: 43, name: "Kingpin" }, { n: 44, name: "Kang" },
    { n: 45, name: "Juggernaut" }, { n: 46, name: "Jean Grey" }, { n: 47, name: "Mandarin" }, { n: 48, name: "MajorVictory" },
    { n: 49, name: "Magneto" }, { n: 50, name: "Loki" }, { n: 51, name: "Moon Knight" }, { n: 52, name: "Mole Man" },
    { n: 53, name: "Mojo" }, { n: 54, name: "Mephisto" }, { n: 55, name: "Meggan" }, { n: 56, name: "Namorita" },
    { n: 57, name: "Namor" }, { n: 58, name: "Mr. Sinister" }, { n: 59, name: "Mr. Fantastic" }, { n: 60, name: "Morbius" },
    { n: 61, name: "Nightmare" }, { n: 62, name: "Nightcrawler" }, { n: 63, name: "NightThrasher" }, { n: 64, name: "Nick Fury" },
    { n: 65, name: "Psylocke" }, { n: 66, name: "Professor X" }, { n: 67, name: "Phoenix" }, { n: 68, name: "Nova" },
    { n: 69, name: "Northstar" }, { n: 70, name: "Nomad" }, { n: 71, name: "Quicksilver" }, { n: 72, name: "Quasar" },
    { n: 73, name: "Punisher" }, { n: 74, name: "Shatterstar" }, { n: 75, name: "Shadowcat" }, { n: 76, name: "Sauron" },
    { n: 77, name: "Sandman" }, { n: 78, name: "Sabretooth" }, { n: 79, name: "Rogue" }, { n: 80, name: "Red Skull" },
    { n: 81, name: "Silver Sable" }, { n: 82, name: "She-Hulk" }, { n: 83, name: "Thanos" }, { n: 84, name: "Super Skrull" },
    { n: 85, name: "Strong Guy" }, { n: 86, name: "Storm" }, { n: 87, name: "Spider-Man" }, { n: 88, name: "Speedball" },
    { n: 89, name: "Sleepwalker" }, { n: 90, name: "Silver Surfer" }, { n: 91, name: "Thing" }, { n: 92, name: "Thor" },
    { n: 93, name: "Wonder Man" }, { n: 94, name: "Wolverine" }, { n: 95, name: "White Queen" }, { n: 96, name: "Weapon Omega" },
    { n: 97, name: "Venom" }, { n: 98, name: "Ultron" }, { n: 99, name: "Tombstone" }, { n: 100, name: "Checklist" }

];

const spectra = [
    { id: '1D', n: 1, name: "Thing vs. Hulk" },
    { id: '2D', n: 2, name: "Silver Surfer vs. Thanos" },
    { id: '3D', n: 3, name: "Wolverine vs. Sabretooth" },
    { id: '4D', n: 4, name: "Spider-Man vs. Venom" },
    { id: '5D', n: 5, name: "Captain America vs. Red Skull" },
];

function imgPath(n, side) {
    return 'card_images/marvel_masterpieces_1992/' + side + '_' + String(n).padStart(3, '0') + '.jpg';

}
// PACK DRAW
function drawPack() {
    const shuffled = [...base].sort(() => Math.random() - .5);
    const spectraHit = Math.random() < (1 / 12);
    return {
        base: shuffled.slice(0, spectraHit ? 5 : 6),
        spectra: spectraHit ? [spectra[Math.floor(Math.random() * spectra.length)]] : []
    };
}

// BUILD CARD ELEMENT
function makeCard(card, isSpectra, delay) {
    const slot = document.createElement('div');
    slot.className = 'card-slot' + (isSpectra ? ' spectra' : '');
    const frontSrc = isSpectra ? 'card_images/marvel_masterpieces_1992/spectra_front_' + card.n + '.jpg'
        : imgPath(card.n, 'front');
    const backSrc = isSpectra ? 'card_images/marvel_masterpieces_1992/spectra_back_' + card.n + '.jpg'
        : imgPath(card.n, 'back');

    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.style.animationDelay = delay + 'ms';

    const img = document.createElement('img');
    img.src = frontSrc;
    img.alt = card.name;
    img.loading = 'lazy';
    cardEl.appendChild(img);

    cardEl.addEventListener('click', function () {
        openLightbox(frontSrc, backSrc, card.name);
    });

    const hint = document.createElement('div');
    hint.className = 'flip-hint';
    hint.textContent = 'click to view';

    slot.appendChild(cardEl);
    slot.appendChild(hint);
    return { slot, cardEl };
}

//  OPEN / RESET PACK
let opening = false;
packsOpenedCount = 0;
sessionPacksCount = 0;
collectedCount = 0;

//LOCALSTORAGE
const STORE_KEY = 'mm1992';

function saveState() {
    const cb = [];
    const cs = [];
    document.querySelectorAll('.col-slot.filled').forEach(function (slot) {
        slot.classList.contains('spectra-slot') ? cs.push(slot.id.replace('col-spectra-', '')) : cb.push(slot.id.replace('col-base-', ''));
    });
    localStorage.setItem(STORE_KEY, JSON.stringify({ base: cb, spectra: cs, packs: packsOpenedCount }));
}
function loadState() {
    try {
        return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    } catch (e) { return {}; }
}

//COLLECTION GRID INIT
function initCollection() {
    const grid = document.getElementById('collectionGrid');
    const sgrid = document.getElementById('spectraGrid');

    base.forEach(function (card) {
        const slot = document.createElement('div');
        slot.className = 'col-slot';
        slot.id = 'col-base-' + card.n;
        slot.innerHTML = '<span class="col-num">#' + String(card.n).padStart(3, '0') + '</span>' +
            '<span class="col-name">' + card.name + '</span>';
        grid.appendChild(slot);
    });

    spectra.forEach(function (card) {
        const slot = document.createElement('div');
        slot.className = 'col-slot spectra-slot'; slot.id = 'col-spectra-' + card.n;
        slot.innerHTML = '<span class="col-num">' + card.id + '</span>' +
            '<span class="col-name">' + card.name + '</span>';
        sgrid.appendChild(slot);
    });

    //RESTORE SAVED STATE
    const saved = loadState();
    if (saved.packs) {
        packsOpenedCount = saved.packs;
        document.getElementById('packsTotal').textContent = packsOpenedCount;
    }
    if (saved.base) saved.base.forEach(function (n) {
        const c = base.find(function (x) { return x.n === parseInt(n); }); if (c) fillSlot(c, false, true);
    });
    if (saved.spectra) saved.spectra.forEach(function (n) {
        const c = spectra.find(function (x) { return x.n === parseInt(n); }); if (c) fillSlot(c, true, true);
    });
}

function fillSlot(card, isSpectra, silent) {
    const id = isSpectra ? 'col-spectra-' + card.n : 'col-base-' + card.n;
    const slot = document.getElementById(id);
    if (!slot || slot.classList.contains('filled')) return;
    const frontSrc = isSpectra ? 'card_images/marvel_masterpieces_1992/spectra_front_' + card.n + '.jpg' : imgPath(card.n, 'front');
    const backSrc = isSpectra ? 'card_images/marvel_masterpieces_1992/spectra_back_' + card.n + '.jpg' : imgPath(card.n, 'back');

    slot.innerHTML = '';
    const img = document.createElement('img');
    img.src = frontSrc;
    img.alt = card.name;
    slot.appendChild(img);
    slot.classList.add('filled');
    if (!silent) slot.classList.add('filling');
    slot.addEventListener('animationend', function () { slot.classList.remove('filling'); });
    slot.addEventListener('click', function () { openLightbox(frontSrc, backSrc, card.name); });

    collectedCount++;
    document.getElementById('collectionCount').textContent = collectedCount + '/105';
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
    if (opening) return;
    opening = true;

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

        const pulled = drawPack();
        let delay = 0;
        const step = 120;

        const baseSlots = document.getElementById('slots-base');
        baseSlots.innerHTML = '';
        pulled.base.forEach(function (card) {
            const { slot, cardEl } = makeCard(card, false, delay);
            baseSlots.appendChild(slot);
            setTimeout(function () {
                cardEl.classList.add('revealed');
                fillSlot(card, false);
            }, delay + 20);
            delay += step;
        });

        const spectraRow = document.getElementById('spectraRow')
        const spectraSlots = document.getElementById('slots-spectra');
        spectraSlots.innerHTML = '';
        if (pulled.spectra.length > 0) {
            spectraRow.classList.add('visible');
            const { slot, cardEl } = makeCard(pulled.spectra[0], true, delay);
            spectraSlots.appendChild(slot);
            setTimeout(function () { cardEl.classList.add('revealed'); fillSlot(pulled.spectra[0], true); }, delay + 20);
            delay += step;
        } else {
            spectraRow.classList.remove('visible');
        }

        setTimeout(resetPack, delay + 400);
        setTimeout(function () {
            divider.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }, 460);
}

// Drag-to-open
(function () {

    const wrapper = document.getElementById('packWrapper');
    const MIN_DRAG = 60;
    let dragging = false, lastX = 0, lastY = 0, cumDist = 0;
    let canvas, ctx, points = [];

    function initCanvas() {
        const pack = document.getElementById('pack'); pack.style.position = 'relative';
        canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border-radius:6px;pointer-events:none;z-index:10;';
        canvas.width = pack.offsetWidth || 150;
        canvas.height = pack.offsetHeight || 224;
        pack.appendChild(canvas);
        ctx = canvas.getContext('2d');

    }

    function getPos(e) {
        const rect = canvas.getBoundingClientRect()
        const src = e.touches ? e.touches[0] : e;
        return {
            x: (src.clientX - rect.left) * (canvas.width / rect.width),
            y: (src.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    function drawLine() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (points.length < 2) return;
        ctx.save(); 
        ctx.strokeStyle = 'rgba(255,255,255,0.92)'; 
        ctx.lineWidth = 3;
        ctx.lineCap = 'round'; 
        ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(232,208,138,0.9)';
        ctx.shadowBlur = 14;
        ctx.beginPath(); 
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke(); 
        ctx.restore();
    }

    wrapper.addEventListener('pointerdown', function (e) {
        if (opening) return;
        if (!canvas) initCanvas();
        dragging = true;
        points = []; 
        cumDist = 0; 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const pos = getPos(e);
        lastX = pos.x; lastY = pos.y;
        points.push(pos);
        wrapper.setPointerCapture(e.pointerId);
        e.preventDefault();

    });

    wrapper.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        const pos = getPos(e);
        cumDist += Math.sqrt(Math.pow(pos.x - lastX, 2) + Math.pow(pos.y - lastY, 2));
        lastX = pos.x; lastY = pos.y;
        points.push(pos); 
        drawLine(); 
        e.preventDefault();

    });

    wrapper.addEventListener('pointerup', function () {
        if (!dragging) return;
        dragging = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (cumDist >= MIN_DRAG) openPack();

    });

    wrapper.addEventListener('pointercancel', function () { dragging = false; if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height); });

})();

//LIGHTBOX
function openLightbox(frontSrc, backSrc, name) {
    document.getElementById('lightbox-front').src = frontSrc;
    document.getElementById('lightbox-front').alt = name;
    document.getElementById('lightbox-back').src = backSrc;
    document.getElementById('lightbox-back').alt = name + ' back';
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();

});
