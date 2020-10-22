export default class Game {
    constructor(size) {
        this.size = size;
        this.board = generateStartingTiles(this.size);
        this.score = 0;
        this.won = false;
        this.over = false;
        this.moveFunctions = []
        this.winFunctions = [];
        this.loseFunctions = []
    }
    setupNewGame() {
        this.board = generateStartingTiles(this.size)
        this.score = 0;
        this.won = false;
        this.over = false;
        this.moveFunctions = []
        this.winFunctions = [];
        this.loseFunctions = []
    }
    loadGame(gameState) {
        this.board = gameState.board;
        this.score = gameState.score;
        this.won = gameState.won;
        this.over = gameState.over;
    }
    getGameState() {
        let gameState = {
            board: this.board,
            score: this.score,
            won: this.won,
            over: this.over
        }
        return gameState;
    }
    move(direction) {
        this.moveFunctions.forEach(elem => elem(this.getGameState()))
        let flag = false; //flag that move was made

        if(direction == 'up') {
            //turn into 2d array
            const twoDimArray = [];
            for (let i=0; i<this.size; i++)
                twoDimArray.push(this.board.splice(0,this.size));

            let upShift = function() {
                for (let i = 0; i < twoDimArray.length; i++) { //row
                    for (let j = 0; j < twoDimArray.length; j++) { //col
                        if (twoDimArray[j][i] == 0) {
                            for (let k = j; k < twoDimArray.length - 1; k++) {
                                twoDimArray[k][i] = twoDimArray[k + 1][i]
                                twoDimArray[k + 1][i] = 0
                                if (twoDimArray[k][i] != 0) {flag = true}
                            }
                        }
                    }
                }    
            };
            upShift();
            upShift();
            for (let i = 0; i < twoDimArray.length; i++) { //row
                for (let j = 0; j < twoDimArray.length - 1; j++) { //col
                    if (twoDimArray[j][i] == twoDimArray[j + 1][i] && twoDimArray[j][i] != 0) {
                        twoDimArray[j][i] = twoDimArray[j + 1][i] * 2;
                        this.score+=twoDimArray[j + 1][i] * 2;
                        twoDimArray[j + 1][i] = 0;
                        j += 1;
                        flag = true;
                    }
                }
            }
            upShift();
            upShift();
            //turn into 1d array
            this.board = [];
            for(var i = 0; i < twoDimArray.length; i++) {
                var row = twoDimArray[i];
                for(var j = 0; j < row.length; j++) {
                    this.board.push(twoDimArray[i][j])
                }
            }
        } else if(direction == 'down') {
            //turn into 2d array
            let twoDimArray = [];
            for (let i=0; i<this.size; i++)
                twoDimArray.push(this.board.splice(0,this.size));

            let downShift = function() {
                for (let i = 0; i < twoDimArray.length; i++) { //row
                    for (let j = twoDimArray.length - 1; j > 0; j--) { //col
                        if (twoDimArray[j][i] == 0) {
                            for (let k = j; k > 0; k--) {
                                twoDimArray[k][i] = twoDimArray[k - 1][i]
                                twoDimArray[k - 1][i] = 0
                                if (twoDimArray[k][i] != 0) {flag = true}
                            }
                        }
                    }
                }    
            };
            downShift();
            downShift();
            for (let i = 0; i < twoDimArray.length; i++) { //row
                for (let j = twoDimArray.length - 1; j > 0; j--) { //col
                    if (twoDimArray[j][i] == twoDimArray[j - 1][i] && twoDimArray[j][i] != 0) {
                        twoDimArray[j][i] = twoDimArray[j - 1][i] * 2;
                        this.score+=twoDimArray[j - 1][i] * 2;
                        twoDimArray[j - 1][i] = 0;
                        j -= 1;
                        flag = true;
                    }
                }
            }
            downShift();
            downShift();
            //turn into 1d array
            this.board = [];
            for(var i = 0; i < twoDimArray.length; i++) {
                var row = twoDimArray[i];
                for(var j = 0; j < row.length; j++) {
                    this.board.push(twoDimArray[i][j])
                }
            }
        } else if(direction == 'right') {
            //turn into 2d array
            const twoDimArray = [];
            for (let i=0; i<this.size; i++)
                twoDimArray.push(this.board.splice(0,this.size));

            let rightShift = function() {
                for (let i = 0; i < twoDimArray.length; i++) {
                    for (let j = twoDimArray.length-1; j > 0; j--) {
                        if (twoDimArray[i][j] == 0) {
                            for (let k = j; k >= 1; k--) {
                                twoDimArray[i][k] = twoDimArray[i][k - 1]
                                twoDimArray[i][k - 1] = 0
                                if (twoDimArray[k][i] != 0) {flag = true}
                            }
                        }
                    }
                }    
            };
            rightShift();
            rightShift();
            for (let i = 0; i < twoDimArray.length; i++) {
                for (let j = twoDimArray.length - 1; j > 0; j--) {
                    if (twoDimArray[i][j] == twoDimArray[i][j - 1] && twoDimArray[i][j] != 0) {
                        twoDimArray[i][j] = twoDimArray[i][j - 1] * 2;
                        this.score+=twoDimArray[i][j - 1] * 2;
                        twoDimArray[i][j - 1] = 0;
                        j -= 1;
                        flag = true;
                    }
                }
            }
            rightShift();
            rightShift();
            //turn into 1d array
            this.board = [];
            for(var i = 0; i < twoDimArray.length; i++) {
                var row = twoDimArray[i];
                for(var j = 0; j < row.length; j++) {
                    this.board.push(twoDimArray[i][j])
                }
            }
        } else if (direction == 'left') {
            //turn into 2d array
            const twoDimArray = [];
            for (let i=0; i<this.size; i++)
                twoDimArray.push(this.board.splice(0,this.size));

            let leftShift = function() {
                for (let i = 0; i < twoDimArray.length; i++) {
                    for (let j = 0; j < twoDimArray.length; j++) {
                        if (twoDimArray[i][j] == 0) {
                            for (let k = j; k < twoDimArray.length - 1; k++) {
                                twoDimArray[i][k] = twoDimArray[i][k + 1]
                                twoDimArray[i][k + 1] = 0
                                if (twoDimArray[k][i] != 0) {flag = true}
                            }
                        }
                    }
                }    
            };
            leftShift();
            leftShift();
            for (let i = 0; i < twoDimArray.length; i++) {
                for (let j = 0; j < twoDimArray.length - 1; j++) {
                    if (twoDimArray[i][j] == twoDimArray[i][j + 1] && twoDimArray[i][j] != 0) {
                        twoDimArray[i][j] = twoDimArray[i][j + 1] * 2;
                        this.score+=twoDimArray[i][j + 1] * 2;
                        twoDimArray[i][j + 1] = 0;
                        j += 1;
                        flag = true;
                    }
                }
            }
            leftShift();
            leftShift();
            //turn into 1d array
            this.board = [];
            for(var i = 0; i < twoDimArray.length; i++) {
                var row = twoDimArray[i];
                for(var j = 0; j < row.length; j++) {
                    this.board.push(twoDimArray[i][j])
                }
            }
        }
        
        let availableSpots = []
        for (let i = 0; i < this.size*this.size; i++) {
            if (this.board[i] == 0) {
                availableSpots.push(i)
            }
            if (this.board[i] == 2048) {
                this.winFunctions.forEach(elem => elem(this.getGameState()))
                this.won=true;
            }
        }

        //generate new tiles
        if (flag == true) {
            let newTileSpot = availableSpots[Math.floor(Math.random()*availableSpots.length)];
            this.board[newTileSpot] = newRandomTileValue();
            availableSpots.pop;
        }
        
        //check for game end
        if (availableSpots.length == 1 || availableSpots.length == 0) {
            let done = true;
            for (let i = 0; i < this.size; i++) {
                for (let j = i; j < this.size * (this.size-1) + i; j+=this.size) {
                    if (this.board[j] == this.board[j+this.size]) {
                        done=false;
                        break;
                    }
                }
            }
            for (let i = 0; i <= this.size * (this.size-1); i+=this.size) {
                for (let j = i; j < i+this.size - 1; j++) {
                    if (this.board[j] == this.board[j+1]) {
                        done=false;
                        break;
                    }
                }
            }
            if (done) {
                this.over = true;
                this.loseFunctions.forEach(elem => elem(this.getGameState()))
            }

        }
    }
    toString() {
        let string = "";
        for (let i=0; i < this.size*this.size; i++) {
            if (i % this.size == 0)
                string += "\n"
            string += this.board[i] + ", "
        }
        return string;
    }
    onMove(callback) {
        this.moveFunctions.push(callback)
    }
    onLose(callback) {
        this.loseFunctions.push(callback)
    }
    onWin(callback) {
        this.winFunctions.push(callback)
    }
}

function generateStartingTiles(size) {
    let board = new Array(size*size);

    let firstTilePos;
    let secondTilePos;
    do {
        firstTilePos = Math.floor(Math.random()*size*size);
        secondTilePos = Math.floor(Math.random()*size*size);
    } while (firstTilePos == secondTilePos);
    
    board[firstTilePos] = newRandomTileValue();
    board[secondTilePos] = newRandomTileValue();

    for (let i=0; i < size*size; i++) {
        if (board[i] != 2 && board[i] != 4)
            board[i] = 0;
    }
    return board
}

function newRandomTileValue() {
    let i = Math.floor(Math.random()*10);
    i++;
    if (i <= 9)
        return 2;
    else
        return 4;
}