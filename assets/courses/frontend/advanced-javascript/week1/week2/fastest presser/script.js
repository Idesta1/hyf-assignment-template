let lCount = 0;
let jCount = 0;
let isGameRunning = false;
let useKeyboard = true; // Default to keyboard input

const statusEl = document.getElementById("status");
const resultDiv = document.getElementById("result");
const lButton = document.getElementById("l-btn");
const jButton = document.getElementById("j-btn");
const keyboardOption = document.getElementById("keyboard-option");
const mouseOption = document.getElementById("mouse-option");

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
    statusEl.textContent = "Time's up!";
    findWinner();
  }, time);
});

// Add event listeners for keyboard and mouse options
keyboardOption.addEventListener("click", () => {
  useKeyboard = true;
  lButton.disabled = true;
  jButton.disabled = true;
  statusEl.textContent = "Keyboard mode selected. Press 'L' or 'J' to play.";
});

mouseOption.addEventListener("click", () => {
  useKeyboard = false;
  lButton.disabled = false;
  jButton.disabled = false;
  statusEl.textContent =
    "Mouse mode selected. Click 'L' or 'J' buttons to play.";
});

// Keyboard input logic
document.addEventListener("keydown", (event) => {
  if (!isGameRunning || !useKeyboard) return;
  const key = event.key.toLowerCase();
  if (key === "l") {
    lCount++;
  } else if (key === "j") {
    jCount++;
  }
});

// Mouse input logic
lButton.addEventListener("click", () => {
  if (isGameRunning && !useKeyboard) {
    lCount++;
  }
});

jButton.addEventListener("click", () => {
  if (isGameRunning && !useKeyboard) {
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
confetti.render();
