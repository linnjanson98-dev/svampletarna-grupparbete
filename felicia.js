


let allPairs = []; 
let index = 0; 

async function getList() { // bygger en funktion för att kunna hämta min json fil & göra om till JavaScript objekt
    try {
        const response = await fetch("speciellaEgenskaper.json"); // hämtar min json fil 

        if (!response.ok) { // om filen som hämtas inte är OK, hoppar då ner till catch som skickar ut felmeddelande i console log. 
            throw new Error("Något gick fel vid hämtning");
        }

        

        const data = await response.json(); // gör om json filen till ett JavaScript object

        allPairs = data.särskiljande_egenskaper; 
        console.log(allPairs[index]);

    

    } catch (error) { 
        console.error("Fel:", error); 
    }
}

getList(); // anropar funktion så att den börjar rulla