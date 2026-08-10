//get elements
const playerBoardEl = document.querySelector("#player-board");
const computerBoardEl = document.querySelector("#computer-board");
const rotateBtn = document.getElementById("rotate");
const shipDockEl = document.getElementById("ship-dock");
const playAgainBtn = document.getElementById("play-again");

//run when the page loads
function init() {
  // create the boards
  gameState.player.board = createBoard();
  gameState.computer.board = createBoard();

  gameState.player.ships = shipData.map((ship) => ({
    ...ship,
    cells: [],
    hits: 0,
    sunk: false,
    placed: false,
  }));

  gameState.computer.ships = shipData.map((ship) => ({
    ...ship,
    cells: [],
    hits: 0,
    sunk: false,
    placed: false,
  }));

  renderBoard(playerBoardEl, gameState.player.board, true);
  renderBoard(computerBoardEl, gameState.computer.board, false);

  createShipDock();

  rotateBtn.addEventListener("click", rotateShips);
  playAgainBtn.addEventListener("click", resetGame);

  console.log("Game initialized");
}

function renderBoard(boardEl, boardArray, showShips) {
  boardEl.innerHTML = "";
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement("div");
      cell.dataset.row = row;
      cell.dataset.col = col;
      const value = boardArray[row][col];
      if (value === hit) {
        cell.classList.add("hit");
      }
      if (value === miss) {
        cell.classList.add("miss");
      } else if (value === ship && showShips) {
        cell.classList.add("ship");
      }
      boardEl.appendChild(cell);
    }
  }
}

function createShipDock() {
  shipDockEl.innerHTML = "";
  gameState.player.ships.forEach((ship, index) => {
    const shipEl = document.createElement("div");
    shipEl.classList.add("ship-in-dock");
    shipEl.dataset.index = index;
    shipEl.dataset.size = ship.size;
    shipEl.style.width = ship.size * 42 + "px";
    shipEl.textContent = ship.name;
    shipDockEl.appendChild(shipEl);
  });
}

function rotateShips() {
  if (gameState.direction === "horizontal") {
    gameState.direction = "vertical";
    shipDockEl.classList.add("vertical");
  }
    rotateBtn.textContent = 'Rotate Ship 🔁 (' + gameState.direction + ')';
    messageEl.textContent = 'Placement direction: ' + gameState.direction;
}
