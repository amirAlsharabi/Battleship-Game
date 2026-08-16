function isValidPlacement(board, row, col, size, direction) {
  for (let i = 0; i < size; i++) {
    let checkRow = row;
    let checkCol = col;
    if (direction === "horizontal") {
      checkCol = col + i;
    } else {
      checkRow = row + i;
    }
    if (checkCol >= boardSize || checkRow >= boardSize) {
      return false;
    }
    if (board[checkRow][checkCol] === ship) {
      return false;
    }
  }

  return true;
}

function placeShipRandomly(board, shipObj) {
  let placed = false;
  while (!placed) {
    let col = Math.floor(Math.random() * boardSize);
    let row = Math.floor(Math.random() * boardSize);
    let direction = Math.random() < 0.5 ? "horizontal" : "vertical" ;

    if (isValidPlacement(board, row, col, shipObj.size, direction)) {
      shipObj.cells = [];

      for (let i = 0; i < shipObj.size; i++) {
        let placeRow = row;
        let placeCol = col;
        if (direction === "horizontal") {
          placeCol = col + i;
        } else {
          placeRow = row + i;
        }
        board[placeRow][placeCol] = ship;
        shipObj.cells.push([placeRow, placeCol]);
      }
      shipObj.placed = true;
      placed = true;
    }
  }
}
// function for place ship for player
function placeShipOnBoard(event){
   if (gameState.selectedShipIndex === null){
    
    messageEl.textContent="Pick a ship from the dock first";
    return ;
  }
  const selectShip = gameState.player.ships[gameState.selectedShipIndex];
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  const isValid = isValidPlacement(gameState.player.board,row,col,selectShip.size,gameState.direction)

  if(isValid === false){
    messageEl.textContent = "cant place there!";
    return;
  }
  if (selectShip.placed === true){
    messageEl.textContent = "That ship is already placed!";
    return ;
  }
for( let i =0 ; i< selectShip.size;i++)  {
  let placeRow = row ; 
  let placeCol = col ;
  if (gameState.direction === 'horizontal'){
    placeCol = col + i 
  }else {
    placeRow = row + i;
  }
  gameState.player.board[placeRow][placeCol]= ship;
  selectShip.cells.push([placeRow,placeCol]);
}
 selectShip.placed = true ;
 renderBoard(playerBoardEl,gameState.player.board,true);
 gameState.selectedShipIndex = null;
document.querySelectorAll(".ship-in-dock").forEach((el) => {
  el.classList.remove("selected");
});
const allPlaced = gameState.player.ships.every((ship) => ship.placed === true);
if (allPlaced) {
  startBattle();
}
messageEl.textContent = selectShip.name + "placed!";

}

