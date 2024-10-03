const gameboard = (function () {
    let board = [["x", "q", "s"], ["a", "b", "c"], ["d", null, "f"]];

    const getBoard = () => board;

    const checkForWin = () => {
       // only check for the following win conditions if cell 0, 0 has a value in it
        if ((board[0][0] !== null) && ((board[0][0] === board[0][1] && board[0][0] === board[0][2]) || (board[0][0] === board[1][0] && board[0][0] === board[2][0]) || (board[0][0] === board[1][1] && board[0][0] === board[2][2]))) {
            console.log("A 0,0 win condition was triggered");
            return playGame.resetGame("win");
        }
        //check for win in second row
        else if ((board[1][0] !== null) && ((board[1][0] === board[1][1] && board[1][0] === board[1][2]))) {
            console.log("A 1,0 win condition was triggered");
            return playGame.resetGame("win");
        }
        //check for win in third row or diagonal bottom left to top right
        else if ((board[2][0] !== null) && ((board[2][0] == board[2][1] && board[2][0] === board[2][2]) || (board[2][0] === board[1][1] && board[2][0] === board[0][2]))) { 
            console.log("A 2,0 win condition was triggered");
            return playGame.resetGame("win");
        } 
        //check for win in second column
        else if ((board[0][1] !== null) && ((board[0][1] === board[1][1] && board[0][1] === board[2][1]))) {
            console.log("A 0,1 win condition was triggered");
            return playGame.resetGame("win");
        }
        //check for win in third column
        else if ((board[0][2] !== null) && (board[0][2] === board[1][2] && board[0][2] === board[2][2])) {
            console.log("A 0,2 win condition was triggered");
            return playGame.resetGame("win");
        }        
        //extra conditonal to check when all indexes of board !null - draw is declared, game is reset
        else if (board.every(row => row.every(cell => cell !== null))) {
            return playGame.resetGame("draw");
        //tell players to continue playing the game as no win has been declared yet
        } else {
            return false;
        }
    }

    const resetBoard = () => {
        board = [[null, null, null], [null, null, null], [null, null, null]];
    }
    
    const updateBoard = (row, column, symbol) => {
        if (board[row][column] !== null) {
            return false;
        } else {
            return board[row][column] = symbol;
        }
    }
    return { getBoard, checkForWin, resetBoard, updateBoard };
})();   

const players = [
    {
        name: "playerOne",
        symbol: "X",
        wins: 0
    },
    {
        name: "playerTwo",
        symbol: "O",
        wins: 0
    }
];

const playGame = (function () {
    //write function to createUser, taking a playerName input, and a playerSymbol input
    let playerTurn = players[0];
    
    //reset board to ensure default game state is set
    const resetGame = (endCondition) => {
        if (endCondition === "win") {
            console.log(`${playerTurn.name} Won!`);
            playGame.addPlayerWin();
        } else if (endCondition === "draw") {
            console.log(`It's a draw! If this isn't the case at the end of every single game, ${players[1].name} needs to shape up.`);
        }
        playerTurn = players[0];
        gameboard.resetBoard();
    }

    //initiate a player turn - we will call this method to "take turns" and actually play the game in console
    const playRound = (row, column) => {
        //check that a row and column value are given, exits the function if not
        if (row === undefined || column === undefined) {
            console.log("Please enter both a row and column value");
            return;
        //check that the selected cell on the gameboard is not aleady selected by a player
        } else if (gameboard.updateBoard(row, column, playerTurn.symbol) === false) {
            console.log("Not a valid entry");
            return;
        } else {
            gameboard.updateBoard(row, column, playerTurn.symbol)
            console.log(`${playerTurn.name} chose Row ${row + 1}, Column ${column + 1} for ${playerTurn.symbol}`)
            console.log(gameboard.getBoard());

            if (gameboard.checkForWin() !== false) {
                console.log("you made it");
                return gameboard.checkForWin();
            } else {
                playerTurn = playerTurn === players[0] ? players[1] : players[0];
                console.log(`It is ${playerTurn.name}'s turn`);
                console.log("next player turn was triggered");         
            }
        }
    }
    const getPlayerTurn = () => playerTurn;
    const addPlayerWin = () => playerTurn.wins++;

    return { resetGame, playRound, getPlayerTurn, addPlayerWin };
})();
    



