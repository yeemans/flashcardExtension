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
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    console.log(i);
  }
  slides[slideIndex-1].style.display = "block";
}

document.querySelector(".prev").addEventListener("click", function() {
    plusSlides(-1);
})

document.querySelector(".next").addEventListener("click", function() {
    plusSlides(1);
})

