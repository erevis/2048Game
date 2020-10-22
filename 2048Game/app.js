import Game from "/2048Game/engine/game.js"

let game = new Game(4);
game.setupNewGame();

const colors = ['coral','#87adf5','#03fcbe','#dee05c','#eb79ed','#e66767','#304985','#2e7841','#c4ac89','#6dbae3','#bfffe3']
const gameBoard = document.querySelector('.grid')
const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', function() {
    game.setupNewGame();
    updateWindow();
})


function createBoard() {
    for (let i=0; i < game.size*game.size; i++) {
        let square = document.createElement('div')
        square.innerHTML = game.board[i];
        gameBoard.appendChild(square)
        game.board.push(square);
    }
}
createBoard();
updateWindow();

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
    if (game.over) {
        //while (gameBoard.firstChild) gameBoard.removeChild(gameBoard.firstChild);
        alert("game over!")
    }

    while (gameBoard.firstChild) gameBoard.removeChild(gameBoard.firstChild);

    for (let i=0; i < game.size*game.size; i++) {
        let square = document.createElement('div')
        square.className="cell"
        square.innerHTML = game.board[i];

        if (game.board[i] != 0) {
            let color = colors[Math.log2(game.board[i])];
            console.log(color)
            square.setAttribute("style", "background-color: " + color)
            // square.setAttribute("")
        }
        
        gameBoard.appendChild(square)
        //game.board.push(square);
    }

    let score = document.getElementById('score');
    score.innerHTML = game.score
}
