// TCDB 1990 Impel Marvel Universe - Clean Downloader v2

// Run this on the TCDB gallery page:
// https://www.tcdb.com/GallerySheets.cfm/sid/74396/1990-Impel-Marvel-Universe?PageIndex=1&Slots=9&Records=162

// This version correctly maps every card URL to its actual card number,
// handling both standard (74398-NFr.jpg) and replacement (74396-lDRepFr.jpg) cards.

// Saves as front_001.jpg-front_162.jpg and back_001.jpg-back_162.jpg.

// Move downloaded files to card_images/marvel_impel_1990/

(async function(){
  const BASE_URL = 'https://www.tcdb.com/GallerySheets.cfm/sid/74396/1990-Impel-Marvel-Universe';
  const TOTAL_PAGES = 18;
  const delay = ms => new Promise(r => setTimeout(r, ms));

  // RepFrTCDB internal ID -> card number
  const REP_MAP = {
    '5316337': 9, '5316349':21, '5316360':32, '5316365':37,
    '5316367': 39, '5316369':41, '5316374':46, '5316376':48,
    '5316381': 53, '5316383':55, '5316384':56, '5316385':57,
    '5316390': 62, '5316394':66, '5316395':67, '5316401':73,
    '5316403': 75, '5316410':82, '5316411':83, '5316413':85,
    '5316420': 92, '5316439': 111, '5316455': 127, '5316456': 128,
    '5316457': 129, '5316464': 136, '5316471': 143, '5316474': 146,
    '5316477': 149, '5316482': 154, '5316484': 156, '5316486': 158,
    '5316489': 161,

  };

  // Build a map of cardNumber -> { frontUrl, backUrl }
  const cards = {};

  console.log('Scanning all 18 pages...');

  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const url = `${BASE_URL}?PageIndex=${page}&Slots=9&Records=162`;
    try {
      const resp = await fetch(url, { credentials: 'include' });
      const html = await resp.text();

      // Match all card image URLs for this set
      const matches = [...html.matchAll(/["']((?:https?:\/\/)?(?:www\.tcdb\.com)?\/Images\/Cards\/Non-Sport\/74396\/74396-([^"']+?)Fr\.jpg)['"]/gi)];

      matches.forEach(m => {
        const rawUrl = m[1].startsWith('http') ? m[1] : 'https://www.tcdb.com' + m[1];
        const idPart = m[2]; // either a number (e.g. "103") or "5316337Rep"

        let cardNum;
        if (/^\d+$/.test(idPart)) {
          // Standard card: URL contains the card number directly
          cardNum = parseInt(idPart);
        } else {
          // RepFr card: look up the TCDB internal ID
          const repId = idPart.replace('Rep', '');
          cardNum = REP_MAP[repId];
        }

        if (cardNum && !cards[cardNum]) {
          const backUrl = rawUrl.replace(/Fr\.jpg$/i, 'Bk.jpg');
          cards[cardNum] = { frontUrl: rawUrl, backUrl };
        }
      });

      console.log(` Page ${page}/${TOTAL_PAGES}: ${Object.keys(cards).length} cards mapped so far`);
    } catch (e) {
      console.error(` Page ${page} error:`, e.message);
    }

    await delay(350);
  }

  const cardNums = Object.keys(cards).map(Number).sort((a, b) => a - b);
  console.log(` Total cards mapped: ${cardNums.length}`);

  // Check for any gaps
  const missing = [];
  for(let i = 1; i <= 162; i++) {
    if (!cards[i]) missing.push(i);
  }
  if (missing.length) {
    console.warn(` Cards with no image found: ${missing.join(', ')}` );

  }

  // Download all fronts, then all backs
  async function downloadImg(src, filename) {
    try {
      const resp = await fetch(src, { credentials: 'include' });
      if (!resp.ok) throw new Error(` HTTP ${resp.status} `);
      const blob = await resp.blob();
      const a = Object.assign(document.createElement('a'), {
        href: URL.createObjectURL(blob), download: filename
      });
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(a.href);
      return true;
    } catch (e) {
      console.error(` X ${filename}:`, e.message);
      return false;
    }
  }

  let ok = 0, fail = 0;
  const total = cardNums.length * 2;
  console.log(` Downloading ${total} images (${cardNums.length} fronts + ${cardNums.length} backs)...`);

  // Fronts first - download all fronts sequentially
  for (const n of cardNums) {
    const num = String(n).padStart(3, '0');
    const ok_ = await downloadImg(cards[n].frontUrl, `front_${num}.jpg`);
    ok_ ? ok++ : fail++;
    if (n % 20 === 0) console.log(` Fronts: ${n}/162...`);
    await delay(200);
  }

  // Then backs - download all backs sequentially
  for (const n of cardNums) {
    const num = String(n).padStart(3, '0');
    const ok_ = await downloadImg(cards[n].backUrl, `back_${num}.jpg`);
    ok_ ? ok++ : fail++;
    if (n % 20 === 0) console.log(` Backs: ${n}/162...`);
    await delay(200);
  }

  console.log(` OK ${ok} downloaded X ${fail} failed`);
  alert(`Done!\n\n OK ${ok} images saved to Downloads\n X ${fail} failed (backs that don't exist on TCDB)\n\nMove all files to card_images/marvel_impel_1990/`);
})();
