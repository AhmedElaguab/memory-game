/*
 * Create a list that holds all of your cards
 */

var cardsList = [...document.getElementsByClassName('card')];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle the list of cards
cardsList = shuffle(cardsList);

// Loop through each card and create its HTML
var fragment = document.createDocumentFragment();
for (var card of cardsList) {
    fragment.appendChild(card);
}

// Add each card's HTML to the page
var deck = document.querySelector('.deck');
deck.innerHTML = '';
deck.appendChild(fragment)

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// The *list* of "open" cards
var openCards = [];

// Increment the move counter & Change stars score Dynamically
var moves = 0;
var stars = document.getElementsByClassName('stars')[0];
var movesCounter = function () {

    moves += 1;

    // Display it on the page
    var movesEl = document.querySelector('.moves');
    movesEl.innerHTML = moves;

    // Change stars score Dynamically
    if (moves === 16) {

        stars.lastElementChild.remove();

    } else if (moves === 26) {

        stars.lastElementChild.remove();

    }

}

// Lock the cards in the open position function
function lockCards() {

    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    openCards = [];

}

// Hide the card's symbol function
function hideCardsSymbol() {

    setTimeout(function () {
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
    }, 550);

}

// Add the card to a *list* of "open" cards function
function addCard(clickedCard) {

    openCards.push(clickedCard);

    // Check to see if the two cards match
    if (openCards.length === 2 && openCards[0].dataset.card === openCards[1].dataset.card) {

        // Lock the cards in the open position
        lockCards();

        // Moves counter
        movesCounter();

    } else if (openCards.length === 2 && openCards[0].dataset.card !== openCards[1].dataset.card) {

        // Hide the card's symbol
        hideCardsSymbol();

        // Moves counter
        movesCounter();

    }

}

// Display the card's symbol function
function displayCard(clickedCard) {

    if (openCards.length < 2) {

        clickedCard.classList.add('open', 'show');

        // Add the card to a *list* of "open" cards
        addCard(clickedCard);

    }

}

// Set up the event listener for a card
deck.addEventListener('click', function (e) {

    // If a card is clicked
    if (e.target.nodeName === "LI" && !e.target.classList.contains('open') && !e.target.classList.contains('show')) {

        var clickedCard = e.target;

        // Display the card's symbol
        displayCard(clickedCard);

    }

})