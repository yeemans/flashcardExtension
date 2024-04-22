function showDecks() {
    let deckDiv = document.getElementById("deckDiv");
    Object.keys(localStorage).forEach(function(key) {
        const value = localStorage.getItem(key);
        deckDiv.innerHTML += getDeckHTML(key, value);
    })
}

function getDeckHTML(deckName, deckList) {
    deckList = JSON.parse(deckList);
    if (!deckList.hasOwnProperty("cards")) return ""; // item in local storage that isnt a deck
    console.log(deckName)
    return `<div> <a href=showDeck.html?deckName=${encodeURIComponent(deckName)}>${deckName}</a> </div>`;
}

showDecks();