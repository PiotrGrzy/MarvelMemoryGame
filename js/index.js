const board = document.querySelector(".game__board");
const turnsDisplay = document.querySelector(".header__turns");
const remaining = document.querySelector(".header__remaining");
const gameWon = document.querySelector(".game__won");
const newGameBtn = document.querySelector(".game__btn");

const cards = [
  { name: "avengers", id: 0 },
  { name: "black-widow", id: 1 },
  { name: "captain-america", id: 2 },
  { name: "captain-marvel", id: 3 },
  { name: "gamora", id: 4 },
  { name: "groot", id: 5 },
  { name: "hawkey", id: 6 },
  { name: "iron-man", id: 7 },
  { name: "panther", id: 8 },
  { name: "quill", id: 9 },
  { name: "rocket", id: 10 },
  { name: "spiderman", id: 11 },
  { name: "thanos", id: 12 },
  { name: "thor", id: 13 },
  { name: "avengers", id: 14 },
  { name: "black-widow", id: 15 },
  { name: "captain-america", id: 16 },
  { name: "captain-marvel", id: 17 },
  { name: "gamora", id: 18 },
  { name: "groot", id: 19 },
  { name: "hawkey", id: 20 },
  { name: "iron-man", id: 21 },
  { name: "panther", id: 22 },
  { name: "quill", id: 23 },
  { name: "rocket", id: 24 },
  { name: "spiderman", id: 25 },
  { name: "thanos", id: 26 },
  { name: "thor", id: 27 }
];

let currentCard = null;
let turns = 0;
let cardsRemoved = 0;

const newGame = () => {
  currentCard = null;
  turns = 0;
  cardsRemoved = 0;
  board.innerHTML = "";
  turnsDisplay.textContent = `Turns: ${turns}`;
  remaining.textContent = `Remaining cards: ${28 - cardsRemoved}`;
  gameWon.style.display = "none";
  showCards();
};

const endGame = () => {
  gameWon.style.display = "block";
};

const getRandomCard = cards => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return randomIndex;
};

// Generate single card
const generateCard = card => {
  const mockup = `
                   <div class="game__card" data-name = ${card.name}>
                    <img src="assets/cards/${card.name}.jpg" alt="Marvel-card" class="game__card-img" data-name = ${card.name} data-id = ${card.id}>
                </div>
        `;
  return mockup;
};

// Set opacity to 0, for 2 matched cards
const removeCards = name => {
  const cardsToRemove = document.querySelectorAll(
    `.game__card[data-name=${name}]`
  );

  cardsToRemove.forEach(card => {
    setTimeout(() => (card.style.opacity = "0"), 500);
    cardsRemoved++;
    remaining.textContent = `Remaining cards: ${28 - cardsRemoved}`;
    currentCard = null;
  });
  if (cardsRemoved === 28) {
    endGame();
  }
};

// Generate all cards

const showCards = () => {
  const newCards = [...cards];
  while (newCards.length > 0) {
    const id = getRandomCard(newCards);
    board.insertAdjacentHTML("beforeend", generateCard(newCards[id]));
    newCards.splice(id, 1);
  }
};

// Check for a match, hide cards back if no-match
const handleBoardClick = e => {
  if (currentCard && currentCard.dataset.id !== e.target.dataset.id) {
    turns++;
    turnsDisplay.textContent = `Turns: ${turns}`;
    e.target.classList.add("game__card-img--visible");

    if (currentCard && currentCard.dataset.name === e.target.dataset.name) {
      removeCards(currentCard.dataset.name);
    } else if (
      currentCard &&
      currentCard.dataset.name !== e.target.dataset.name
    ) {
      const hideCards = () => {
        curr.classList.remove("game__card-img--visible");
        e.target.classList.remove("game__card-img--visible");
      };
      const curr = Object.assign(currentCard);
      setTimeout(hideCards, 500);
      currentCard = null;
    }
  } else {
    e.target.classList.add("game__card-img--visible");
    currentCard = e.target;
  }
};

showCards();

newGameBtn.addEventListener("click", newGame);
board.addEventListener("click", handleBoardClick);
