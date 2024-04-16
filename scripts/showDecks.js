function showDecks() {
    let deckDiv = document.getElementById("deckDiv");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        deckDiv.innerHTML += getDeckHTML(key, value);
    }
}

function getDeckHTML(deckName, deckList) {
    deckList = JSON.parse(deckList);
    if (!deckList.hasOwnProperty("cards")) return ""; // item in local storage that isnt a deck
    return `<div> <a href=showDeck.html?deckName=${deckName}>${deckName}</a> </div>`;
}

showDecks();