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

//game status (phase)
const gamePhase = {
  setup: 1,
  playing: 2,
  gameOver: 3,
};

// player board data
const player1Board = [10*10].fill(water);
const computerBoard = [10*10].fill(water);

// player ship data
const player1Ships = [];
const computerShips = [];

// game 


