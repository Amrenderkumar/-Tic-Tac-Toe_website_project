const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const restartButton = document.querySelector(".restartButton");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombinations.some(combo => {
    return combo.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);

// Initial status
statusText.textContent = `${currentPlayer}'s turn`;
