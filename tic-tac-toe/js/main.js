
const gameElements = {
    board: document.querySelector('.board'),
    sq0: document.getElementById('sq0'),
    sq1: document.getElementById('sq1'),
    sq2: document.getElementById('sq2'),
    sq3: document.getElementById('sq3'),
    sq4: document.getElementById('sq4'),
    sq5: document.getElementById('sq5'),
    sq6: document.getElementById('sq6'),
    sq7: document.getElementById('sq7'),
    sq8: document.getElementById('sq8'),
    message: document.getElementById('message'),
    gameBnt: document.getElementById('btns'),
    gameReset: document.getElementById('reset')
    
}


const gameConst = {
    playerTurn: 1,
    vsComputer: false,
    winner: null,
    isWinner: null,
    turnCount: 0
}

const gameState = {
    sq0: null,
    sq1: null,
    sq2: null,
    sq3: null,
    sq4: null,
    sq5: null,
    sq6: null,
    sq6: null,
    sq7: null,
    sq8: null
}

const scores = {
    x: 1,
    o: -1,
    tie: 0
}

const gameFn = {
    play: function () {
        
        if (gameConst.vsComputer === true) {
            this.computerTurn() 
            }
            this.toggleMode()
            this.pvp()
            this.toggleMode()
            this.reset()
        
    },
    pvp: function () {
        gameElements.board.onclick = (ev) => {
            if (this.checkGameEnd() || gameState[event.target.id] !== null ) {
                
                ev.stopPropagation()
            } else if (gameConst.vsComputer === false ) {
                if (gameConst.playerTurn === 1) {
                    this.rednerWinner()
                    ev.target.textContent = 'x'
                    gameConst.turnCount++
                    gameState[ev.target.id] = 'x';
                    gameConst.playerTurn = 2
                    
                } else if (gameConst.playerTurn === 2) {
                    this.rednerWinner()
                    ev.target.textContent = 'o'
                    gameConst.turnCount++
                    gameState[ev.target.id] = 'o';
                    gameConst.playerTurn = 1
                }
            }else if (gameConst.vsComputer === true) {
                gameElements.board.onclick = (ev) => {
                    if (this.checkGameEnd() || gameState[event.target.id] !== null ) {
                        ev.stopPropagation()
                        
                    } else {
                        this.rednerWinner()
                        ev.target.textContent = 'o'
                        gameConst.turnCount++
                        gameState[ev.target.id] = 'o';
                        gameConst.playerTurn = 1
                        //this.computerTurn()
                        this.computerTurn()
                    }   
                }
            }
        }
    },
    pve: function () {
        gameElements.board.onclick = (ev) => {
            if (this.checkGameEnd() || gameState[event.target.id] !== null || gameConst.vsComputer === false) {
                ev.stopPropagation()
            } else {
        
                ev.target.textContent = 'o'
                gameConst.turnCount++
                gameState[ev.target.id] = 'o';
                gameConst.playerTurn = 1
                this.pveHard()
            }   
        }
    },
    reset: function () { 
        gameElements.gameReset.onclick = (ev) => {
            for (let key in gameState) {
                gameState[key] = null
                gameElements[key].textContent = ''
                
            }
            gameConst.isWinner = null;
            gameConst.winner = null;
            if (gameConst.vsComputer === true) {
                this.pveHard()
                gameElements.message.textContent = 'Currently playing against the computer'
            }else{
                gameElements.message.textContent = 'Currently playing against a human'
            }
          
        }
      
    },
    toggleMode: function () {
        gameElements.gameBnt.onclick = (ev) => {
            if (ev.target.id === 'pve') {
                this.pveHard()
                gameConst.vsComputer = true;
                gameElements.message.textContent = 'Currently playing against the computer'
            } else if (ev.target.id === 'pvp' ) {
                for (let key in gameState) {
                    gameState[key] = null
                    gameElements[key].textContent = ''
                    
                    
                }
                gameConst.vsComputer = false;
                gameElements.message.textContent = 'Currently playing against a human'
            }
         
        }
    },
    getState: function () {
        const keys = []
        for (let key in gameState) {
            if (gameState[key] === null) {
                keys.push(key)
            }
        }
       
        return keys
    },
    computerTurn: function () {
        if (this.checkGameEnd()) {
            return
        }
        randomKey = Math.floor(Math.random()*this.getState().length)
        gameElements[this.getState()[randomKey]].textContent = 'x'
        gameState[gameElements[this.getState()[randomKey]].id] = 'x'
        gameConst.turnCount++
        gameConst.playerTurn = 2
    },
    pveHard: function () {
        let bestScore = null;
        let move;
        for (let key in gameState) {
            if (gameState[key] === null) {
                gameState[key] = 'x'
                let score = miniMax(gameState, 0, true)
                gameState[key] = null
                if (score > bestScore) {
                    bestScore = score;
                    move = key
                }
            }
        }
        gameElements[move].textContent = 'x'
        gameState[move] = 'x'
        gameConst.turnCount++
        gameConst.playerTurn = 2
    },
    rednerWinner: function(){
        if(gameConst.isWinner === true && gameConst.winner === 'x'){
            gameElements.message.textContent = 'Player X won the game!'
        } else if(gameConst.isWnner === true && gameConst.winner === 'o' ){
            gameElements.message.textContent = 'Player O won the game!'
        }else if(gameConst.turnCount === 8) {
            gameElements.message.textContent = 'Tie Game'
        }
    },
    checkGameEnd: function () {
        if (gameState.sq0 === 'x' && gameState.sq1 === 'x' && gameState.sq2 === 'x') {
            gameConst.winner = 'x'
            gameConst.isWinner = true;
            return true
        } else if (gameState.sq0 === 'o' && gameState.sq1 === 'o' && gameState.sq2 === 'o') {
            gameConst.winner = 'o'
            gameConst.isWinner = true
            return true;
        } else if (gameState.sq3 === 'x' && gameState.sq4 === 'x' && gameState.sq5 === 'x') {
            gameConst.winner = 'x'
            gameConst.isWinner = true
            return true;
        } else if (gameState.sq3 === 'o' && gameState.sq4 === 'o' && gameState.sq5 === 'o') {
            gameConst.winner = 'o'
            gameConst.isWinner = true
            return true;
        } else if (gameState.sq6 === 'x' && gameState.sq7 === 'x' && gameState.sq8 === 'x') {
            gameConst.winner = 'x'
            gameConst.isWinner = true
            return true;
        } else if (gameState.sq6 === 'o' && gameState.sq7 === 'o' && gameState.sq8 === 'o') {
            gameConst.winner = 'o'
            gameConst.isWinner = true
            return true;
        } else if (gameState.sq0 === 'x' && gameState.sq3 === 'x' && gameState.sq6 === 'x') {
            gameConst.winner = 'x'
            gameConst.isWinner = true;
            return true;
        } else if (gameState.sq0 === 'o' && gameState.sq3 === 'o' && gameState.sq6 === 'o') {
            gameConst.winner = 'o'
            gameConst.isWinner = true;
            return true;
        } else if (gameState.sq1 === 'x' && gameState.sq4 === 'x' && gameState.sq7 === 'x') {
            gameConst.winner = 'x'
            gameConst.isWinner = true;
            return true;
        } else if (gameState.sq1 === 'o' && gameState.sq4 === 'o' && gameState.sq7 === 'o') {
            gameConst.winner = 'o'
            gameConst.isWinner = true;
            return true;
        } else if (gameState.sq2 === 'x' && gameState.sq5 === 'x' && gameState.sq8 === 'x') {
            gameConst.winner = 'x'
            gameConst.isWinner = true;
            return true;
        } else if (gameState.sq2 === 'o' && gameState.sq5 === 'o' && gameState.sq8 === 'o') {
            gameConst.winner = 'o'
            gameConst.isWinner = true;
            return true;
        } else if (gameState.sq0 === 'x' && gameState.sq4 === 'x' && gameState.sq8 === 'x') {
            gameConst.winner = 'x'
            gameConst.isWinner = true;
            return true;
        } else if (gameState.sq2 === 'x' && gameState.sq4 === 'x' && gameState.sq6 === 'x') {
            gameConst.winner = 'o'
            gameConst.isWinner = true;
            return true;
        } else if (gameState.sq2 === 'o' && gameState.sq4 === 'o' && gameState.sq6 === 'o') {
            gameConst.winner = 'o'
            gameConst.isWinner = true;
            return true;
        }else if (gameState.sq0 === 'o' && gameState.sq4 === 'o' && gameState.sq8 === 'o') {
            gameConst.winner = 'x'
            gameConst.isWinner = true;
            return true;
        } else if(gameState.turnCount === 8 ){
            gameConst.winner = 'tie'
            gameConst.isWinner = false;
            return true
        }
    }
}



function miniMax(board, depth, isMaximizing) {
   
    gameFn.checkGameEnd()
    let result = gameConst.winner
    console.log(result)
    if (result !== null) {
        
        return scores[result]
    }  

    if (isMaximizing) {
        let bestScore = -Infinity
        for (let key in board) {
            if (board[key] === null) {
                board[key] = 'x';
                let score = miniMax(board, depth + 1, false);
                board[key] = null
                bestScore = Math.max(score, bestScore)
            }
        }
        console.log(bestScore)
        return bestScore
    } else {
        let bestScore = Infinity
        for (let key in board) {
            if (board[key] === null) {
                board[key] = 'o';
                let score = miniMax(board, depth + 1, true);
                board[key] = null
                bestScore = Math.min(score, bestScore)
            }
        }
        return bestScore
    }        

}

gameFn.play()