let deckID = "";
const remaining = document.getElementById("remaining-cards");
const winnerText = document.getElementById("winner-text");
const drawCardBtn = document.getElementById("draw");
const newDeckBtn = document.getElementById("new-deck");
const compScoreText = document.getElementById("comp-score");
const myScoreText = document.getElementById("my-score");
let compScore = 0;
let myScore = 0;

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      myScore = 0;
      compScore = 0;
      deckID = data.deck_id;
      remaining.textContent = `Remaining Cards: ${data.remaining}`;
      drawCardBtn.disabled = false;
      drawCardBtn.classList.remove("disabled");
      myScoreText.textContent = `My Score: ${myScore}`;
      compScoreText.textContent = `Computer Score: ${compScore}`;
      document.querySelectorAll(".card-outline").forEach((el) => {
        el.innerHTML = "";
      });
    });
}

function drawCard() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckID}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      remaining.textContent = `Remaining Cards: ${data.remaining}`;
      if (data.remaining === 0) {
        if (myScore > compScore) {
          winnerText.textContent = "You won the game!";
        } else if (myScore < compScore) {
          winnerText.textContent = "You lost the game!";
        } else {
          winnerText.textContent = "It was a tie!";
        }
        drawCardBtn.disabled = true;
        drawCardBtn.classList.add("disabled");
      } else {
        console.log(data);
        for (let i = 0; i < data.cards.length; i++) {
          document.getElementById("cards").children[i].innerHTML = `
          <img src="${data.cards[i].image}" class="card" />
          `;
        }
        winnerText.textContent = determineWinner(data.cards[0], data.cards[1]);
      }
    });
}

function determineWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1Value = valueOptions.indexOf(card1.value);
  const card2Value = valueOptions.indexOf(card2.value);
  if (card1Value > card2Value) {
    compScore++;
    compScoreText.textContent = `Computer Score: ${compScore}`;
    return "Computer Wins!";
  } else if (card1Value < card2Value) {
    myScore++;
    myScoreText.textContent = `My Score: ${myScore}`;
    return "You Win!";
  } else {
    return "War!";
  }
}

newDeckBtn.addEventListener("click", handleClick);
drawCardBtn.addEventListener("click", drawCard);
