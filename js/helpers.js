function isValidPlacement(board, row, col, size, direction) {
  let checkRow;
  let checkCol;
  for (let i = 0; i < size - 1; i++) {
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
    let direction = Math.floor(Math.random() * 0.5 ? "horizontal" : "vertical");

    if (isValidPlacement(board, row, col, shipObj.size, direction)) {
      ship.cell = [];

      for (let i = 0; i < shipObj.size; i++) {
        let placeRow = row;
        let placeCol = col;
        if (direction === "horizontal") {
          placeCol = col + i;
        } else {
          placeRow = row + 1;
        }
        board[placeRow][placeCol] = ship;
        shipObj.cell.push([placeRow, placeCol]);
        ship.placed = true;
      }
    }
    ship.placed = true;
    placed = true;
  }
}
