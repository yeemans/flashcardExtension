let createDeckButton = document.getElementById("createDeckButton");
createDeckButton.addEventListener("click", function() {
  let title = document.getElementById("deckTitle").value;

  if (deckAlreadyCreated(title)) {
    document.getElementById("errorMessage").innerText = "Deck already exists.";
    return; 
  }

  localStorage.setItem(title, JSON.stringify( {"cards": []} )); // empty array for cards
  goHome();
})

function deckAlreadyCreated(title) {
    return (localStorage.getItem(title) !== null);
}

function goHome() {
    window.location.href = "index.html";
}