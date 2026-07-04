//- GeepeekAy.com - GPK Series 1 Downloader
// Run this as a Snippet on https://geepeekaycom/gallery_os1.html
//

// Downloads all 82 sticker fronts + 41 shared backs.

// Naming:

// front_O01 a.jpg, front_O01 b.jpg  front_O41 a.jpg, front_O41 b.jpg
// back_0O1 ab.jpg  back_041 ab.jpg (a & b share the same back)
//

// Move all files to card_images/gpk_series1/

// (Replace existing TCDB downloads -these are better quality)
//

(async function () {
    const BASE = 'https://geepeekay.com/gallery/os1/';
    const TOTAL = 41;
    const delay = ms => new Promise(r => setTimeout(r, ms));

    async function downloadImg(url, filename) {
        try {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(' HTTP ${resp.status}');
            const blob = await resp.blob();
            const a = Object.assign(document.createElement('a'), {
                href: URL.createObjectURL(blob), download: filename

            });

            document.body.appendChild(a); a.click();
            document.body.removeChild(a); URL.revokeObjectURL(a.href);
            return true;

        } catch (e) {
            console.error(` X ${filename}: $(e.message}`);
            return false;

        }

    }

    let ok = 0, fail = 0;
    const total = TOTAL * 2 + TOTAL; // 82 fronts + 41 backs

    console.log(' Downloading ${total} images...');

    // Fronts (a and b for each number)
    for (let n = 1; n <= TOTAL; n++) {
        const num = String(n).padStart(3, '0');
        for (const v of ['a', 'b']) {
            const url = `${BASE}os1_${n}${v}.jpg`;
            const file = `front_${num}${v}.jpg`;
            const ok_ = await downloadImg(url, file);
            ok_ ? ok++ : fail++;
            await delay(150);
        }
        if (n % 10 === 0) console.log(` Fronts: ${n}/${TOTAL}... `);
    }

    // Backs (shared per pair-- named back_NNNab.jpg)
    for (let n = 1; n <= TOTAL; n++) {
        const num = String(n).padStart(3, '0');
        const url = `${BASE}backs/os1_back_${n}ab.jpg`;
        const file = `back${num}ab.jpg`;
        // Handle the one exception on the page (card 29 uses 29b not 29ab)

        const actualUrl = n === 29
            ? `${BASE}backs/os1_back_29b.jpg`
            : url;

        const ok_ = await downloadImg(actualUrl, file);

        ok_ ? ok++ : fail++;

        await delay(150);

        if (n % 10 === 0) console.log(` Backs: ${n}/${TOTAL}...`);
    }
    console.log(`\n YES ${ok} downloaded XXX ${fail} failed`);
    alert(`Done!\n\n YES ${ok} images saved\n XXX ${fail} failed\n\nMove to card_images/gpk_series1/\n(Replace the existing TCDB files)`);
})();

