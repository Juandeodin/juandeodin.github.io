const cards = document.querySelectorAll(".card");
const confettiContainer = document.getElementById("confetti-container");
const playAgainBtn = document.getElementById("play-again");
const flipSound = new Audio("sounds/flipcard.mp3");
playAgainBtn.addEventListener("click", () => window.location.reload());
let timeOut = 1000;

// Cargar facts 
let facts = [];
fetch('questions/facts.json')
  .then(res => res.json())
  .then(data => { facts = data; });

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchesFound = 0;
const totalPairs = 8;

// Add an event listener to each card
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

document.addEventListener("DOMContentLoaded", () => {
  shuffle();
});

function flipCard() {
  if (lockBoard || this === firstCard) return;
 
  this.classList.add("flipped");
  this.classList.add("flip");
  flipSoundPlay();

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;

    checkForMatch();
  }
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}

function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function disableCards() {
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  setTimeout(() => {
      showFactModal();
      firstCard.remove();
      secondCard.remove();
  }, 500);
  matchesFound++;

  if (matchesFound === totalPairs) showConfetti();

  resetBoard();
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function startConfetti() {

    function createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Random size
        const sizeClass = ['small', 'medium', 'large'][Math.floor(Math.random() * 3)];
        confetti.classList.add(sizeClass);

        // Random shape - add 'circle' only if needed
        if (Math.random() > 0.5) {
            confetti.classList.add('circle');
        }

        // Random color
        const confettiColors = ['#FFC107', '#2196F3', '#FF5722', '#4CAF50', '#E91E63'];
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];

        // Random horizontal position
        confetti.style.left = `${Math.random() * 100}vw`;

        // Random animation delay
        confetti.style.animationDelay = `${Math.random() * 2}s`;

        confettiContainer.appendChild(confetti);

        // Remove confetti after animation ends
        confetti.addEventListener('animationend', () => confetti.remove());
    }

    // Generate multiple confetti pieces
    for (let i = 0; i < 1000; i++) {
        createConfettiPiece();
    }
}



function showConfetti() {
    startConfetti(); // Call the confetti animation
    playAgainBtn.style.display = 'block'; // Show the play again button
    document.getElementById('congratulations').style.display = 'block'; // Show the congratulations message
}

function flipSoundPlay() {
     if(flipSound) {
    flipSound.pause();
    flipSound.currentTime = 0;
    flipSound.play(); // Play flip sound
  }
}


function showFactModal() {
    if (facts.length === 0) return;
    const fact = facts[Math.floor(Math.random() * facts.length)];
    let modal = document.getElementById('fact-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'fact-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.6)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '2000';
        modal.innerHTML = `
          <div style="background:#fff8e1; border-radius:16px; padding:32px 24px; max-width:400px; box-shadow:0 4px 24px #0003; text-align:center; position:relative;">
            <div style="font-size:1.2em; margin-bottom:16px; color:#333;">Dato curioso</div>
            <div id="fact-modal-text" style="font-size:1em; color:#222; margin-bottom:24px;"></div>
            <button id="close-fact-modal" style="padding:8px 24px; font-size:1em; background:#0b8bff; color:#fff; border:none; border-radius:6px; cursor:pointer;">Cerrar</button>
          </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('close-fact-modal').onclick = () => {
            modal.style.display = 'none';
        };
    } else {
        modal.style.display = 'flex';
    }
    document.getElementById('fact-modal-text').textContent = fact;
}

function aumentarTimer() {
  timeOut += 500;
}

