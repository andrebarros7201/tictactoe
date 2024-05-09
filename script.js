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

  const createBoard= () =>{
    const container = document.querySelector('.container');

    let counter = 1;
    for(let r = 1; r <= 3; r++){
        const row = document.createElement('div');
        row.classList.add('row');
        for(let col = 1; col <= 3; col++){
            row.id = `r${r}`;
            const square = document.createElement('div');
            square.classList.add('square');
            square.id = `s${counter++}`;
            row.appendChild(square);
        }
        container.append(row);
    }
  }


  const getGameBoard = () => table;
  const setTicker = (row, col, ticker) => {
    if (table[row][col] == "") {
      table[row][col] = ticker;
    }
  };

  const checkWinner = (playerName) => {
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
        alert(`Winner is ${playerName}`);
        winner = true;
        reset();
      }
    }
  };

  const reset = () => {
    table = [
      [[], [], []],
      [[], [], []],
      [[], [], []],
    ];
    round = 1;
    console.clear();
  };

  return { getGameBoard, setTicker, reset, checkWinner, createBoard };
};

const Game = () => {  
  let gameBoard = GameBoard();
  gameBoard.createBoard();

  const p1 = Player("John", "X");
  const p2 = Player("Michael", "O");

  let lastPlayer = p1;
  let winner = false;
  let round = 1;

  const togglePlayer = () => {
    if (lastPlayer == p1) {
      lastPlayer = p2;
    } else {
      lastPlayer = p1;
    }
  };

  const incrementRound = () => round++;

  do {
    console.log(`Round ${round}: ${lastPlayer.getName()}`);
    console.log(gameBoard.getGameBoard());
    gameBoard.setTicker(row, col, lastPlayer.getTicker());
    gameBoard.checkWinner(lastPlayer.getName());
    togglePlayer();
    incrementRound();
  } while (!winner);

  if (winner) {
    reset();
  }
};

Game();
