const icons = ['😂', '😊', '🤣', '❤️', '😍', '😒', '👌', '😘'];
let cards = [...icons, ...icons].sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

cards.forEach(icon => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = icon;
  card.addEventListener('click', () => flipCard(card));
  gameBoard.appendChild(card);
});

function flipCard(card) {
  if (lockBoard || card.classList.contains('flipped')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;
  if (firstCard.textContent === secondCard.textContent) {
    matchedPairs++;
    setTimeout(() => {
      alert('✔️ Match found!');
      resetTurn();
      if (matchedPairs === icons.length) {
        document.getElementById('status').textContent = '🎊 You Win!';
        alert('🎊 Congratulations! You matched all pairs!');
      }
    }, 200);
  } else {
    setTimeout(() => {
      alert('❌ Not a match!');
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 500);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
