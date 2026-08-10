// board size
const boardSize = 10;

// board data
const water = 0;
const ship = 1;
const hit = 2;
const miss = 3;

// ship data
const shipData = [
  { name: "Carrier", size: 5 },
  { name: "lion", size: 4 },
  { name: "Cruiser", size: 3 },
  { name: "Submarine", size: 3 },
  { name: "Destroyer", size: 2 },
];

//who's turn
const player1 = 1;
const player2 = 2;

//game status
// gameState tracks everything happening right now
let gameState = {
  phase: 'setup',        
  currentTurn: 'player', // whose turn it is
  direction: 'horizontal', // ship placement direction
  
  player: {
    board: [],   // 10x10 array
    ships: []    // ships with positions and health
  },
  
  computer: {
    board: [],   // 10x10 array
    ships: []    // ships with positions and health
  }
}; 

// make a function to fill the board 
function createBoard(){
let board = [];
for (let i=0; i < boardSize ; i++){
    let newRow = [];
    for (let j=0; j < boardSize ; j++){
      newRow.push(water);
    }
    board.push(newRow);
}
return board;
}