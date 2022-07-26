

import createShips from './main/createShips.js'
import Board from './main/Board.js';
export default class Player {
    constructor(name) {
        this.name = name;
        this.ships = createShips();
        this.board = new Board(name);
    }

    getShips() { return this.ships }

    attack(board, y, x) {
        return board.updateBoard(y, x);
    }
}

