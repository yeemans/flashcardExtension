// Function to parse URL parameters
function setDeckName() {
    // window.location.search is of the form ?deckName=${deckName}
    let pageHeading = document.getElementById("deckTitle");
    pageHeading.innerText = window.location.search.split("=")[1];
    showCards(pageHeading.innerText);
    showEditAndDeleteCards(pageHeading.innerText);
    addEditingToCards(pageHeading.innerText);
    addDeletingToCards(pageHeading.innerText);
}

function showCards(deckName) {
    let cardsContainer = document.getElementById("cardsContainer");
    let cards = localStorage.getItem(deckName);
    cards = JSON.parse(cards);
    
    // cards is a dictionary {"cards:" arrayOfCards}

    for (let frontAndBackAndId of cards["cards"]) {
        let front = frontAndBackAndId[0];
        let back = frontAndBackAndId[1];
        let id = frontAndBackAndId[2];
        let cardDiv = `<div class="flashcard" id=slideDiv${id}> <p id=slideshow${id} data-front="${front}" data-back="${back}">${front}</p> </div>`;
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

// slideshow javascript
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("flashcard");
  if (slides.length === 0) return;

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

document.querySelector(".prev").addEventListener("click", function() {
    plusSlides(-1);
})

document.querySelector(".next").addEventListener("click", function() {
    plusSlides(1);
})

function showEditAndDeleteCards(deckName) {
    let container = document.getElementById("editAndDeleteCardsContainer");
    let cards = localStorage.getItem(deckName);
    cards = JSON.parse(cards);
    // cards is a dictionary {"cards:" arrayOfCards}

    for (let frontAndBackAndId of cards["cards"]) {
        let front = frontAndBackAndId[0];
        let back = frontAndBackAndId[1];
        let id = frontAndBackAndId[2];


        let cardDiv = `
        <div class="container" id=${id} data-front="${front}" data-back="${back}"> 
            <input type="text" class="editableCard" value="${front}" id=${id}front /> 
            <input type="text" class="editableCard" value="${back}" id=${id}back /> 
            <button class="deleteCardButton">Delete</button>
        </div>`;
        container.innerHTML += cardDiv;
    }
}

function addEditingToCards(deckName) {
    let editableCards = document.querySelectorAll(".editableCard");
    for (let card of editableCards) {
        card.addEventListener("change", function() {
            let cardId = this.parentNode.id;
            let front = document.getElementById(`${cardId}front`).value;
            let back = document.getElementById(`${cardId}back`).value;

            saveCardChangesToLocalStorage(deckName, front, back, cardId);
            saveChangesToSlideshow(cardId, front, back);
        })
    }
}

function saveCardChangesToLocalStorage(deckName, front, back, cardId) {
    let deck = JSON.parse(localStorage.getItem(deckName));
    for (let card of deck["cards"]) {
        // card[2] is the card's id
        if (card[2] == cardId) {
            card[0] = front;
            card[1] = back;
        }
    }

    localStorage.setItem(deckName, JSON.stringify({"cards": deck["cards"]}));
}

function saveChangesToSlideshow(cardId, front, back) {
    let card = document.getElementById(`slideshow${cardId}`);

    if (card.innerText === card.dataset.front) card.innerText = front;
    if (card.innerText === card.dataset.back) card.innerText = back;
    card.dataset.front = front;
    card.dataset.back = back;
}

function addDeletingToCards(deckName) {
    let deleteButtons = document.querySelectorAll(".deleteCardButton");

    for (let button of deleteButtons) {
        button.addEventListener("click", function() {
            let cardId = this.parentNode.id;

            deleteFromLocalStorage(deckName, cardId);
            deleteFromSlideshow(cardId);
        })
    }
}

function deleteFromLocalStorage(deckName, cardId) {
    let deck = JSON.parse(localStorage.getItem(deckName));
    // delete card from deck
    deck["cards"] = deck["cards"].filter(function(card) { return card[2] != cardId; })
    localStorage.setItem(deckName, JSON.stringify({"cards": deck["cards"]}));
}

function deleteFromSlideshow(cardId) {
    plusSlides(1); // go to next slide
    // delete this slide
    let cardTextBoxes = document.getElementById(cardId);
    let slide = document.getElementById(`slideDiv${cardId}`);
    cardTextBoxes.remove();
    slide.remove();
}

