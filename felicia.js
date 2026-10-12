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

/*skapar en init funktion som anropar getList och sätter igång allting. Här lägger jag saker som ska köras direkt när sidan startar */
function init() {
    getList();
}


async function getList() { // bygger en funktion för att kunna hämta min json fil & göra om till JavaScript objekt
    try {
        const response = await fetch("speciellaEgenskaper.json"); // hämtar min json fil 

        if (!response.ok) { // om filen som hämtas inte är OK, hoppar då ner till catch som skickar ut felmeddelande i console log, men också på webbsidan */ 
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


function displayList() {

    /* hämtar ett par från allPairs arrayen med hjälp av index. Jag använder sedan mina element från html filen och lägger in texten i dom så att det
    visas på hemsidan.  
    Jag hämtar texten från json filen som jag hämtat i funktionen getList. Detta med hjälp av par, risk och särskiljande. Jag loopar sedan igenom 
    arrayen med särskiljande med hjälp av en forEach loop och skapar en lista med varje punkt i arrayen. Jag lägger till appendChild så att varje
    punkt läggs till sist i listan.*/
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

    /* för att få ut två par på sidan kör jag index plus 1.*/
    const rightPair = allPairs[index + 1]; 

    /* tömmer behållarna så att det inte finns något kvar från tidigare ifall det skulle komma in ett par till i json filen (att det skulle bli udda antal). 
    Jag vill inte att sidan skulle krascha om det tex är 11 par i json filen. 
    Så om (rightPair !== undefined) vilket betyder om rightPair inte är undefined fortsätt fylla sidan, om det däremot är undefined, så stannar if och inget syns på höger
    sida eftersom behållarna är tömda sedan tidigare. */
    rightTitle.textContent = ""; 
    rightRisk.textContent = "";
    rightList.textContent = "";

    if (rightPair !== undefined) {
        rightTitle.textContent = rightPair.par;
        rightRisk.textContent = rightPair.risk;

        const rightIdentify = rightPair.särskiljande;

        rightIdentify.forEach(item => {

            const li = document.createElement("li");
            li.textContent = item;
            rightList.appendChild(li);
        });
    }
    nextButton.disabled = (index >= allPairs.length - 2); // knappen blir grå när index är större eller lika med längden på allPairs - 2 eftersom jag vill visa två par.
    prevButton.disabled = (index <= 0); // knappen blir grånär index är 0 eller mindre,
}



/* bygger en funktion som visar två stycken par från json filen åt gången, när man klickar på knappen nextButton så kommer index öka
med 2 och visa nästa två par. Om index är lika med eller större än längden på allPairs minus 2 så kommer knappen inte fungera längre, 
alltså ingenting händer när man trycker och den blir grå eftersom jag gjort disabled i displayList. */
function nextPair() {
    if (index < allPairs.length - 2) {
        index += 2;
        displayList();
    }
}

/* lägger till en eventlyssnare till min knapp som jag byggt i html & som anropar funktionen nextPair när man klickar på den. */
nextButton.addEventListener("click", nextPair);

/* bygger en funktion som gör att man kan gå tillbaka till föregående sida. Så när man klickar på knappen prevButton så går man tillbaka två par. 
När index är 0 eller mindre så kommer knappen inte fungera längre, 
alltså ingenting händer när man trycker och den blir grå eftersom jag gjort disabled i displayList. */
function prevPair() {
    if (index > 0) {
        index -= 2;
        displayList();
    }
}
/* lägger till en eventlyssnare till min knapp som jag byggt i html & som anropar funktionen prevPair när man klickar på den. */
prevButton.addEventListener("click", prevPair);

/*säger till att så fort sidan laddats klart så ska init köras */
window.onload = init;