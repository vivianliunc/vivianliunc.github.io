export default class Game{
    constructor(size) {
        this.size = size;
        this.gameBoard = this.createnewBoard(size);
        this.triesLeft = 3;
        this.wonFlag = false;
        this.overFlag = false;
        this.gameState = this.getGameState();
        this.moveListeners = [];
        this.winListeners = [];
        this.overListeners = [];
    }

    createnewBoard(size){
        let newBoard = new Array(size*size).fill(0);
        let tile1 = this.addTileIndex(size);

        newBoard[tile1] = 1;
        return newBoard;
    }

    addTileIndex(size) {
        return Math.floor(Math.random() * (size*size));
    }

    setupNewGame(){
        this.gameBoard = this.createnewBoard(this.size);
        this.triesLeft = 3;
        this.wonFlag = false;
        this.overFlag = false;
    }

    loadGame(gameState){
        this.gameBoard = gameState.board;
        this.gameScore = gameState.score;
        this.wonFlag = gameState.won;
        this.overFlag = gameState.over;
    }

    click(index){

        if (this.gameBoard[index] === 0) {
            this.gameBoard[index] = 3;
            if (!this.overFlag){
                this.triesLeft -= 1;
            }
        }

        if (this.gameBoard[index] === 1) {
            this.gameBoard[index] = 2;
            if (!this.overFlag){
                this.triesLeft -= 1;
            }
        }

        let clickCount = 0;
        for (let i=0; i<this.size*this.size; i++) {
            if (this.gameBoard[i] === 3) {
                clickCount += 1;
            }
        }
        
        this.moveListeners.forEach(callback => {
            callback(this.gameState);
        })
        
        if (this.gameBoard.includes(2)) {
            this.wonFlag = true;
            this.winListeners.forEach(callback => {
                callback(this.gameState);
            })

        }
        if (this.checkLose()) {
            this.overFlag = true;
            this.overListeners.forEach(callback => {
                callback(this.gameState);
            })
        }
    }

    checkLose() {
        let clickCount = 0;
        for (let i=0; i<this.size*this.size; i++) {
            if (this.gameBoard[i] === 3) {
                clickCount += 1;
            }
        }
        
    if (clickCount === 3) {
        return true;
    }
        return false;
    }

    onMove(callback){
        this.moveListeners.push(callback);
    }

    onWin(callback){
        this.winListeners.push(callback);
    }

    onLose(callback){
        this.overListeners.push(callback);
    }

    getGameState(){
        let gameState = {
            board: this.gameBoard, 
            lives: this.triesLeft, 
            won: this.wonFlag,
            over: this.overFlag
        }
        return gameState;
    }

}