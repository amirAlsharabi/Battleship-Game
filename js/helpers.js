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
function placePlayerShip (){

}