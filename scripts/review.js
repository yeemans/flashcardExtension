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
    addShowAnswerButton(cards);
    addPreviousCardButton(cards);
}

let deckIndex = 0;
function showDeck(cards) {
    let frontText = cards[deckIndex][0];
    let backText = cards[deckIndex][1];
    let cardId = cards[deckIndex][2];

    document.getElementById("cardFront").innerHTML = 
    `<p id=${cardId} data-back=${backText}>${frontText}</p>`;
    addCorrectnessCheck(backText, cards);
}

function addCorrectnessCheck(correctAnswer, deck) {
    let checkAnswerButton = document.getElementById("checkAnswerButton");
    let correctness = document.getElementById("correctnessStatus");

    checkAnswerButton.onclick = function() {
        let userResponse = document.getElementById("userResponse").value;
        if (cleanString(userResponse) === cleanString(correctAnswer)) {
            goToNextCard(correctness, deck);
        } else {
            correctness.innerText = "WRONG";
        }
    }
}

function goToNextCard(correctness, deck) {
    correctness.innerText = ""; // clear "WRONG" if needed
    if ( (deckIndex + 1) < deck.length) {
        deckIndex++;
        showDeck(deck);
        // reset user input to blank box
        document.getElementById("userResponse").value = "";
        return;
    } 

    // user has reviewed every card if condition is false
    showFinishedReviewing(deck);
}

function showFinishedReviewing(deck) {
    deckIndex = 0;
    showDeck(deck)
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

function addShowAnswerButton(cards) {
    document.getElementById("showAnswerButton").addEventListener("click", function() {
        // show the answer
        let cardId = cards[deckIndex][2];
        let card = document.getElementById(cardId);
        document.getElementById("userResponse").value = card.dataset.back; 
    })
}

function addPreviousCardButton(deck) {
    document.getElementById("previousCardButton").addEventListener("click", function() {
        deckIndex--;
        // wrap around deck
        if (deckIndex === -1) deckIndex = deck.length - 1;
        showDeck(deck);

        // wipe WRONG
        document.getElementById("correctnessStatus").innerText = "";
    })
}
setHeading();

