import Ship from './factory/Ship.js';
import Board from './factory/Board.js'

export default class AI {
    constructor() {
        this.ships = []
        this.board = new Board('AI')
    }

    async createShips() {
        
        for(let x = 0; x <= 4; x++) {
            let bool = Math.random() < 0.5;
            switch(x) {
                case 0:
                    case 0:
                    this.ships.push(new Ship('Carrier', 5, bool, await this.placeRandom(5, bool)))
                    break;
                case 1:
                    this.ships.push(new Ship('Battleship', 4, bool, await this.placeRandom(4, bool)))
                    break;
                case 2:
                    this.ships.push(new Ship('Cruiser', 3, bool, await this.placeRandom(3, bool)))
                    break;
                case 3:
                    this.ships.push(new Ship('Submarine', 3, bool, await this.placeRandom(3, bool)))
                    break;
                case 4:
                    this.ships.push(new Ship('Destroyer', 5, bool, await this.placeRandom(2, bool)))
                    break;    
            }
        }
    }

    async placeRandom(shipLength, bool) {
        start: while(true) {
            let temp = Math.floor(Math.random()*99) + 1;

            //21
            //getting the 2nd digit of the random first location---- ex. getting 1 from 21
            let x = temp % 10;
    
            //getting the 2nd digit of the random last location----- ex. getting 5 from 25 
            let a = (temp + shipLength - 1) % 10;
    
            let z = (temp + (shipLength * 10)) - 10;

            let tempLoc = []
    
            if(bool) {
                if(x > a) {
                    //call function again if it overflows
                    continue start;
                }
            } else {
                console.log(`${z} > 99`)
                if(z > 99) {
                    continue start;
                }
            }
    
            for(let x = 1; x <= shipLength; x++) {    
                if(bool) {
                    tempLoc.push(temp);
                    temp++;
                } else {
                    tempLoc.push(temp);
                    temp += 10;
                }
            }
    
            //if checkLoc returns an array with value
            const isValid = await this.checkLoc(tempLoc);
            console.log(isValid)
            if(!isValid) {
                continue start;
            } else {
                this.board.updateInBoard(tempLoc)
                return tempLoc
            }
        }
    }

    checkLoc(loc) {
        return new Promise((resolve, reject) => {
            loc.forEach(x => {
                console.log(`this.board.boardStatus[x] !== null`);
                console.log(`${this.board.boardStatus[x]} !== null`)
                if(this.board.boardStatus[x] !== null) {
                    reject(false);
                }
            })
            resolve(true)
        })
    }

    getShips() {
        let a = []
        this.ships.forEach(ship => {
            console.log(ship.location)
        })
    }

}
