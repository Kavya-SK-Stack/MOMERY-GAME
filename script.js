

const cards = document.querySelectorAll(".memory-card");

let hasflippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle("flip");
    
    if (!hasflippedCard) {
        //first click

        hasflippedCard = true;
        firstCard = this;
        return;
    } 
        // second click
        hasflippedCard = false;
        secondCard = this;

        checkForMatch();
            
    
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework ===
        secondCard.dataset.framework;
    
    isMatch ? disableCards() : unflipCards();
    

}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      lockBoard = false;
      resetBoard();
  }, 500);
}


function resetBoard() {
    [hasflippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
        
    });
   
})();
 

function restartGame() {

  cards.forEach((card) => {
    card.classList.remove("flip"); 
    card.addEventListener("click", flipCard); 
  });

  resetBoard();
  shuffle();
}

 document.getElementById("restartBtn").addEventListener("click", restartGame);

cards.forEach((card) => card.addEventListener("click", flipCard));

 