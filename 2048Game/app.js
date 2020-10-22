import Game from "/engine/game.js"

let game = new Game(4);
game.setupNewGame();

const gameBoard = document.querySelector('.grid')


function createBoard() {
    for (let i=0; i < game.size*game.size; i++) {
        let square = document.createElement('div')
        square.innerHTML = game.board[i];
        gameBoard.appendChild(square)
        game.board.push(square);
    }
}
createBoard();

game.loadGame({
    board: [
        0, 0, 0, 4,
        2, 0, 0, 0,
        0, 2, 0, 0,
        0, 2, 0, 4,
      ],
      score: 0,
      won: false,
      over: false 
})
updateWindow();

// window.onload = function() {
//     window.addEventListener('keydown', doKeyDown, true)
//     window.addEventListener('keyup', doKeyUp, true)
//     window.addEventListener('keyleft', doKeyLeft, true)
//     window.addEventListener('keyright', doKeyRight, true)
// }

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        game.move('up');
        updateWindow()
    }
    else if (e.keyCode == '40') {
        game.move('down');
        updateWindow()
    }
    else if (e.keyCode == '37') {
        game.move('left');
        updateWindow()
    }
    else if (e.keyCode == '39') {
        game.move('right');
        updateWindow()
    }

}

function updateWindow() {    
    while (gameBoard.firstChild) gameBoard.removeChild(gameBoard.firstChild);

    for (let i=0; i < game.size*game.size; i++) {
        let square = document.createElement('div')
        square.innerHTML = game.board[i];
        gameBoard.appendChild(square)
        //game.board.push(square);
    }
}