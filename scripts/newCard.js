// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    let frontInput = document.getElementById("frontInput");
    if (message.isFront) frontInput.value = message.cardText;    

    let backInput = document.getElementById("backInput");
    if (!message.isFront) backInput.value = message.cardText; 
});

chrome.runtime.sendMessage({ action: 'popupOpen' });
// Handle popup close event
window.addEventListener('beforeunload', () => {
  chrome.runtime.sendMessage({ action: 'popupClose' });
});

function loadDeckSelect() {
  let deckSelect = document.getElementById("deckSelect");
  let deckPairs = []
  for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      value = JSON.parse(value); // get deck object, from string

      if (!value.hasOwnProperty("cards")) continue; // item in local storage that isnt a deck
      
      value = localStorage.getItem(key); // convert back to string
      deckPairs.push([key, value]);
  }

  for (let keyValuePair of deckPairs)
    addToDeckSelect(deckSelect, keyValuePair[0], keyValuePair[1]);
}

function addToDeckSelect(selectElement, deckName, deckList) {
  deckList = JSON.parse(deckList);
  if (!deckList.hasOwnProperty("cards")) return ""; // item in local storage that isnt a deck

  var deckOption = new Option(deckName, deckName);
  // Insert the new option at the beginning of the options array
  selectElement.appendChild(deckOption);
}

function addCustomOption() {
    const selectElement = document.getElementById('deckSelect');
    const customInput = document.getElementById('customInput');
  
    if (selectElement.value === 'custom' && customInput.value.trim() !== '') {
      const customOption = document.createElement('option');

      customOption.value = customInput.value;
      customOption.textContent = customInput.value;
      selectElement.appendChild(customOption);

      createNewDeck(customInput.value);
      toggleAddDeckVisibility(customInput.value);
      customInput.value = '';
    }
}

function toggleAddDeckVisibility(deckSelectValue) {
  const customInput = document.getElementById('customInput');
  const newDeckButton = document.getElementById('addNewDeckButton');

  if (deckSelectValue === 'custom') {
    customInput.style.display = 'inline-block';
    customInput.focus();
    newDeckButton.style.display = 'inline-block';
  } else {
    customInput.style.display = 'none';
    newDeckButton.style.display = 'none';
  }
}

document.getElementById("addNewDeckButton").addEventListener("click", function() {
    addCustomOption();
});
  
document.getElementById('deckSelect').addEventListener('change', function() {
  toggleAddDeckVisibility(this.value);
});

function createNewDeck(deckName) {
    if (deckAlreadyCreated(deckName)) {
        document.getElementById("statusMessage").innerText = "Deck already exists.";
        return; 
    }
    
    localStorage.setItem(deckName, JSON.stringify( {"cards": []} )); // empty array for cards
    document.getElementById("statusMessage").innerText = "New deck created!";

    // set the deckSelect to the new deck
    document.getElementById("deckSelect").value = deckName;
}

function deckAlreadyCreated(title) {
  return (localStorage.getItem(title) !== null);
}

function addCardToDeck() {
  let front = document.getElementById("frontInput").value;
  let back = document.getElementById("backInput").value;
  let selectedDeck = document.getElementById("deckSelect").value;
  
  let deck = JSON.parse(localStorage.getItem(selectedDeck));
  if (deck === "" || deck === null) return;
  let card = [front, back];
  
  deck["cards"].push(card);
  console.log(deck);
  console.log(deck["cards"]);
  localStorage.setItem(selectedDeck, JSON.stringify({"cards": deck["cards"]}));
}
document.getElementById("createCardButton").addEventListener("click", function() {
  addCardToDeck();
});

  
loadDeckSelect();