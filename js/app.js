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

// Declare the global variables
var timeEl = document.querySelector('.time');
var movesEl = document.querySelector('.moves');
var deck = document.querySelector('.deck');
var stars = document.getElementsByClassName('stars')[0];

// Start Game!
restartGame();


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

// display a message with the final score
var matchedCards = 0;
var congrate = function () {

    var congrateEl = document.querySelector('.congrate-wrapper');
    var starsNumber = document.querySelector('.stars-number');
    var movesValue = document.querySelector('.moves-value');
    var timeValue = document.querySelector('.time-value');
    starsNumber.textContent = stars.children.length;
    movesValue.textContent = moves;
    timeValue.textContent = timeEl.textContent;
    congrateEl.style.display = 'flex';

    // Clear the timer
    clearInterval(timeInit);

};

// Timer Initialization
var timeInit;
var startTiming = true;
var timeEl = document.querySelector('.time');

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

        // Display the final score message
        matchedCards += 1;
        if (matchedCards === 8) {
            congrate();
        }

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

        // Start the timer
        if (startTiming === true) {

            timeInit = setInterval(function () {

                timeEl.textContent = Number(timeEl.textContent) + 1;

            }, 1000);

            startTiming = false;
        }

        // Display the card's symbol
        displayCard(clickedCard);

    }

})


// Restart the game
var restartBtn = document.querySelector('.restart');

function restartGame() {

    // Shuffle the list of cards
    cardsList = shuffle(cardsList);

    // Loop through each card and create its HTML
    var fragment = document.createDocumentFragment();
    for (var card of cardsList) {

        if (card.classList.contains('open')) {
            card.classList.remove('open');
        }

        if (card.classList.contains('show')) {
            card.classList.remove('show');
        }

        if (card.classList.contains('match')) {
            card.classList.remove('match');
        }

        fragment.appendChild(card);
    }

    // Add each card's HTML to the page
    var deck = document.querySelector('.deck');
    deck.innerHTML = '';
    deck.appendChild(fragment);

    // Clear the timer
    clearInterval(timeInit);
    timeEl.textContent = 0;
    startTiming = true;

    // Reset the move counter
    movesEl.textContent = 0;
    moves = 0;

    // Reset the stars score
    stars.innerHTML = '<li><i class="fa fa-star"></i></li>' +
        '<li><i class="fa fa-star"></i></li>' +
        '<li><i class="fa fa-star"></i></li>';

    // Reset the matched cards score
    matchedCards = 0;

}

restartBtn.addEventListener('click', function () {

    restartGame();

});

// Add event listener for the restart game button in the score final message
var finalScoreRestartBtn = document.querySelector('.btn');

finalScoreRestartBtn.addEventListener('click', function () {

    restartGame();
    var congrateEl = document.querySelector('.congrate-wrapper');
    congrateEl.style.display = 'none';

});
