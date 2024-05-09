const Player = (name, ticker) => {
  const getName = () => name;
  const getTicker = () => ticker;
  return { getName, getTicker };
};

const GameBoard = () => {
  //table[row][col]
  let table = [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ];

  const getGameBoard = () => table;
  const setTicker = (row, col, ticker) => {
    if (table[row][col] == "") {
      table[row][col] = ticker;
    }
  };

  const checkWinner = (lastPlayer) => {
    //Checks if one of the corners or middle is not empty
    if (
      table[0][0] != "" ||
      table[0][2] != "" ||
      table[2][0] != "" ||
      table[2][2] != "" ||
      table[1][1] != ""
    ) {
      if (
        //Top Horizontal
        (table[0][0] == table[0][1] && table[0][1] == table[0][2]) ||
        //Middle Horizontal
        (table[1][0] == table[1][1] && table[1][1] == table[1][2]) ||
        //Bottom Horizontal
        (table[2][0] == table[2][1] && table[2][1] == table[2][2]) ||
        //Left Vertical
        (table[0][0] == table[1][0] && table[1][0] == table[2][0]) ||
        // Middle Vertical
        (table[0][1] == table[1][1] && table[1][1] == table[2][1]) ||
        //Right Vertical
        (table[0][2] == table[1][2] && table[1][2] == table[2][2]) ||
        //Diagonals
        (table[0][0] == table[1][1] && table[1][1] == table[2][2]) ||
        (table[2][0] == table[1][1] && table[1][1] == table[0][2])
      ) {
        alert(`Winner is ${lastPlayer}`);
      }
    }
  };
  return { getGameBoard, setTicker, checkWinner };
};

const Game = () => {
  var gameBoard = GameBoard();
  const p1 = Player("John", "X");
  const p2 = Player("Michael", "O");

  var lastPlayer = p1;

  const togglePlayer = () => {
    if (lastPlayer == p1) {
      lastPlayer = p2;
    } else {
      lastPlayer = p1;
    }
  };

  for (let index = 0; index < 9; index++) {
    console.log(`Round: ${index+1}`);
    console.log(gameBoard.getGameBoard());
    let col = prompt('Col');
    let row = prompt('Row');
    gameBoard.setTicker(row, col, lastPlayer.getTicker());
    gameBoard.checkWinner(lastPlayer.getName());
    togglePlayer();
  }
};

Game();
