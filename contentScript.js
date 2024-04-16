// Add event listener to detect text selection
document.addEventListener('mouseup', function() {
    var selectedText = window.getSelection().toString().trim();
    if (selectedText !== '') {
        chrome.runtime.sendMessage({ openExtension: true, selectedText: selectedText });
    }
});