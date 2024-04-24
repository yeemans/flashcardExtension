function setHeading() {
    let pageHeading = document.getElementById("header");
    let deckName = window.location.search.split("=")[1].replace("%20", " ")
    pageHeading.innerText = `Review ${deckName}`;
    shuffleDeck(deckName);
}

function shuffleDeck(deckName) {
    let cards = localStorage.getItem(deckName);
    cards = JSON.parse(cards);
    cards = shuffleArray(cards["cards"]);
    showDeck(cards);
}

let deckIndex = 0;
function showDeck(cards) {
    console.log(cards);
    let frontText = cards[deckIndex][0];
    let backText = cards[deckIndex][1];
    let cardId = cards[deckIndex][2];

    document.getElementById("cardFront").innerHTML = 
    `<p id=${cardId} data-back=${backText}>${frontText}</p>`;
    addCorrectnessCheck(cardId);
}

function addCorrectnessCheck(cardId) {
    let checkAnswerButton = document.getElementById("checkAnswerButton");
    let correctAnswer = document.getElementById(cardId).dataset.back;
    let correctness = document.getElementById("correctnessStatus");

    checkAnswerButton.addEventListener("click", function() {
        let userResponse = document.getElementById("userResponse").value;
        if (cleanString(userResponse) === cleanString(correctAnswer)) {
            correctness.innerText = "CORRECT";
        } else {
            correctness.innerText = "WRONG";
        }
    })
}

function cleanString(str) {
    console.log(str);
    // Use a regular expression to remove non-alphanumeric characters and punctuation
    return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements at positions i and j
    }
    return array;
}

setHeading();