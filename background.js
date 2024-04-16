/// options to send highlighted text to front or back of flashcard
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

function showExtensionPopup(frontText, backText, isFront) {
    chrome.windows.create({
        url: "newCard.html",
        type: "popup",
        width: 400,
        height: 400
    }, function(window) {
        // Delay sending message to ensure popup is ready
        setTimeout(function() {
            chrome.tabs.sendMessage(window.tabs[0].id, {
                frontText: frontText,
                backText: backText,
                isFront: isFront
            });
        }, 100); // 0.1 second delay to load popup.js first
    });
}

// Add event listener to create radio type context menu items when extension is installed
chrome.runtime.onInstalled.addListener(createRadioContextMenu);



// Add event listener for clicks on the context menu items
chrome.contextMenus.onClicked.addListener(function(message, sender, sendResponse) {
    // Check which option was clicked and perform corresponding action
    switch (message.menuItemId) {
        case "front":
            showExtensionPopup(message.selectionText, "", true);
            break;
        case "back":
            showExtensionPopup("", message.selectionText, false);
            break;
    }
});
