const gameboard = (function () {
    let board = [["x", "x", null], [null, null, null], [null, null, null]];

    const getBoard = () => {
        return board;
    }

    const checkForWin = () => {
       // only check for the following win conditions if cell 0, 0 has a value in it
        if (board[0][0] !== null) {
            //check for win conditions including 0, 0
            if ((board[0][0] === board[0][1] && board[0][0] === board[0][2]) || (board[0][0] === board[0][1] && board[0][0] === board[0][2]) || (board[0][0] === board[1][0] && board[0][0] === board[2][0]) || (board[0][0] === board[1][1] && board[0][0] === board[2][2])) {
                return true;
            } else if (board[1][0] !== null) {
                if (board[1][0] === board[1][1] && board[1][0] === board[1][2]) {
                    return playGame.resetGame();
                }
            } else if (board[2][0] !== null) {
                if (board[2][0] === board[2][1] || board[2][0] === board[2][2]) {
                    return playGame.resetGame();
                }
            }
        //check for win in second row
        } else if (board[1][0] !== null) {

            if (board[1][0] === board[1][1] && board[1][0] === board[1][2]) {
                return playGame.resetGame();
            }
        //check for win in third row or diagonal bottom left to top right
        } else if (board[2][0] !== null) {
            if ((board[2][0] == board[2][1] && board[2][0] === board[2][2]) || (board[2][0] === board[1][1] && board[2][0] === board[0][2])) {
                return playGame.resetGame();
            } 
        //check for win in second column
        } else if (board[0][1] !== null) {
            if (board[0][1] === board[1][1] && board[0][1] === board[2][1]) {
                return playGame.resetGame();
            }
        //check for win in third column
        } else if (board[0][2] !== null) {
            if (board[0][2] === board[1][2] && board[0][2] === board[2][2]) {
                return playGame.resetGame();
            }
        } 
        else {
            return "No winnner yet, keep playing bozo";
        }

        //extra conditonal to check when all indexes of board !null - draw is declared, game is reset
    }

    const resetBoard = () => {
        board = [[null, null, null], [null, null, null], [null, null, null]];
    }
    
    const updateBoard = (row, column, symbol) => {
        if (board[row][column] !== null) {
            console.log("Not a valid selection");
            return;
        } else {
            return board[row][column] = symbol;
        }
    }
    return { getBoard, checkForWin, resetBoard, updateBoard };
})();   

const players = [
    {
        name: "playerOne",
        symbol: "x"
    },
    {
        name: "playerTwo",
        symbol: "o"
    }
];

const playGame = (function () {
    //write function to createUser, taking a playerName input, and a playerSymbol input
    let gameWon = false;
    let playerTurn = players[0];
    
    //reset board to ensure default game state is set
    const resetGame = () => {
        gameWon = true;
        console.log(`${playerTurn.name} Won!`);
        playerTurn = players[0];
        gameboard.resetBoard();
    }

    //initiate a player turn - we will call this method to "take turns" and actually play the game in console
    const playRound = (row, column) => {
        if (row === undefined || column === undefined) {
            console.log("Please enter both a row and column value");
            return;
        } else {
            //which space on the board does the player wish to place their symbol?
            gameboard.updateBoard(row, column, playerTurn.symbol);
            console.log(`${playerTurn.name} chose Row ${row + 1}, Column ${column + 1} for ${playerTurn.symbol}`)
            console.log(gameboard.getBoard());
                
            //call checkForWin function which contains the win conditions for the game
            if (gameboard.checkForWin()) {
                playGame.resetGame();
            } else {
                playerTurn = playerTurn === players[0] ? players[1] : players[0];
                console.log(`It is ${playerTurn.name}'s turn`);
            }
                //if checkForWin, then declare winner and prompt user to play again

            //once the user has placed their piece, change playerTurn to be NOT the current value of playerTurn
            // if (gameWon = false && row && column) {
                
            // }
        }
    }
    const getPlayerTurn = () => playerTurn;
    const getGameWon = () => console.log(gameWon);

    return { resetGame, playRound, getPlayerTurn, getGameWon };
})();




