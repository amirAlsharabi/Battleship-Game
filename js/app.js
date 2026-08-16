//get elements
const playerBoardEl = document.querySelector("#player-board");
const computerBoardEl = document.querySelector("#computer-board");
const rotateBtn = document.getElementById("rotate");
const shipDockEl = document.getElementById("ship-dock");
const playAgainBtn = document.getElementById("play-again");
const messageEl = document.getElementById("message");

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
  gameState.computer.ships.forEach((ship) => {
    placeShipRandomly(gameState.computer.board, ship);
  });
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
      cell.classList.add("cell");
      if (showShips === true && gameState.phase === "setup") {
        cell.addEventListener("click", placeShipOnBoard);
      } else if (showShips === false && gameState.phase === "battle") {
        cell.addEventListener("click", handlePlayerAttack);
      }
      cell.dataset.row = row;
      cell.dataset.col = col;
      const value = boardArray[row][col];
      if (value === hit) {
        cell.classList.add("hit");
      } else if (value === miss) {
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
    shipEl.addEventListener("click", () => {
      gameState.selectedShipIndex = index;

      document.querySelectorAll(".ship-in-dock").forEach((el) => {
        el.classList.remove("selected");
      });

      shipEl.classList.add("selected");
      messageEl.textContent = "Click on Your Board to place the " + ship.name;
    });
  });
}

function rotateShips() {
  if (gameState.direction === "horizontal") {
    gameState.direction = "vertical";
    shipDockEl.classList.add("vertical");
  } else {
    gameState.direction = "horizontal";
    shipDockEl.classList.remove("vertical");
  }
  rotateBtn.textContent = "Rotate Ship 🔁 (" + gameState.direction + ")";
  messageEl.textContent = "Placement direction: " + gameState.direction;
}

function resetGame() {
  gameState.phase = "setup";
  gameState.currentTurn = "player";
  gameState.direction = "horizontal";
    gameState.selectedShipIndex = null;  
  playAgainBtn.classList.add("hidden");
  init();
}

document.addEventListener("DOMContentLoaded", init);

function startBattle() {
  gameState.phase = "battle";
  document.querySelector(".game-board").style.display = "none";
  messageEl.textContent = "⚔️ Battle begins! Click the Enemy Board to attack!";
  renderBoard(computerBoardEl, gameState.computer.board, false);
  renderBoard(playerBoardEl, gameState.player.board, true);
}

function handlePlayerAttack(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  if (
    gameState.computer.board[row][col] === hit ||
    gameState.computer.board[row][col] === miss
  ) {
    messageEl.textContent = "Already attacked there!";
    return;
  }

  if (gameState.computer.board[row][col] === ship) {
    gameState.computer.board[row][col] = hit;
    messageEl.textContent = "🚀 Hit!";

    for (let i = 0; i < gameState.computer.ships.length; i++) {
      const currentShip = gameState.computer.ships[i];
      for (let j = 0; j < currentShip.cells.length; j++) {
        const cell = currentShip.cells[j];
        if (cell[0] === row && cell[1] === col) {
          currentShip.hits = currentShip.hits + 1;

          if (currentShip.hits === currentShip.size) {
            currentShip.sunk = true;
            messageEl.textContent = "🚢 You sunk the " + currentShip.name + "!";
          }

          break;
        }
      }
    }

    const allSunk = gameState.computer.ships.every(
      (ship) => ship.sunk === true,
    );
    if (allSunk) {
      messageEl.textContent = "🏆 You Win!";
      playAgainBtn.classList.remove("hidden");
      renderBoard(computerBoardEl, gameState.computer.board, false);
      return;
    }
  } else {
    gameState.computer.board[row][col] = miss;
    messageEl.textContent = "💦 Miss!";
  }

  renderBoard(computerBoardEl, gameState.computer.board, false);

  computerTurn();
}

function computerTurn() {
  let row;
  let col;

  while (true) {
    row = Math.floor(Math.random() * boardSize);
    col = Math.floor(Math.random() * boardSize);

    if (
      gameState.player.board[row][col] !== hit &&
      gameState.player.board[row][col] !== miss
    ) {
      break;
    }
  }
  if (gameState.player.board[row][col] === ship) {
    gameState.player.board[row][col] = hit;
    messageEl.textContent = "Computer hit you ship 👾🚢😒";

    for (let i = 0; i < gameState.player.ships.length; i++) {
      const currentShip = gameState.player.ships[i];
      for (let j = 0; j < currentShip.cells.length; j++) {
        const cell = currentShip.cells[j];
        if (cell[0] === row && cell[1] === col) {
          currentShip.hits = currentShip.hits + 1;

          if (currentShip.hits === currentShip.size) {
            currentShip.sunk = true;
            messageEl.textContent =
              "🚢 Computer sunk the " + currentShip.name + "!";
          }

          break;
        }
      }
    }
    const allSunk = gameState.player.ships.every((ship) => ship.sunk === true);
    if (allSunk) {
      messageEl.textContent = "🏆 Computer Win!";
      playAgainBtn.classList.remove("hidden");
      renderBoard(playerBoardEl, gameState.player.board, true);
      return;
    }
  } else {
    gameState.player.board[row][col] = miss;
    messageEl.textContent = "💦 Miss!";
  }
  renderBoard(playerBoardEl, gameState.player.board, true);
}
