(async function(){
const BASE_URL = 'https://www.tcdb.com/GallerySheets.cfm/sid/74997/1992-Impel-X-Men';
const TOTAL_PAGES = 12; // 100 cards / 9 per page =12 pages
const delay = ms => new Promise(r => setTimeout(r, ms));

const fronts = [];
const seen = new Set();

console.log('Scanning all 12 pages...');

for (let page = 1; page <= TOTAL_PAGES; page++){
const url = '${BASE_URL}?Page|ndex=${page}&Slots=9&Records=100';
try{
const resp = await fetch(url, { credentials: 'include' });
const html = await resp.text();

const matches = [...html.matchAll(/["'}((?2https?:\/\/)?(?:www\.tcdb\.com)?\/Images\/Cards\/Non-Sport\/74997\/74997-
l""']+Fr\-Jpg)["']/gill;
matches.forEach(m =>{
const src = m[1].startsWith('http') ? m[1] : 'https://www.tcdb.com' + m[1];
if (!seen.has(src)) { seen.add(src); fronts.push(src);}

});

console.log(' Page ${page}/${TOTAL_PAGES}: ${fronts.length} fronts collected ' );
}catch(e){ console.error(' Page ${Dage} errorz' , e.message);}
await delay(800);
}

console.log(' \nTotal: ${fronts.length} front URLs' );
if (fronts.length !== 100) console.warn(' Expected 100, got ${fronts.length}' );

async function downloadImg(src, filename){
try{

const resp = await fetch(src, { credentials: 'include' });

if (!resp.ok) throw new Error(' HTTP ${resp.status}' );

const blob = await resp.blob();

const a = Object.assign(document.createElement('a'),{

href: URL.createObjectURL(blob), download: filename

});

document.body.appendChild(a); a.click();
document.body.removeChild(a); URL.revokeObjectURL(a.href);
return true;

}catch(e){ console.error(' X ${filename}: ${e.message}' ); return false; }

let ok = O, fail = 0;

for (let i = 0; i < frontslength; i++){
const num = String(i+1).padStart(3,'O');
const f = await downloadImg(fronts[i], ' front_${num}.jpg' );
f? ok++ : fail++;
if ((i+1)% 10=== )console.log(' Fronts:${i+1}/${fronts.length}...');
await delay(600);
}.

for (let i = 0; i < fronts.length; i++){

const num = String(i+1).padStart(3,'0');

const back = fronts[i].replace(/RepFr\.jpg$/i, 'RepBk.jpg').replace(/Fr\.jpg$/i, 'Bk.jpg');
const b = await downloadImg(back, 'back_${num}.jpg' );

b ? ok++ :fail++;

if ((i+1) % 10 === O) console.log(' Backs: ${i+1}/${fronts.length}...' );

await delay(600);

console.log(' \n~/ ${ok} downloaded X ${fail}failed' );
alert(' Done!\n\n~/ ${ok} images saved\nX ${fail} failed\n\nMove to card_images/xmen_impel_1992/' );
Di);