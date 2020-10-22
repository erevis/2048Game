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

// code from https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
let pageWidth = window.innerWidth || document.body.clientWidth;
let treshold = Math.max(1,Math.floor(0.01 * (pageWidth)));
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
const gestureZone = document.querySelector('.grid');

gestureZone.addEventListener('touchstart', function(event) {
    event.preventDefault();
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    event.preventDefault();
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture(event);
}, false);

function handleGesture(e) {
    let x = touchendX - touchstartX;
    let y = touchendY - touchstartY;
    let xy = Math.abs(x / y);
    let yx = Math.abs(y / x);
    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
        if (yx <= limit) {
            if (x < 0) {
                game.move('left');
                updateWindow()
            } else {
                game.move('right');
                updateWindow()
            }
        }
        if (xy <= limit) {
            if (y < 0) {
                game.move('up');
                updateWindow()
            } else {
                game.move('down');
                updateWindow()
            }
        }
    } else {
        console.log("tap");
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
        } else {
            square.innerHTML = "";
        }
        
        gameBoard.appendChild(square)
        //game.board.push(square);
    }

    let score = document.getElementById('score');
    score.innerHTML = game.score
}
