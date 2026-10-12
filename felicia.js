/* skapar en tom array som startvärde för allPairs. Använder let eftersom att värdet kommer att bytas ut längre ner i koden. 
Arrayen är tom och kommer sedan kastas och bytas ut med data från json filen. 
Men jag behöver deklarera den här så att något värde finns ifall det tar tid för filen att läsas in, så att koden kan fortsätta.*/
let allPairs = []; 
/* skapar en variabel som säger att index börjar räkna från 0, använder let eftersom varibeln ändras när jag klickar på nästa eller tillbakaknapparna. */
let index = 0; 


/*hämtar element med id från min html fil, använder const eftersom elementet i min html fil aldrig kommer bytas ut, men innehållet i elementet kan ändras. */
const leftRisk = document.getElementById("leftRisk"); 
const leftTitle = document.getElementById("leftTitle"); 
const leftList = document.getElementById("leftIdentify"); 

const rightRisk = document.getElementById("rightRisk");  
const rightTitle = document.getElementById("rightTitle");
const rightList = document.getElementById("rightIdentify"); 

const prevButton = document.getElementById("prevButton"); 
const nextButton = document.getElementById("nextButton"); 

/* hämtar den tomma behållaren från min html & skriver sedan texten längre ner i js filen. Lägger texten i js eftersom den bara ska synas om något gör att json filen
inte kan läsas in. */

const somethingHappened = document.getElementById("somethingHappened");  



async function getList() { // bygger en funktion för att kunna hämta min json fil & göra om till JavaScript objekt
    try {
        const response = await fetch("speciellaEgenskaper.json"); // hämtar min json fil 

        if (!response.ok) { // om filen som hämtas inte är OK, hoppar då ner till catch som skickar ut felmeddelande i console log. 
            throw new Error("Något gick fel vid hämtning");
        }


        const data = await response.json(); // gör om json filen till ett JavaScript object

        allPairs = data.särskiljande_egenskaper;


        displayList();

    } catch (error) {
        console.error("Fel:", error);
        somethingHappened.textContent = "Något gick fel när sidan lästes in, försök igen senare.";
    }
}

getList(); // anropar funktion så att den börjar rulla


function displayList() {

    const leftPair = allPairs[index];
    leftTitle.textContent = leftPair.par;
    leftRisk.textContent = leftPair.risk;
    const leftIdentify = leftPair.särskiljande;

    leftList.textContent = "";
    leftIdentify.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        leftList.appendChild(li);
    });



    const rightPair = allPairs[index + 1];
    rightTitle.textContent = rightPair.par;
    rightRisk.textContent = rightPair.risk;

    const rightIdentify = rightPair.särskiljande;

    rightList.textContent = "";
    rightIdentify.forEach(item => {

        const li = document.createElement("li");
        li.textContent = item;
        rightList.appendChild(li);
    });
    nextButton.disabled = (index >= allPairs.length - 2); // knappen slutar funka när index är större eller lika med längden på allPairs - 2 eftersom jag vill visa två par.
    prevButton.disabled = (index <= 0); // knappen slutar funka när index är 0 eller mindre,

}

function nextPair() {
    if (index < allPairs.length - 2) {
        index += 2;
        displayList();
    }
}
nextButton.addEventListener("click", nextPair);


function prevPair() {
    if (index > 0) {
        index -= 2;
        displayList();
    }
}
prevButton.addEventListener("click", prevPair);