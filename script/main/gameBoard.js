export default function createBoard() {
  const board = document.createElement("div");
  const button = document.createElement("button");
  button.classList.add("btn-rotate");
  board.classList.add("board");

  let counter = 0;
  for (let x = 0; x <= 9; x++) {
    const hLine = document.createElement("div");
    hLine.classList.add("horizontal-line");
    hLine.dataset.x = x;
    for (let y = 0; y <= 9; y++) {
      const cell = document.createElement("div");
      cell.classList.add("board-cell");

      //this counter will work as coordinates
      cell.dataset.cellnumber = counter;
      counter++;
      hLine.append(cell);
    }

    board.append(hLine);
  }

  return board;
}
