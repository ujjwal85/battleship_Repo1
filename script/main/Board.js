export default class Board {
  constructor() {
    // create a board 10x10, coords board[row][col] / board[y][x];
    this.arrBoard = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
  }
  allShipDeploy(ships) {
    ships.forEach((ship) => this.randomPlace(ship));
  }
  randomPlace(ship) {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    //horizontal if true
    const changePos = Math.random() > 0.5;
    if (changePos) ship.switchPosition();
    const deployed = this.deployShip(ship, row, col);
    if (!deployed) this.randomPlace(ship);
  }
  deployShip(ship, row, col) {
    const valid = this.isValid(ship.length, ship.isHorizontal, row, col);
    if (valid) {
      for (let i = 0; i < ship.length; i++) {
        const [y, x] = this.adjustCoord(ship.isHorizontal, row, col, i);

        this.arrBoard[y][x] = { ship, index: i };
      }

      return valid;
    } else {
      return valid;
    }
  }
  isValid(length, isHorizontal, row, col) {
    const cells = [];
    for (let i = 0; i < length; i++) {
      const [y, x] = this.adjustCoord(isHorizontal, row, col, i);

      //this to check if ship goes outside the board
      if (y < 10 && x < 10) {
        cells.push(this.arrBoard[y][x]);
      } else {
        return false;
      }
    }
    //check if coord is taken;
    return cells.every((cell) => cell === null);
  }
  adjustCoord(isHorizontal, row, col, i) {
    let y = row;
    let x = col;
    if (isHorizontal) {
      y = row + i;
      x = col;
    } else {
      y = row;
      x = col + i;
    }

    return [x, y];
  }

  updateBoard(y, x) {
    if (this.arrBoard[y][x] === null) {
      return "missed";
    } else {
      this.arrBoard[y][x].ship.hit();
      return "hit";
    }
  }

  displayBoard(hide) {
    const displayBoard = document.createElement("div");
    displayBoard.classList.add("display-board");

    this.arrBoard.forEach((element, y) => {
      const cellLine = document.createElement("div");
      cellLine.classList.add("horizontal-line");

      element.forEach((cell, x) => {
        const boardCell = document.createElement("div");

        //getting the coord for a random attack from ai
        boardCell.classList.add(`y-${y}`);
        boardCell.classList.add(`x-${x}`);

        //this will be for the click event
        boardCell.setAttribute("y", y);
        boardCell.setAttribute("x", x);
        boardCell.classList.add("board-cell");
        if (!hide) {
          if (cell) boardCell.classList.add("taken-cell");
        }

        cellLine.append(boardCell);
      });

      displayBoard.append(cellLine);
    });

    return displayBoard;
  }
}
