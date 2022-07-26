import Player from './Player.js'
import Game from './main/Game.js'

const main = document.querySelector('.main');
console.log(main);
const btnStart = document.querySelector('.btn-start')
console.log(btnStart);

btnStart.addEventListener('click', (e) => {
    e.preventDefault();

    const playerOne = new Player("player");
    const AI = new Player('AI');

    const boards = document.createElement('div');
    boards.classList.add('boards-all');

    
    playerOne.board.allShipDeploy(playerOne.ships);
    AI.board.allShipDeploy(AI.ships)

    const game = new Game(playerOne, AI);

    const playerBoard = game.getPlayerBoard();
    const you = document.createElement('h1');
    you.innerText = "YOU"
    you.classList.add('board-name')
    playerBoard.prepend(you)
    playerBoard.classList.add('player-board');
    
    const aiBoard = game.getAiBoard();
    const ai = document.createElement('h1');
    ai.classList.add('board-name')
    ai.innerText = "AI"
    aiBoard.classList.add('ai-board');
    aiBoard.prepend(ai);

    btnStart.remove()

    const vs = document.createElement('h2');
    vs.innerText = "VS"
    boards.append(playerBoard);
    boards.append(vs)
    boards.append(aiBoard);

    main.append(boards)

    game.start();
});

