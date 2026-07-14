// load-header.js
document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById("global-header");
    if (!headerContainer) return;

    // 1. Fetch your master layout template file
    fetch("header.html")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load header component asset.");
            return response.text();
        })
        .then(htmlContent => {
            // 2. Inject the complete layout structure straight onto the page
            headerContainer.innerHTML = htmlContent;

            // 3. Read the unique text values from the HTML page data attributes
            const mainTitleText = headerContainer.getAttribute("data-main") || "Collection Simulator";
            const subTitleText = headerContainer.getAttribute("data-sub") || "";

            // 4. Find the template elements and inject your text values cleanly
            const mainTitleEl = document.getElementById("header-main-title");
            const subTitleEl = document.getElementById("header-subtitle");
            const backLinkEl = headerContainer.querySelector(".back-link");

            if (mainTitleEl) mainTitleEl.innerHTML = mainTitleText;
            
            if (subTitleEl && subTitleText) {
                subTitleEl.innerHTML = ` &nbsp;&middot;&nbsp; ${subTitleText}`;
            }

            // 5. Hide the back arrow automatically if the user is on your central index dashboard
            const currentPath = window.location.pathname;
            if (currentPath.endsWith("index.html") || currentPath.endsWith("/")) {
                if (backLinkEl) backLinkEl.style.display = "none";
            }
        })
        .catch(err => console.error("Error running unified header layout assembly: ", err));
});