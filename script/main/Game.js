export default class Game {
  constructor(player, ai) {
    this.ai = ai;
    this.player = player;
  }
  getAiBoard() {
    return this.ai.board.displayBoard(true);
  }

  getPlayerBoard() {
    return this.player.board.displayBoard();
  }
  start() {
    const enemyBoard = document.querySelector(".ai-board");
    enemyBoard.addEventListener("click", (e) => {
      const y = e.target.getAttribute("y");
      const x = e.target.getAttribute("x");
      const result = this.player.attack(this.ai.board, y, x);
      if (e.target.getAttribute("status") !== "done") {
        if (result === "missed") {
          e.target.classList.add("missed-cell");
        } else if (result === "hit") {
          e.target.classList.add("attacked-cell");
        }

        e.target.setAttribute("status", "done");

        const playerWin = this.isPlayerWinner();
        if (playerWin) {
          this.declareWinner("YOU");
        } else {
          this.aiRandomAttack();
        }
      }
    });
  }

  aiRandomAttack() {
    const y = Math.floor(Math.random() * 10);
    const x = Math.floor(Math.random() * 10);
    const boardCell = document.querySelector(`.x-${x}.y-${y}`);
    const cellStatus = boardCell.getAttribute("status");

    //if the random cell is already taken it runs the function again
    if (cellStatus !== "done") {
      //this will return if it's a hit or missed
      const result = this.ai.attack(this.player.board, y, x);
      if (result === "missed") {
        boardCell.classList.add("missed-cell");
      } else if (result === "hit") {
        boardCell.classList.add("attacked-cell");
        const aiWin = this.isAiWinner();
        if (aiWin) {
          this.declareWinner("AI");
        }
      }
      //marking the cell thats been attacked
      boardCell.setAttribute("status", "done");
    } else {
      console.log("again");
      this.aiRandomAttack();
    }
  }

  isPlayerWinner() {
    return this.ai.ships.every((ship) => ship.isSunk() === true);
  }

  isAiWinner() {
    return this.player.ships.every((ship) => ship.isSunk() === true);
  }

  declareWinner(winner) {
    const modalBg = document.createElement("div");
    modalBg.classList.add("modal-bg");

    const divWinner = document.createElement("div");
    divWinner.classList.add("winner");
    divWinner.innerText = `${winner} won!`;

    const playButton = document.createElement("button");
    playButton.innerText = "Play Again";

    divWinner.append(playButton);

    modalBg.append(divWinner);

    document.body.append(modalBg);

    playButton.addEventListener("click", () => {
      location.reload();
    });
  }
}
