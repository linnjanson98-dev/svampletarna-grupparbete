let allPairs = [];
let index = 0;

const leftRisk = document.getElementById("leftRisk");
const leftTitle = document.getElementById("leftTitle");
const leftList = document.getElementById("leftIdentify");

const rightRisk = document.getElementById("rightRisk");
const rightTitle = document.getElementById("rightTitle");
const rightList = document.getElementById("rightIdentify");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");



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