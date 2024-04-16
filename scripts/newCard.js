// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    let frontInput = document.getElementById("frontInput");
    if (message.isFront) frontInput.value = message.frontText;    

    let backInput = document.getElementById("backInput");
    if (!message.isFront) backInput.value = message.backText; 
});


