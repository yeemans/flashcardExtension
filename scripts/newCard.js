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
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      deckPairs.push([key, value]);
  }

  deckPairs.sort(function(a, b) {
    return a[0] - b[0]; // Compare the first elements of each deckpair
  });

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
      customInput.value = '';
    }
}

document.getElementById("addNewDeckButton").addEventListener("click", function() {
    addCustomOption();
});
  
document.getElementById('deckSelect').addEventListener('change', function() {
    const customInput = document.getElementById('customInput');
    const newDeckButton = document.getElementById('addNewDeckButton');

    if (this.value === 'custom') {
      customInput.style.display = 'inline-block';
      customInput.focus();
      newDeckButton.style.display = 'inline-block';
    } else {
      customInput.style.display = 'none';
      newDeckButton.style.display = 'none';
    }
});

function createNewDeck(deckName) {
    if (deckAlreadyCreated(deckName)) {
        document.getElementById("statusMessage").innerText = "Deck already exists.";
        return; 
    }
    
    localStorage.setItem(deckName, JSON.stringify( {"cards": []} )); // empty array for cards
    document.getElementById("statusMessage").innerText = "New deck created!";
}

function deckAlreadyCreated(title) {
  return (localStorage.getItem(title) !== null);
}
  
loadDeckSelect();