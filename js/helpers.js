function isValidPlacement(board, row, col, size, direction) {
  let checkRow;
  let checkCol;
  for (let i = 0; i < boardSize; i++) {
    if (direction === "horizontal") {
      checkRow = row + i;
    } else if (direction === "vertical") {
      checkCol = col + i;
    } else if (checkCol > boardSize || checkRow > boardSize) {
      return false;
    } else if (board.row.index === ship && board.col.index === ship) {
      return false;
    }
  }

  return true;
}

function placeShipRandomly(board, ship) {
     let placed = false;
  while (!placed) {
   let col =Math.floor(Math.random() * boardSize);
  let row =Math.floor(Math.random() * boardSize);
  direction = Math.floor(Math.random() * 0.5  ? 'horizontal' : 'vertical' )

  if(isValidPlacement(board,row,col,ship.size,direction) === true){
    ship.cell=[];

    for(let i =0 ; i < ship.size ; i++){
        let placeRow=row;
        let placeCol=col;
        board[placeRow][placeCol]=ship 
        ship.cell.push([placeRow,placeCol])
        ship.placed=true;
    }

  }
ship.placed = true;
  placed= true;

  }

}
