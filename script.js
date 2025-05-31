//light in the dark
const lightCircle = document.getElementById('light-circle');
const gameSection = document.getElementById('divG');

document.addEventListener('mousemove', (event) => {
    const rect = gameSection.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    
    lightCircle.style.left = `${offsetX - (lightCircle.offsetWidth / 2)}px`;
    lightCircle.style.top = `${offsetY - (lightCircle.offsetHeight / 2)}px`;
});

// Get modal element
var modal = document.getElementById("myModal");
var modal1 = document.getElementById("myModal1");

// Get button that opens the modal
var btn = document.getElementById("Credits");
var btn1 = document.getElementById("help");

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close")[0];
var closeBtn1 = document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

btn1.onclick = function() {
  modal1.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

closeBtn1.onclick = function() {
  modal1.style.display = "none";
}
 
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
window.onclick = function(event) {
  if (event.target == modal1) {
      modal1.style.display = "none";
    }  
  }




// when the user clicks on Startgame page changes div 
var STRbtn = document.getElementById("Startgame");
var p1 = document.getElementById("1stpage");
var GAnim1 = document.getElementById("animation1");
var GAnim2 = document.getElementById("animation2");
var Anywh = document.getElementById("anywhere");
var Dbtn = document.getElementById("door");
var Gdiv = document.getElementById("divG");

STRbtn.addEventListener("click",()=>{
  p1.style.display = "none";
  GAnim1.style.display = "block";
});

// when the user clicks anywhere inside the page changes div 
Dbtn.addEventListener("click",()=>{ 
  GAnim1.style.display = "none";
  GAnim2.style.display = "block";
});

// when the user clicks on the doorway page changes div 
Anywh.addEventListener("click",()=>{
  GAnim2.style.display = "none";
  Gdiv.style.display = "block";
});




//Get divG elements
const cards = document.querySelectorAll('.grid-item');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0; // Counter for matched pairs
let totalPairs = cards.length / 2; // Total pairs in the game
let startTime, endTime; // Timer variables
let timerStarted = false; // To ensure the timer starts only once

// Shuffle cards on refresh
(function shuffle() {
  cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
  });
})();

// Flip card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    // Start the timer when the first card is flipped
    if (!timerStarted) {
      startTime = new Date();
      timerStarted = true;
    }

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
}

// Check if the cards match
function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? disableCards() : unflipCards();
}

// If cards match, disable them
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++; // Increase the matched pairs counter

    // Check if all cards are matched
    if (matchedPairs === totalPairs) {
        endGame();
    }

    resetBoard();
}

// If cards don't match, flip them back
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 800);
}

// Reset the board state
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// End the game and display time
function endGame() {
    endTime = new Date();
    let timeSpent = (endTime - startTime) / 1000; // Time in seconds
    lastDiv();
    alert(`you've completed the game in ${timeSpent} seconds! Refresh the page to restart the game`);
}

// change last div
var fin = document.getElementById("finale");
function lastDiv() {
  Gdiv.style.display = "none";
  fin.style.display = "block";
}

// Add event listeners to cards
cards.forEach(card => card.addEventListener('click', flipCard));
