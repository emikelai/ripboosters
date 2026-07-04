// TCDB 1992 X-Men Impel - Clean Downloader (Strict Sequential Naming)
// Run this directly in your browser console on the TCDB gallery page:
// https://www.tcdb.com/GallerySheets.cfm/sid/74997/1992-Impel-X-Men?PageIndex=1&Slots=9&Records=100

(async function(){
  const TOTAL_PAGES = 12;
  const delay = ms => new Promise(r => setTimeout(r, ms));

  const fronts = [];
  const seen = new Set();

  console.log('Scanning all 12 pages...');

  for (let page = 1; page <= TOTAL_PAGES; page++){
    const url = `/GallerySheets.cfm/sid/74997/1992-Impel-X-Men?PageIndex=${page}&Slots=9&Records=100`;
    
    try {
      console.log(`Fetching Page ${page}/${TOTAL_PAGES}...`);
      const resp = await fetch(url, { credentials: 'include' });
      
      if (!resp.ok) {
        console.error(`❌ Page ${page} failed with Status: ${resp.status}`);
        continue;
      }

      const html = await resp.text();

      // Grab the image sources
      const matches = [...html.matchAll(/["']((?:https?:\/\/)?(?:www\.tcdb\.com)?\/Images\/Cards\/Non-Sport\/74997\/74997-([^"']+?)Fr\.jpg)/gi)];
      
      matches.forEach(m => {
        const src = m[1].startsWith('http') ? m[1] : 'https://www.tcdb.com' + m[1];
        if (!seen.has(src)) { 
          seen.add(src); 
          fronts.push(src);
        }
      });

      console.log(` Progress: ${fronts.length} card fronts collected so far.`);
    } catch(e) { 
      console.error(`❌ Network Error on Page ${page}:`, e.message);
    }
    await delay(800);
  }

  console.log('\nTotal unique cards discovered:', fronts.length);
  if (fronts.length === 0) {
    console.error('❌ No cards found. Make sure you run this on the TCDB site tab.');
    return;
  }

  async function downloadImg(src, filename){
    try {
      const resp = await fetch(src, { credentials: 'include' });
      if (!resp.ok) throw new Error(' HTTP '+resp.status);
      
      const blob = await resp.blob();
      const a = Object.assign(document.createElement('a'),{
        href: URL.createObjectURL(blob), download: filename
      });
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(a.href);
      return true;
    } catch(e) { 
      console.error(' ❌ Failed to download '+filename+':', e.message); 
      return false; 
    }
  }

  let ok = 0, fail = 0;

  // 1. Download Fronts (Strict sequential front_001, front_002...)
  console.log('\nStarting download sequence for Card Fronts...');
  for (let i = 0; i < fronts.length; i++) {
    const num = String(i + 1).padStart(3, '0');
    const success = await downloadImg(fronts[i], `front_${num}.jpg`);
    if (success) ok++; else fail++;
    
    if ((i + 1) % 10 === 0) console.log(` Fronts progress: ${i + 1}/${fronts.length}...`);
    await delay(600);
  }

  // 2. Download Backs (Strict sequential back_001, back_002...)
  console.log('\nStarting download sequence for Card Backs...');
  for (let i = 0; i < fronts.length; i++) {
    const num = String(i + 1).padStart(3, '0');
    const backSrc = fronts[i].replace(/RepFr\.jpg$/i, 'RepBk.jpg').replace(/Fr\.jpg$/i, 'Bk.jpg');
    
    const success = await downloadImg(backSrc, `back_${num}.jpg`);
    if (success) ok++; else fail++;
    
    if ((i + 1) % 10 === 0) console.log(` Backs progress: ${i + 1}/${fronts.length}...`);
    await delay(600);
  }

  console.log(`\nDownload Complete! Success: ${ok}, Failed: ${fail}`);
  alert(`Done!\n\n${ok} images saved to Downloads\n${fail} failed\n\nMove all files to card_images/xmen_impel_1992/`);
})();