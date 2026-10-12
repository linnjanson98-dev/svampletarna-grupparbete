let sectionRef;
const savedMushrooms = [];

function init(){
    //Ladda in sidan och starta 
    sectionRef = document.querySelector("section");
    
    fetchData();
    //localStorage.clear();
}

window.onload = init;

async function fetchData(){
    //Hämta svampar.json
    try{
        const response = await fetch("svampar.json");
        const data = await response.json();
        createArticle(data);
    }
    catch(error){
        console.error("Error fetching data:", error);
    }

}

function createArticle(data){
    //Loopa svampar.json och skapa artiklar för varje svamp
    //Möjligtvis en function för att skapa elementen? 
    //Även add event listeners för att kunna spara svampar på sin sida
    data.svampar.forEach(svamp => {
        const article = document.createElement("article");
        //Skapa element för svampens namn, bild, beskrivning och fyndplats.
        let swedishName = createElement("h2", svamp.svenskt_namn);
        article.appendChild(swedishName);

        let latinName = createElement("h2", svamp.latinskt_namn);
        article.appendChild(latinName);

        let imageMushroom = document.createElement("img");
        imageMushroom.src = "./svampar/" + svamp.bild.replace("./", ""); //Json-filen hade inte mappnamnet så la till det här för att kunna få tag på bilderna. 
        imageMushroom.alt = "Bild av " + svamp.svenskt_namn;
        article.appendChild(imageMushroom);

        let descriptionMushroom = createElement("p", svamp.beskrivning);
        article.appendChild(descriptionMushroom);

        let locationMushroom = createElement("p", svamp.fyndplats);
        article.appendChild(locationMushroom);
        
        saveArticleButton(svamp, article);
        sectionRef.appendChild(article);
    });
}

function createElement(elementType, textContent){
    const element = document.createElement(elementType);
    element.textContent = textContent;
    return element;
}

function saveArticleButton(svamp, article){
    const saveButton = document.createElement("button");
    let savedMushrooms = JSON.parse(localStorage.getItem("savedMushrooms")) || [];
    if (!checkIfSaved(svamp, savedMushrooms)) {
        saveButton.textContent = "Spara";
    } else {
        saveButton.textContent = "Sparad";
    }
    article.appendChild(saveButton);

    saveButton.addEventListener("click", () => {
        if (!checkIfSaved(svamp, savedMushrooms)) {
            savedMushrooms.push(svamp);
            localStorage.setItem("savedMushrooms", JSON.stringify(savedMushrooms));
            saveButton.textContent = "Sparad";
        }
       /* else{
            saveButton.textContent = "Sparad";
        } behövs nog inte här eftersom jag redan gör så att det står "Sparad" innan add event listener,
          eller ska den ändra till "Redan Sparad"  */

    });
}

function checkIfSaved(svamp, savedMushrooms){
    if (savedMushrooms.some(saved => saved.latinskt_namn === svamp.latinskt_namn)) {
        return true;
    }
    return false;
}