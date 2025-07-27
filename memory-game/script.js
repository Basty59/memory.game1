const board = document.getElementById('gameBoard');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const restartBtn = document.getElementById('restart');

// Sounds
const flipSound = new Audio('sounds/flip.mp3');
const matchSound = new Audio('sounds/match.mp3');

const imagePaths = [
  'images/img1.jpg',
  'images/img2.jpg',
  'images/img3.jpg',
  'images/img4.jpg',
  'images/img5.jpg',
  'images/img6.jpg',
  'images/img7.jpg',
  'images/img8.jpg'
];

let flippedCards = [];
let matched = [];
let score = 0;
let time = 0;
let timer = null;
let gameStarted = false;

function startTimer() {
  if (!gameStarted) {
    gameStarted = true;
    timer = setInterval(() => {
      time++;
      timerEl.textContent = `Time: ${time}s`;
    }, 1000);
  }
}

function resetGame() {
  board.innerHTML = '';
  flippedCards = [];
  matched = [];
  score = 0;
  time = 0;
  gameStarted = false;
  clearInterval(timer);
  timerEl.textContent = 'Time: 0s';
  scoreEl.textContent = 'Score: 0';

  let cards = [...imagePaths, ...imagePaths].sort(() => 0.5 - Math.random());

  cards.forEach((imgSrc) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imgSrc;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url('${imgSrc}')`;

    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);
    board.appendChild(card);

    card.addEventListener('click', () => {
      if (
        flippedCards.length < 2 &&
        !flippedCards.includes(card) &&
        !matched.includes(card)
      ) {
        flipSound.play();
        startTimer();
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          const [first, second] = flippedCards;
          if (first.dataset.image === second.dataset.image) {
            matched.push(first, second);
            flippedCards = [];
            score++;
            scoreEl.textContent = `Score: ${score}`;
            matchSound.play();
            if (matched.length === 16) {
              clearInterval(timer);
              setTimeout(() => alert(`🎉 You win! Time: ${time}s, Score: ${score}`), 500);
            }
          } else {
            setTimeout(() => {
              first.classList.remove('flipped');
              second.classList.remove('flipped');
              flippedCards = [];
            }, 1000);
          }
        }
      }
    });
  });
}

// Start game
resetGame();
restartBtn.addEventListener('click', resetGame);


