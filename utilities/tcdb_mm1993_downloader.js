//-TCDB 1993 SkyBox Marvel Masterpieces - Base Cards Downloader

// Run on: https://www.tcdb.com/GallerySheets.cfm/sid/74922/1993-SkyBox-Marvel-Masterpieces?PageIndex=1&Slots=9&Records=90
//
// Downloads front_001-front_090 and back_001-back_090.
//
// Uses POSITION ORDER because nearly all MM1993 cards use TCDB internal IDs
// in their image filenames (e.g. 74922-5338115Fr.jpg), not card numbers.
//
// The 1st image collected across all pages = front_001, 2nd = front_002, etc.
//
//
// After running: move all files to card_images/marvel_masterpieces_1993/
//
//
// NOTE: Dyna-Etch inserts (8 cards) must be downloaded separately.

// See DYNA-ETCH section at the bottom of this file.

//
/*
(async function () {
    const BASE_URL = 'https://www.tcdb.com/GallerySheets.cfm/sid/74922/1993-SkyBox-Marvel-Masterpieces';
    const TOTAL_PAGES = 10; // 90 cards / 9 per page = exactly 10 pages
    const EXPECTED = 90;
    const delay = ms => new Promise(r => setTimeout(r, ms));
// Fixed version - all typos corrected (O→0, template literals fixed, regex fixed)



    const fronts = [];
    const seen = new Set();

    console.log('Scanning all 10 pages for MM1993 base cards...');

    for (let page = 1; page <= TOTAL_PAGES; page++) {
        const url = `${BASE_URL}?PageIndex=${page}&Slots=9&Records=${EXPECTED}`;
        try {
            const resp = await fetch(url, { credentials: 'include' });
            const html = await resp.text();

            const matches = [...html.matchAll(/["']((?:https?:\/\/)?(www\.tcdb\.com)?\/Images\/Cards\/Non-Sport\/74922\/74922-[^"']+Fr\.jpg)["']/gi)];
            matches.forEach(m => {
                const src = m[1].startsWith('http') ? m[1] : 'https://www.tcdb.com' + m[1];
                if (!seen.has(src)) { seen.add(src); fronts.push(src); }
            });

            console.log(` Page ${page}/${TOTAL_PAGES}: ${fronts.length} fronts collected so far`);
        } catch (e) { console.error(` Page ${page} error:`, e.message); }
        await delay(800);
    }

    console.log('\nTotal front URLs found:', fronts.length);
    if (fronts.length !== EXPECTED) {
        console.warn(` Expected ${EXPECTED}, got ${fronts.length}. Check page count or set parameters.`);
    }

    async function downloadImg(src, filename) {
        try {
            const resp = await fetch(src, { credentials: 'include' });
            if (!resp.ok) throw new Error(` HTTP ${resp.status}`);
            const blob = await resp.blob();
            const a = Object.assign(document.createElement('a'), {
                href: URL.createObjectURL(blob), download: filename
            });
            document.body.appendChild(a); a.click();
            document.body.removeChild(a); URL.revokeObjectURL(a.href);
            return true;
        } catch (e) { console.error(` X ${filename}: ${e.message}`); return false; }
    }

    let ok = 0, fail = 0;

    // Fronts - named by position order
    console.log('\nDownloading fronts...');

    for (let i = 0; i < fronts.length; i++) {
        const num = String(i + 1).padStart(3, '0');
        const f = await downloadImg(fronts[i], `front_${num}.jpg`);
        f ? ok++ : fail++;
        if ((i + 1) % 10 === 0) console.log(` Fronts: ${i + 1}/${fronts.length}...`);
        await delay(600);
    }
    // Backs - derive from front URL by replacing Fr.jpg -> Bk.jpg (or RepFr -> RepBk)
    console.log('\nDownloading backs...');
    for (let i = 0; i < fronts.length; i++) {
        const num = String(i + 1).padStart(3, '0');
        const back = fronts[i].replace(/RepFr\.jpg$/i, 'RepBk.jpg').replace(/Fr\.jpg$/i, 'Bk.jpg');
        const b = await downloadImg(back, `back_${num}.jpg`);
        b ? ok++ : fail++;
        if ((i + 1) % 10 === 0) console.log(` Backs: ${i + 1}/${fronts.length}...`);
        await delay(600);
    }

    console.log('\n OK', ok, 'downloaded XXX', fail, 'failed');

    alert(`MM1993 Base Cards Done!\n\n OK ${ok} images saved\n XXX ${fail} failed\n\nMove to card_images / marvel_masterpieces_1993 /\n\nNext: run the Dyna-Etch section below.`);

// Spectra-Etch Downloader Section for MM1992 (same as in tcdb_mm1992_downloader.js)

})();
*/

//—SPECTRA-ETCH DOWNLOADER
// Run this SEPARATELY (paste into console as a second snippet) on the TCDB

// page for the 1992 Masterpieces Spectra—Etch subset:

// https://www.tcdb.com/GallerySheets.cfm/sid/74918/1992—SkyBox—Marvel-Masterpieces-Spectra-Etch
// (Adjust the SID/URL if needed — search TCDB for "1992 Masterpieces Spectra-Etch")

//

// Downloads spectra_front41—5.jpg and spectra_bacl<g1—5.jpg




(async function () {
    // UPDATE this URL to the correct TCDB gallery page for the Dyna-Eetch subset
    const BASE_URL = 'https://www.tcdb.com/Gallery.cfm/sid/74923/1993-SkyBox-Marvel-Masterpieces---X-Men-2099-Dyna-Etch';
    const delay = ms => new Promise(r => setTimeout(r, ms));


    const fronts = [];
    const seen = new Set();

    const resp = await fetch(`${BASE_URL}?PageIndex=1&SLOTS=9&Records=8`, { credentials: 'include' });
    const html = await resp.text();

    // Match any Non-Sport image URL (Dyna-Eetch may have a different SID)
    const matches = [...html.matchAll(/["']((?:https?:\/\/)?(?:www\.)?tcdb\.com\/Images\/Cards\/Non-Sport\/\d+\/\d+-[^\"]]+Fr\.jpg)/gi)];
    matches.forEach(m => {
        const src = m[1].startsWith('http') ? m[1] : 'https://www.tcdb.com' + m[1];
        if (!seen.has(src)) { seen.add(src); fronts.push(src); }
    });

    console.log(`Found ${fronts.length} Dyna-Eetch fronts (expected 8)`);

    async function downloadImg(src, filename) {
        try {
            const resp = await fetch(src, { credentials: 'include' });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const blob = await resp.blob();
            const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: filename });
            document.body.appendChild(a); a.click();
            document.body.removeChild(a); URL.revokeObjectURL(a.href);
            return true;
        } catch (e) { console.error(`❌ ${filename}: ${e.message}`); return false; }
    }

    for (let i = 0; i < fronts.length; i++) {
        await downloadImg(fronts[i], `dynaetch_front_${i + 1}.jpg`);
        await delay(600);
        await downloadImg(fronts[i].replace(/Fr\.jpg$/i, 'Bk.jpg'), `dynaetch_back_${i + 1}.jpg`);
        await delay(600);
    }

    alert('Dyna-Etech done! Move files to card_images/marvel_masterpieces_1993/');
})();
