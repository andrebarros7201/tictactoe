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

  const setTicker = (row, col, ticker) =>{
    if(table[row][col] == ''){
        table[row][col] = ticker;
    }
  }
  return { getGameBoard, setTicker };
};


const Game = () =>{
    var gameBoard = GameBoard();
    const p1 = Player('John', 'X');
    const p2 = Player('Michael', 'O');
}

Game()