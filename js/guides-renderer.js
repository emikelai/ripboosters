// js/guides-renderer.js

const DROP_RATE_GUIDES = {
    mtgfra: {
        title: "Collector Booster Pack Odds & Drop Rates",
        items: [
            "<strong>5 Traditional Foil Commons:</strong> Main Set Commons (100%).",
            "<strong>4 Traditional Foil Uncommons:</strong> Main Set Uncommons (65%), Showcase Frame Cards (35%).",
            "<strong>1 Traditional Foil Basic Land:</strong> Full-Art Land (100%).",
            "<strong>1 Traditional Foil Rare/Mythic:</strong> Main Set Rare (85%), Mythic Rare (15%).",
            "<strong>1 Non-Foil Booster Fun Rare/Mythic:</strong> Extended-Art Rare (40%), Showcase Rare (30%) / Mythic (10%), Borderless Rare (15%) / Mythic (5%).",
            "<strong>1 Foil Booster Fun Rare/Mythic Card:</strong> Foil Extended-Art Rare (30%), Foil Showcase Rare (25%) / Mythic (10%), Foil Borderless Rare (15%) / Mythic (10%), Special Guests (8%), Fracture Showcase (&lt;2%), Serialized (&lt;1%).",
            "<strong>1 Art Card or Token:</strong> Foil Token (65%), Art Card (35%)."
        ]
    },
    mtghob: {
        title: "Collector Booster Pack Odds & Drop Rates",
        items: [
            "<strong>5 Traditional Foil Commons:</strong> Commons (89.6%), Common Dual Lands (7.5%), Common Scene Cards (3%).",
            "<strong>4 Foil Uncommons:</strong> Foil Uncommons (84.6%), Foil Scene Cards (6.2%), Foil Dragon Hoard Cards (9.2%). 10% chance for a Surge Foil Dragon Hoard card.",
            "<strong>1 Traditional Foil Basic Land:</strong> Full-Art Middle-earth Journey Land (100%).",
            "<strong>2 Traditional Foil Rares/Mythics:</strong> Main set Rares (87.6%), Mythic Rares (12.4%).",
            "<strong>2 Non-Foil Booster Fun Cards:</strong> HOB Scene Rare (10.1%), HOC Scene Rare (14.2%), Dragon Hoard Rare (13.1%) / Mythic (4.5%), Book Cover Rare (4.2%) / Mythic (3.3%), Classic Artist (11.9%), Dwarvish Language (1.5%), Extended-Art HOB Rare (30.9%) / Mythic (1.2%), Extended-Art HOC Mythic (5.3%).",
            "<strong>1 Foil Booster Fun Card:</strong> Foil HOB Scene Rare (11%), Foil Dragon Hoard Rare (14.3%) / Mythic (4.9%), Surge Foil Dragon Hoard Rare (6.5%) / Mythic (2.4%), Foil Book Cover Rare (4.6%) / Mythic (3.6%), Surge Foil Book Cover Rare (2.4%) / Mythic (1.8%), Surge Foil Classic Artist (11.9%), Foil Dwarvish Language (1.6%), Foil Extended-Art HOB Rare (33.8%) / Mythic (1.3%), Smaug Gold Headliner (~500 total).",
            "<strong>1 Art Card or Token:</strong> Foil Double-Sided Token (65%), Art Card (35% — 1 in 7 Gold Stamped)."
        ]
    },
    mtgmsh: {
        title: "Collector Booster Pack Odds & Drop Rates",
        items: [
            "<strong>3 Traditional Foil Commons:</strong> Main Set Commons (89%), Common Dual Lands (11%).",
            "<strong>2 Traditional Foil Uncommons:</strong> Main Set Uncommons (100%).",
            "<strong>2 Traditional Foil Common MSC Cards:</strong> Reprint from Jumpstart (50%), New-to-Magic Jumpstart (50%).",
            "<strong>1 Traditional Foil Uncommon MSC Card:</strong> Reprint from Jumpstart (18.6%), New-to-Magic Jumpstart (81.4%).",
            "<strong>1 Traditional Foil Scene Card:</strong> Common Scene (20%), Uncommon Scene (80%).",
            "<strong>1 Traditional Foil Basic Land:</strong> City Chaos Land (50%), City Calm Land (50%).",
            "<strong>1 Traditional Foil Rare/Mythic:</strong> Main Set Rare (45%) / Mythic (9.4%), Double-Faced Scene Mythic (1.4%), Double-Faced Logo Mythic (1.4%), New Jumpstart Rare (33.8%) / Mythic (4.1%), Jumpstart Reprint Rare (3%), Welcome Deck Mythic (1.9%).",
            "<strong>1 Non-Foil Commander Booster Fun:</strong> Extended-Art Rare (93.6%), Extended-Art Mythic (3.2%), Borderless Face Commander (3.2%).",
            "<strong>1 Non-Foil Rare/Mythic Booster Fun:</strong> Extended-Art Rare (27.8%) / Mythic (2.3%), Scene Rare (6.4%) / Mythic (4.9%), Logo Rare (15.1%) / Mythic (4.6%), Panel Rare (12.1%) / Mythic (2.6%), Scene Box Borderless (13.9%), Borderless Rare Land (5.8%), Borderless Source Material (4.5%).",
            "<strong>1 Source Material Card:</strong> Non-Foil (75%), Traditional Foil (25%).",
            "<strong>1 Foil Booster Fun Rare/Mythic:</strong> Foil Extended-Art Rare (31.8%) / Mythic (2.7%), Foil Scene Rare (7.3%) / Mythic (4%), Foil Logo Rare (17.2%) / Mythic (3.6%), Foil Panel Rare (13.9%) / Mythic (3%), Foil Borderless Land (6.6%), Classic Comic Foil (9.9%), Borderless Gauntlet Mind Stone (&lt;1%), Cosmic Foil Mind Stone (Ultra Rare).",
            "<strong>1 Art Card or Token:</strong> Traditional Foil Token (64%), Art Card (32%), Gold Stamped Art Card (4%)."
        ]
    },
    mtgsos: {
        title: "Collector Booster Pack Odds & Drop Rates",
        items: [
            "<strong>4 Traditional Foil Commons:</strong> Commons (94.1%), Common Dual Lands (5.9%).",
            "<strong>3 Traditional Foil Uncommons:</strong> Main Set Uncommons (100%).",
            "<strong>2 Uncommon Mystical Archive Cards:</strong> Non-Foil (31.7%), Foil (31.7%), Japanese Non-Foil (31.7%), Japanese Silver Scroll Foil (5%).",
            "<strong>1 Traditional Foil Spellcraft Land:</strong> Basic Land (100%).",
            "<strong>1 Traditional Foil Rare/Mythic:</strong> Main Set Rare (85.7%), Mythic Rare (14.3%).",
            "<strong>1 Non-Foil Commander (SOC) Rare/Mythic:</strong> Extended-Art Rare (91%), Borderless Mythic (9%).",
            "<strong>1 Non-Foil Booster Fun Rare/Mythic:</strong> Extended-Art Rare (70%) / Mythic (5%), Borderless Elder Dragon/Planeswalker Rare (7.1%) / Mythic (5%), Field Notes Rare (8.6%) / Mythic (4.3%).",
            "<strong>1 Rare/Mythic Mystical Archive Card:</strong> Non-Foil Rare (25.6%) / Mythic (7.7%), Japanese Non-Foil Rare (25.6%) / Mythic (7.7%), Foil Rare (25.6%) / Mythic (7.7%).",
            "<strong>1 Foil Booster Fun Rare/Mythic Card:</strong> Foil Extended-Art Rare (59.9%) / Mythic (4.3%), Foil Borderless Rare (6.1%) / Mythic (4.3%), Foil Field Notes Rare (7.3%) / Mythic (3.7%), Silver Scroll Japanese Rare (7.7%) / Mythic (2.3%), Foil Special Guests (4.5%), Serialized Double Rainbow Emeritus (&lt;1%).",
            "<strong>1 Art Card or Token:</strong> Foil Token (65%), Art Card (35% — 5% Gold Stamped)."
        ]
    },
    mtgtmt: {
        title: "Collector Booster Pack Odds & Drop Rates",
        items: [
            "<strong>5 Traditional Foil Commons:</strong> Main Set Commons (88.4%), Common Dual Lands (8.7%), Common Scene Cards (2.9%).",
            "<strong>3 Traditional Foil Uncommons:</strong> Main Set Uncommons (80.9%), Uncommon Scene Cards (10.3%), Sewer Uncommons (8.8%).",
            "<strong>1 Commander Deck Reprint:</strong> Non-Foil Common (51.9%), Surge Foil Common (23.1%), Non-Foil Uncommon (17.3%), Surge Foil Uncommon (7.7%).",
            "<strong>1 Foil Basic Land:</strong> Foil Pizza Land (66.7%), Surge Foil Pizza Land (11.1%), Surge Foil Rooftop Land (22.2%).",
            "<strong>1 Traditional Foil Rare/Mythic:</strong> Main Set Rare (87.6%), Mythic Rare (12.4%).",
            "<strong>2 Booster Fun or TMC Cards:</strong> Non-Foil Silhouette Mythic (2.9%), Scene Rare (5.8%), Sewer Rare (13.2%) / Mythic (1.4%), Extended-Art Rare (16.1%) / Mythic (&lt;1%), Commander Borderless Mythic (2.2%), Commander New Rare (26.2%) / Mythic (&lt;1%), Commander Reprint Rare (19%), Surge Foil Commander New Rare (6.1%) / Mythic (&lt;1%), Surge Foil Commander Reprint Rare (4.4%), Surge Foil Pixel Rare (1.3%) / Mythic (0.6%).",
            "<strong>1 Source Material Card:</strong> Non-Foil (75%), Traditional Foil (25%).",
            "<strong>1 Foil Booster Fun Rare/Mythic Card:</strong> Foil Scene Rare (13.2%), Foil Sewer Rare (29.7%) / Mythic (3.3%), Foil Extended-Art Rare (36.3%) / Mythic (&lt;1%), Foil Silhouette (6.6%), Japan Showcase Foil (9%) / Fracture Foil (&lt;1%), Kevin Eastman Headliner Card.",
            "<strong>1 Art Card or Token:</strong> Foil Double-Sided Token (65%), Art Card (35% — 1 in 7 Gold Stamped)."
        ]
    },
    mtgecl: {
        title: "Collector Booster Pack Odds & Drop Rates",
        items: [
            "<strong>5 Traditional Foil Commons:</strong> Main Set Commons (100%).",
            "<strong>4 Traditional Foil Uncommons:</strong> Main Set Uncommons (63.6%), Uncommon Fable Frame Cards (36.4%).",
            "<strong>1 Traditional Foil Land:</strong> Full-Art Lorwyn Land (100%).",
            "<strong>1 Traditional Foil Rare/Mythic:</strong> Main Set Rare (85.5%), Mythic Rare (14.5%).",
            "<strong>1 Non-Foil Commander (ECC) Rare/Mythic:</strong> Extended-Art Rare (91%), Borderless Mythic (9%).",
            "<strong>2 Non-Foil Booster Fun Rares/Mythics:</strong> Extended-Art Rare (37.7%), Fable Rare (33.7%) / Mythic (9.1%), Borderless Nonland Rare (13%) / Mythic (4.5%), Reversible Shock Land (2%).",
            "<strong>1 Foil Booster Fun Rare/Mythic Card:</strong> Foil Extended-Art Rare (30.4%), Foil Fable Rare (27.2%) / Mythic (7.3%), Foil Borderless Rare (5.2%) / Mythic (4.2%), Foil Reversible Shock Land (5.2%), Foil Special Guests (10.5%), Japan Showcase Foil (9%) / Fracture Foil (1%), Serialized Bitterbloom Bearer (&lt;1%).",
            "<strong>1 Art Card or Token:</strong> Foil Double-Sided Token (65%), Art Card (35% — 5% Gold Stamped)."
        ]
    }
};

export function renderSetGuide(containerEl, setKey) {
    if (!containerEl) return;

    const guideData = DROP_RATE_GUIDES[setKey];
    if (!guideData) {
        containerEl.style.display = 'none';
        containerEl.innerHTML = '';
        return;
    }

    containerEl.innerHTML = `
        <article id="archive-guide-${setKey}" class="static-set-guide">
            <h3 style="font-size: 1.25rem; color: #df9845; margin-bottom: 0.75rem;">${guideData.title}</h3>
            <ul style="padding-left: 1.25rem; font-size: 0.95rem;">
                ${guideData.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </article>
    `;
    containerEl.style.display = 'block';
}