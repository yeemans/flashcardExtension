let lastOpenedPopupId = null;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'popupOpen') {
    lastOpenedPopupId = sender.tab.id;
  } else if (message.action === 'popupClose') {
    lastOpenedPopupId = null;
  }
});

// options to send highlighted text to front or back of flashcard
function createRadioContextMenu() {
    // Create the first radio option
    chrome.contextMenus.create({
        id: "front",
        title: "Send to front",
        contexts: ["selection"]
    });

    // Create the second radio option
    chrome.contextMenus.create({
        id: "back",
        title: "Send to back",
        contexts: ["selection"]
    });
}

function showExtensionPopup(cardText, isFront) {
    if (lastOpenedPopupId === null) {
        chrome.windows.create({
            url: "newCard.html",
            type: "popup",
            width: 400,
            height: 400
        }, function(window) {
            // send message to new tab
            setTimeout(function() {
                chrome.tabs.sendMessage(window.tabs[0].id, {
                    cardText: cardText,
                    isFront: isFront
                });
            }, 200); // 0.2 second delay to load popup.js first
        });
    } else {
        // send message to existing tab
        setTimeout(function() {
            chrome.tabs.sendMessage(lastOpenedPopupId, {
                cardText: cardText,
                isFront: isFront
            });
        }, 100); // 0.1 second delay to load popup.js first
    }
}

// Add event listener to create radio type context menu items when extension is installed
chrome.runtime.onInstalled.addListener(createRadioContextMenu);
// Add event listener for clicks on the context menu items
chrome.contextMenus.onClicked.addListener(function(message, sender, sendResponse) {
    // Check which option was clicked and perform corresponding action
    switch (message.menuItemId) {
        case "front":
            showExtensionPopup(message.selectionText, true);
            break;
        case "back":
            showExtensionPopup(message.selectionText, false);
            break;
    }
});
