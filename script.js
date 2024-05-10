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

  const createBoard = () => {
    const container = document.querySelector(".container");

    let counter = 1;
    for (let r = 1; r <= 3; r++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let col = 1; col <= 3; col++) {
        row.id = `r${r}`;
        const square = document.createElement("div");
        square.classList.add("square");
        square.id = `s${counter++}`;
        row.appendChild(square);
      }
      container.append(row);
    }
  };

  const getSquares = () => {
    return document.querySelectorAll(".square");
  };

  const setTicker = (square, playerMarker) => {
    const value = document.createElement("h2");
    value.textContent = `${playerMarker}`;
    square.appendChild(value);
  };

  const checkSquareValue = (square) => {
    if (!square.hasChildNodes()) {
      return true;
    } else {
      return false;
    }
  };

  const declareWinner = (winnerName) => {
    alert(`Winner is ${winnerName}`);
  };

  const checkLine = (square1, square2, square3, playerName) => {
    if (square1.isEqualNode(square2) && square2.isEqualNode(square3)) {
      console.log("winner");
      declareWinner(playerName);
      reset();
      return true;
    } else {
      return false;
    }
  };

  const checkWinner = (playerName) => {
    const [s1, s2, s3, s4, s5, s6, s7, s8, s9] = getSquares();
    if (s1.hasChildNodes() && s2.hasChildNodes() && s3.hasChildNodes()) {
      checkLine(s1.firstChild, s2.firstChild, s3.firstChild, playerName);
    }
    if (s4.hasChildNodes() && s5.hasChildNodes() && s6.hasChildNodes()) {
      checkLine(s4.firstChild, s5.firstChild, s6.firstChild, playerName);
    }
    if (s7.hasChildNodes() && s8.hasChildNodes() && s9.hasChildNodes()) {
      checkLine(s7.firstChild, s8.firstChild, s9.firstChild, playerName);
    }
    if (s1.hasChildNodes() && s4.hasChildNodes() && s7.hasChildNodes()) {
      checkLine(s1.firstChild, s4.firstChild, s7.firstChild, playerName);
    }
    if (s2.hasChildNodes() && s5.hasChildNodes() && s8.hasChildNodes()) {
      checkLine(s2.firstChild, s5.firstChild, s8.firstChild, playerName);
    }
    if (s3.hasChildNodes() && s6.hasChildNodes() && s9.hasChildNodes()) {
      checkLine(s3.firstChild, s6.firstChild, s9.firstChild, playerName);
    }
    if (s1.hasChildNodes() && s5.hasChildNodes() && s9.hasChildNodes()) {
      checkLine(s1.firstChild, s5.firstChild, s9.firstChild, playerName);
    }
    if (s7.hasChildNodes() && s5.hasChildNodes() && s3.hasChildNodes()) {
      checkLine(s7.firstChild, s5.firstChild, s3.firstChild, playerName);
    }
  };

  const reset = () => {
    const container = document.querySelector(".container");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    Game();
  };

  return {
    setTicker,
    checkWinner,
    createBoard,
    getSquares,
    checkSquareValue,
  };
};

const Game = () => {
  let gameBoard = GameBoard();
  gameBoard.createBoard();

  const p1 = Player("John", "X");
  const p2 = Player("Michael", "O");

  const left = document.querySelector("#left");
  const right = document.querySelector("#right");
  
  if (!left.hasChildNodes() && !right.hasChildNodes()) {
    const nameP1 = document.createElement("h2");
    nameP1.textContent = p1.getName();
    left.appendChild(nameP1);

    const nameP2 = document.createElement("h2");
    nameP2.textContent = p2.getName();
    right.appendChild(nameP2);
  }

  let lastPlayer = p1;

  const togglePlayer = () => {
    if (lastPlayer == p1) {
      lastPlayer = p2;
    } else {
      lastPlayer = p1;
    }
  };

  const squares = gameBoard.getSquares();

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (gameBoard.checkSquareValue(square)) {
        gameBoard.setTicker(square, lastPlayer.getTicker());
        togglePlayer();
        gameBoard.checkWinner(lastPlayer.getName());
        console.log(square.id, lastPlayer.getTicker());
      }
    });
  });
};

Game();
