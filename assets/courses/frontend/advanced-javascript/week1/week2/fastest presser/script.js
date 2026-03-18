let lCount = 0;
let jCount = 0;
let isGameRunning = false;

const statusEl = document.getElementById("status");
const resultDiv = document.getElementById("result");

document.getElementById("startBtn").addEventListener("click", () => {
  const time = document.getElementById("seconds").value * 1000;

  if (!time || time <= 0) {
    return alert("Please insert a correct time");
  }

  // Reset game state
  lCount = 0;
  jCount = 0;
  resultDiv.textContent = "";
  isGameRunning = true;
  statusEl.textContent = "Game is running...";

  setTimeout(() => {
    isGameRunning = false;
    statusEl.textContent = "Game over!";
    findWinner();
  }, time);
});

document.addEventListener("keydown", (event) => {
  if (!isGameRunning) return;
  const key = event.key.toLowerCase();
  if (key === "l") {
    lCount++;
  } else if (key === "j") {
    jCount++;
  }
});

function findWinner() {
  let message = "";
  if (lCount > jCount) {
    message = `Player L wins with ${lCount} presses!`;
  } else if (jCount > lCount) {
    message = `Player J wins with ${jCount} presses!`;
  } else {
    message = "It's a tie!";
  }
  resultDiv.textContent = message;
}
