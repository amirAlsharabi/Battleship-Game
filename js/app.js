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
}



    
