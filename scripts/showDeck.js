// Function to parse URL parameters
function setDeckName() {
    // window.location.search is of the form ?deckName=${deckName}
    let pageHeading = document.getElementById("deckTitle");
    pageHeading.innerText = window.location.search.split("=")[1];
    showCards(pageHeading.innerText);
}

function showCards(deckName) {
    let cardsContainer = document.getElementById("cardsContainer");
    let cards = localStorage.getItem(deckName);
    cards = JSON.parse(cards);
    
    // cards is a dictionary {"cards:" arrayOfCards}

    for (let frontAndBack of cards["cards"]) {
        let front = frontAndBack[0];
        let back = frontAndBack[1];
        let cardDiv = `<div class="flashcard"> <p data-front="${front}" data-back="${back}">${front}</p> </div>`;
        cardsContainer.innerHTML += cardDiv;
    }

    setFlashcardFlip();
}

// Get all elements with the specified class and attach event listeners using forEach
function setFlashcardFlip() {
    document.querySelectorAll(".flashcard").forEach(function(element) {
        element.addEventListener("click", function() {
            // Your click event handling code here
            console.log(this.children[0]);
            flipCard(this.children[0]);
        });
    });
}

function flipCard(flashcard) {
    if (flashcard.innerText === flashcard.dataset.front) {
        flashcard.innerText = flashcard.dataset.back;
    } else {
        flashcard.innerText = flashcard.dataset.front;
    }
}

setDeckName();

