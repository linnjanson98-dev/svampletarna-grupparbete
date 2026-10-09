let allPairs = [];
let index = 0;

const button = document.getElementById("button");

function displayList() {
    console.log(allPairs[index]);
    console.log(allPairs[index + 1]);
}

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


function nextPair() {


    if (index < allPairs.length - 2) {
        index += 2;
        displayList();
    }

}
button.addEventListener("click", nextPair); 