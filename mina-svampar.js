// ==========================================
// 1. HTML-ELEMENT (Referenser till din HTML)
// ==========================================
const emptyStateSection = document.getElementById("empty-state");
const cardContainer = document.getElementById("card-container");
const clearButton = document.getElementById("clear-button");

// ==========================================
// 2. HÄMTA DATA
// ==========================================
function getSavedMushrooms() {
    const savedData = localStorage.getItem("savedMushrooms");
    if (savedData) {
        return JSON.parse(savedData);
    } else {
        return [];
    }
}

// ==========================================
// 3. KONTROLLERA SYNLIGHET
// ==========================================
function checkVisibility(savedMushroomsList) {
    if (savedMushroomsList.length === 0) {
        emptyStateSection.style.display = "block";
        cardContainer.style.display = "none";
        clearButton.style.display = "none";
    } else {
        emptyStateSection.style.display = "none";
        cardContainer.style.display = "grid";
        clearButton.style.display = "block";
    }
}

// ==========================================
// 4. BYGG SVAMPKORTEN PÅ SIDAN
// ==========================================
function renderSavedMushrooms() {
    const savedMushrooms = getSavedMushrooms();
    checkVisibility(savedMushrooms);
    cardContainer.innerHTML = "";

    savedMushrooms.forEach(svamp => {
        const article = document.createElement("article");

        const swedishName = document.createElement("h2");
        swedishName.textContent = svamp.svenskt_namn;
        article.appendChild(swedishName);

        const latinName = document.createElement("h3");
        latinName.textContent = svamp.latinskt_namn;
        article.appendChild(latinName);

        const imageMushroom = document.createElement("img");
        imageMushroom.src = "./svampar/" + svamp.bild.replace("./", "");
        imageMushroom.alt = "Bild av " + svamp.svenskt_namn;
        article.appendChild(imageMushroom);

        const descriptionMushroom = document.createElement("p");
        descriptionMushroom.textContent = svamp.beskrivning;
        article.appendChild(descriptionMushroom);

        const locationMushroom = document.createElement("p");
        locationMushroom.textContent = svamp.fyndplats;
        article.appendChild(locationMushroom);

        // --- HÄR ÄR KODEN SOM SKAPAR ETIKETTEN ---
        const badge = document.createElement("span");
        badge.classList.add("badge");

        const status = svamp.atlighet;

        if (status === "Ätlig") {
            badge.textContent = "✔ Ätlig";
            badge.classList.add("badge-atlig");
        } else if (status === "Giftig") {
            badge.textContent = "⚠ Giftig";
            badge.classList.add("badge-giftig");
        } else if (status === "Dödligt giftig") {
            badge.textContent = "⚠ Dödligt giftig";
            badge.classList.add("badge-dodlig");
        } else {
            badge.textContent = "⚖ Blandad";
            badge.classList.add("badge-blandad");
        }

        article.appendChild(badge);
        // ------------------------------------------

        cardContainer.appendChild(article);
    });
}

// ==========================================
// 5. TÖM-KNAPPEN (Radera allt, med bekräftelse)
// ==========================================
clearButton.addEventListener("click", () => {
    // Fråga användaren först! Returnerar true (OK) eller false (Avbryt)
    const isSure = window.confirm("Är du säker på att du vill ta bort alla dina sparade svampar?");

    // Om användaren klickade "OK", töm minnet och rita om sidan
    if (isSure) {
        localStorage.removeItem("savedMushrooms");
        renderSavedMushrooms();
    }
});

// ==========================================
// 6. KÖR ALLT NÄR SIDAN LADDAS
// ==========================================
window.onload = renderSavedMushrooms;