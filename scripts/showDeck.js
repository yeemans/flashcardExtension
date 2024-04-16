// Function to parse URL parameters
function setDeckName() {
    // window.location.search is of the form ?deckName=${deckName}
    let pageHeading = document.getElementById("deckTitle");
    pageHeading.innerText = window.location.search.split("=")[1];
}
setDeckName();

