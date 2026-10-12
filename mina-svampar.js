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
        return JSON.parse(savedData); // Här ligger nu Linns hela objekt
    } else {
        return [];
    }
}

// ==========================================
// 3. KONTROLLERA SYNLIGHET (Visa tomt eller listan)
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
    // 1. Hämta Linns sparade svampar
    const savedMushrooms = getSavedMushrooms();

    // 2. Bestäm vad som ska visas (Tomt läge eller kort)
    checkVisibility(savedMushrooms);

    // 3. Töm listan innan vi bygger nya kort (så vi slipper dubbletter om sidan uppdateras)
    cardContainer.innerHTML = "";

    // 4. Loopa igenom varje sparad svamp och skapa HTML
    savedMushrooms.forEach(svamp => {
        const article = document.createElement("article");

        const swedishName = document.createElement("h2");
        swedishName.textContent = svamp.svenskt_namn;
        article.appendChild(swedishName);

        const latinName = document.createElement("h3"); // Kör h3 här för designens skull
        latinName.textContent = svamp.latinskt_namn;
        article.appendChild(latinName);

        const imageMushroom = document.createElement("img");
        // Använder samma logik för sökväg som Linn gjorde
        imageMushroom.src = "./svampar/" + svamp.bild.replace("./", "");
        imageMushroom.alt = "Bild av " + svamp.svenskt_namn;
        article.appendChild(imageMushroom);

        const descriptionMushroom = document.createElement("p");
        descriptionMushroom.textContent = svamp.beskrivning;
        article.appendChild(descriptionMushroom);

        const locationMushroom = document.createElement("p");
        locationMushroom.textContent = svamp.fyndplats;
        article.appendChild(locationMushroom);

        // Stoppa in det färdiga kortet i vår grid
        cardContainer.appendChild(article);
    });
}

// ==========================================
// 5. TÖM-KNAPPEN (Radera allt)
// ==========================================
clearButton.addEventListener("click", () => {
    // Ta bort nyckeln helt från minnet
    localStorage.removeItem("savedMushrooms");

    // Rita om sidan (vilket nu kommer visa tomt-läget eftersom minnet är borta)
    renderSavedMushrooms();
});

// ==========================================
// 6. KÖR ALLT NÄR SIDAN LADDAS
// ==========================================
window.onload = renderSavedMushrooms;