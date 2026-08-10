//get elements
const playerBoardEl = document.querySelector('#player-board');
const computerBoardEl = document.querySelector('#computer-board');
const rotateBtn = document.getElementById('rotate');
const shipDockEl = document.getElementById('ship-dock');
const playAgainBtn = document.getElementById('play-again');


//run when the page loads
function init() {
  // create the boards
  gameState.player.board = createBoard();
  gameState.computer.board = createBoard();

  gameState.player.ships = shipData.map(ship => ({ 
    ...ship,
    cells: [],
    hits: 0,
    sunk: false,
    placed: false
  }))

  gameState.computer.ships = shipData.map(ship => ({ 
    ...ship,
    cells: [],
    hits: 0,
    sunk: false,
    placed: false
  }))

  renderBoard(playerBoardEl, gameState.player.board, true);
  renderBoard(computerBoardEl, gameState.computer.board, false);

  createShipDock();

  rotateBtn.addEventListener('click',rotateShips);
  playAgainBtn.addEventListener('click', resetGame);

  console.log('Game initialized');
}


