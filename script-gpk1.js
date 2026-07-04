//- 1985 TOPPS GARBAGE PAIL KIDS SERIES 1
//41 pairs = 82 stickers. Backs shared per pair (back«NNNab.jpg).
const IMG_DIR = 'card_images/gpk_series1/';

const allCards = [
  {n:1, v:'a', name:'Nasty Nick'},         {n:1, v:'b', name:'Evil Eddie'},
  {n:2, v:'a', name:'Junkfood John'},      {n:2, v:'b', name:'Ray Decay'},
  {n:3, v:'a', name:'Up Chuck'},           {n:3, v:'b', name:'Heavin` Steven'},
  {n:4, v:'a', name:'Fryin` Brian'},      {n:4, v:'b', name:'Electric Bill'},
  {n:5, v:'a', name:'Dead Ted'},           {n:5, v:'b', name:'Jay Decay'},
  {n:6, v:'a', name:'Art Apart'},          {n:6, v:'b', name:'Busted Bob'},
  {n:7, v:'a', name:'Stormy Heather'},     {n:7, v:'b', name:'April Showers'},
  {n:8, v:'a', name:'Adam Bomb'},          {n:8, v:'b', name:'Blasted Billy'},
  {n:9, v:'a', name:'Boozin` Bruce'},      {n:9, v:'b', name:'Drunk Ken'},
  {n:10, v:'a', name:'Tee-Vee Stevie'},    {n:10, v:'b', name:'Geeky Gary'},
  {n:11, v:'a', name:'Itchie Richie'},     {n:11, v:'b', name:'Bugged Bert'},
  {n:12, v:'a', name:'Furry Fran'},        {n:12, v:'b', name:'Hairy Mary'},
  {n:13, v:'a', name:'Ashcan Andy'},       {n:13, v:'b', name:'Spacey Stacy'},
  {n:14, v:'a', name:'Potty Scotty'},      {n:14, v:'b', name:'Jason Basin'},
  {n:15, v:'a', name:'Ailin` Al'},        {n:15, v:'b', name:'Mauled Paul'},
  {n:16, v:'a', name:'Weird Wendy'},       {n:16, v:'b', name:'Haggy Maggie'},
  {n:17, v:'a', name:'Wacky Jackie'},      {n:17, v:'b', name:'Loony Lenny'},
  {n:18, v:'a', name:'Cranky Frankie'},    {n:18, v:'b', name:'Bad Brad'},
  {n:19, v:'a', name:'Corroded Carl'},     {n:19, v:'b', name:'Crater Cris'},
  {n:20, v:'a', name:'Swell Mel'},         {n:20, v:'b', name:'Dressy Jesse'},
  {n:21, v:'a', name:'Virus Iris'},        {n:21, v:'b', name:'Sticky Vicky'},
  {n:22, v:'a', name:'Junky Jeff'},        {n:22, v:'b', name:'Stinky Stan'},
  {n:23, v:'a', name:'Drippy Dan'},        {n:23, v:'b', name:'Leaky Lou'},
  {n:24, v:'a', name:'Nervous Rex'},       {n:24, v:'b', name:'Nerdy Norm'},
  {n:25, v:'a', name:'Creepy Carol'},      {n:25, v:'b', name:'Scary Carrie'},
  {n:26, v:'a', name:'Slobby Robbie'},     {n:26, v:'b', name:'Fat Matt'},
  {n:27, v:'a', name:'Brainy Janie'},      {n:27, v:'b', name:'Jenny Genius'},
  {n:28, v:'a', name:'Oozy Suzie'},        {n:28, v:'b', name:'Meltin` Melissa'},
  {n:29, v:'a', name:'Bony Joanie'},       {n:29, v:'b', name:'Thin Lynn'},
  {n:30, v:'a', name:'New Wave Dave'},     {n:30, v:'b', name:'Graffiti Petey'},
  {n:31, v:'a', name:'Run Down Rhoda'},    {n:31, v:'b', name:'Flat Pat'},
  {n:32, v:'a', name:'Frigid Bridget'},    {n:32, v:'b', name:'Chilly Millie'},
  {n:33, v:'a', name:'Mad Mike'},          {n:33, v:'b', name:'Savage Stuart'},
  {n:34, v:'a', name:'Kim Kong'},          {n:34, v:'b', name:'Anna Banana'},
  {n:35, v:'a', name:'Wrinkly Randy'},     {n:35, v:'b', name:'Rockin` Robert'},
  {n:36, v:'a', name:'Wrappin` Ruth'},    {n:36, v:'b', name:'Tommy Tomb'},
  {n:37, v:'a', name:'Guillo Tina'},       {n:37, v:'b', name:'Cindy Lopper'},
  {n:38, v:'a', name:'Slimy Sam'},         {n:38, v:'b', name:'Lizard Liz'},
  {n:39, v:'a', name:'Buggy Betty'},       {n:39, v:'b', name:'Green Jean'},
  {n:40, v:'a', name:'Unstitched Mitch'},  {n:40, v:'b', name:'Damaged Don'},
  {n:41, v:'a', name:'Mean Gene'},         {n:41, v:'b', name:'Joltin` Joe'},
];

const base = allCards.slice();

function cardId(n, v) { return String(n).padStart(3, '0') + v; }
function frontPath(n, v) { return IMG_DIR + 'front_' + cardId(n, v) + '.jpg'; }
function backPath(n) { return IMG_DIR + 'back_' + String(n).padStart(3, '0') + 'ab.jpg'; }

function drawPack() { return [...base].sort(function () { return Math.random() - .5; }).slice(0, 5); }

function makeCard(card, delay) {

    var slot = document.createElement('div'); slot.className = 'card-slot';

    var frontSrc = frontPath(card.n, card.v), backSrc = backPath(card.n);

    var cardEl = document.createElement('div'); cardEl.className = 'card'; cardEl.style.animationDelay = delay + 'ms';
    var img = document.createElement('img'); img.src = frontSrc; img.alt = card.name; img.loading = 'lazy';
    img.onerror = function () { if (this.src !== frontSrc) this.src = frontSrc; };

    cardEl.appendChild(img);

    cardEl.addEventListener('click', function () { openLightbox(frontSrc, backSrc, card.name); });

    var hint = document.createElement('div'); hint.className = 'flip-hint'; hint.textContent = 'click to view back';
    slot.appendChild(cardEl); slot.appendChild(hint);

    return { slot: slot, cardEl: cardEl };
}
var opening = false, packsOpenedCount = 0, sessionPacksCount = 0, collectedCount = 0;
var STORE_KEY = 'gpk1', TOTAL_CARDS = 82;

function saveState() {
    var collected = [];

    document.querySelectorAll('.col-slot.filled').forEach(function (s) {
        collected.push(s.id.replace('col-', ''));
    });

    localStorage.setItem(STORE_KEY, JSON.stringify({ cards: collected, packs: packsOpenedCount }));
}

function loadState() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }

function initCollection() {
    var grid = document.getElementById('collectionGrid'); if (!grid) return;
    for (var i = 1; i <= 41; i++) {
        ['a', 'b'].forEach(function (v) {
            var card = allCards.find(function (c) { return c.n === i && c.v === v; });
            var slot = document.createElement('div');
            slot.className = 'col-slot'; slot.id = 'col-' + cardId(i, v);

            slot.innerHTML = '<span class="col-num">#' + i + v.toUpperCase() + '</span><span class="col-name">' + card.name + '</span>';

            grid.appendChild(slot);
        });
    }

    var saved = loadState();

    if (saved.packs) { packsOpenedCount = saved.packs; document.getElementById('packsTotal').textContent = packsOpenedCount; }

    if (saved.cards) saved.cards.forEach(function (id) {
        var m = id.match(/^(\d+)([ab])$/); if (!m) return;
        var card = allCards.find(function (c) { return c.n === parseInt(m[1]) && c.v === m[2]; });
        if (card) fillSlot(card, true);

    });

}

function fillSlot(card, silent) {

    var id = 'col-' + cardId(card.n, card.v), slot = document.getElementById(id);

    if (!slot || slot.classList.contains('filled')) return;

    var frontSrc = frontPath(card.n, card.v), backSrc = backPath(card.n);

    slot.innerHTML = '';

    var img = document.createElement('img'); img.src = frontSrc; img.alt = card.name;
    img.onerror = function () { if (this.src !== frontSrc) this.src = frontSrc; };
    slot.appendChild(img); slot.classList.add('filled');

    if (!silent) slot.classList.add('filling');

    slot.addEventListener('animationend', function () { slot.classList.remove('filling'); });
    slot.addEventListener('click', function () { openLightbox(frontSrc, backSrc, card.name); });
    collectedCount++;

    var countEl = document.getElementById('collectionCount');

    if (countEl) countEl.textContent = collectedCount + ' /' + TOTAL_CARDS;

    if (!silent) saveState();
}
document.addEventListener('DOMContentLoaded', initCollection);

function resetPack() {

    var packEl = document.getElementById('pack'), wrapper = document.getElementById('packWrapper');
    var btn = document.getElementById('openBtn'), labelEl = document.getElementById('packLabel');
    packEl.classList.remove('pack-tearing');

    packEl.style.animation = 'none'; packEl.offsetHeight; packEl.style.animation = '';
    wrapper.classList.remove('opened'); wrapper.style.opacity = '1'; wrapper.style.pointerEvents = 'auto';

    btn.disabled = false; btn.textContent = 'Open Another Pack'; labelEl.textContent = ''; opening = false;

}

function openPack() {
    if (opening) return; opening = true;
    var packEl = document.getElementById('pack'), btn = document.getElementById('openBtn');
    var labelEl = document.getElementById('packLabel'), wrapper = document.getElementById('packWrapper');
    var divider = document.getElementById('divider');
    btn.disabled = true; labelEl.textContent = '';
    packEl.classList.add('pack-tearing');
    packsOpenedCount++; sessionPacksCount++;
    document.getElementById('packsTotal').textContent = packsOpenedCount;
    document.getElementById('packsSession').textContent = sessionPacksCount;
    saveState();
    setTimeout(function () {
        wrapper.classList.add('opened'); wrapper.style.opacity = '0.35';
        divider.classList.add('visible');
        var pulled = drawPack(), delay = 0, step = 120;
        var baseSlots = document.getElementById('slots-base'); baseSlots.innerHTML = '';
        pulled.forEach(function (card) {
            var result = makeCard(card, delay); baseSlots.appendChild(result.slot);
            (function (el, d) { setTimeout(function () { el.classList.add('revealed'); fillSlot(card); }, d + 20); })(result.cardEl, delay);
            delay += step;
        });
        setTimeout(resetPack, delay + 400);
        setTimeout(function () { divider.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 300);
    }, 460);
}

//DRAG TO OPEN
document.addEventListener('DOMContentLoaded', function () {
    var wrapper = document.getElementById('packWrapper'); if (!wrapper) return;
    var MIN_DRAG = 60, dragging = false, lastX = 0, lastY = 0, cumDist = 0, canvas, ctx, points = [];
    function initCanvas() {
        var pack = document.getElementById('pack'); pack.style.position = 'relative';
        canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border-radius:6px;pointer-events:none;z-index:10;';
        canvas.width = pack.offsetWidth || 150; canvas.height = pack.offsetHeight || 224;
        pack.appendChild(canvas); ctx = canvas.getContext('2d');
    }
    function getPos(e) {
        var rect = canvas.getBoundingClientRect(), src = e.touches ? e.touches[0] : e; return {
            x: (src.clientX -
                rect.left) * (canvas.width / rect.width), y: (src.clientY - rect.top) * (canvas.height / rect.height)
        };
    }
    function drawLine() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); if (points.length < 2) return;
        ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.92)'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(255,107,0,0.9)'; ctx.shadowBlur = 14;
        ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke(); ctx.restore();
    }
    wrapper.addEventListener('pointerdown', function (e) {
        if (opening) return; if (!canvas) initCanvas();
        dragging = true; points = []; cumDist = 0; ctx.clearRect(0, 0, canvas.width, canvas.height);
        var pos = getPos(e); lastX = pos.x; lastY = pos.y; points.push(pos);
        wrapper.setPointerCapture(e.pointerId); e.preventDefault();
    });

    wrapper.addEventListener('pointermove', function (e) {

        if (!dragging) return; var pos = getPos(e);
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
    var lf = document.getElementById('lightbox-front'), lb = document.getElementById('lightbox-back');
    lf.src = frontSrc; lf.alt = name; lb.src = backSrc; lb.alt = name + ' back';
    lb.onerror = function () { this.src = frontSrc; };
    document.getElementById('lightbox').classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });