const gameboard = (function () {
    let board = [[null, null, null], [null, null, null], [null, null, null]];

    const getBoard = () => {
        console.log(board);
        return board;
    }

    const checkForWin = () => {
       // only check for the following win conditions if cell 0, 0 has a value in it
        if (board[0][0] !== null) {
            //check for win conditions including 0, 0
            if ((board[0][0] === board[0][1] && board[0][0] === board[0][2]) || (board[0][0] === board[0][1] && board[0][0] === board[0][2]) || (board[0][0] === board[1][0] && board[0][0] === board[2][0]) || (board[0][0] === board[1][1] && board[0][0] === board[2][2])) {
                return "You Win";
            } else if (board[1][0] !== null) {
                if (board[1][0] === board[1][1] && board[1][0] === board[1][2]) {
                    return "You Win";
                }
            } else if (board[2][0] !== null) {
                if (board[2][0] === board[2][1] || board[2][0] === board[2][2]) {
                    return "You Win";
                }
            }
        //check for win in second row
        } else if (board[1][0] !== null) {
            
            if (board[1][0] === board[1][1] && board[1][0] === board[1][2]) {
                return "You Win";
            }
        //check for win in third row or diagonal bottom left to top right
        } else if (board[2][0] !== null) {
            if ((board[2][0] == board[2][1] && board[2][0] === board[2][2]) || (board[2][0] === board[1][1] && board[2][0] === board[0][2])) {
                return "You Win";
            } 
        //check for win in second column
        } else if (board[0][1] !== null) {
            if (board[0][1] === board[1][1] && board[0][1] === board[2][1]) {
                return "You Win - 3 in a row in the 2nd column";
            }
        //check for win in third column
        } else if (board[0][2] !== null) {
            if (board[0][2] === board[1][2] && board[0][2] === board[2][2]) {
                return "You Win - 3 in a row in the 3rd column";
            }
        } 
        else {
            return "No winnner yet, keep playing bozo";
        }
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
    
    let playerTurn = players[0];
    
    //reset board to ensure default game state is set
    const resetGame = () => {
        gameboard.resetBoard();
        playerTurn = players[0];
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
            gameboard.getBoard();
                
            //call checkForWin function which contains the win conditions for the game
            console.log(gameboard.checkForWin());
                //if checkForWin, then declare winner and prompt user to play again
    
            //once the user has placed their piece, change playerTurn to be NOT the current value of playerTurn
            playerTurn = playerTurn === players[0] ? players[1] : players[0];
            console.log(`It is ${playerTurn.name}'s turn`);
        }
    }
    return { resetGame, playRound };
})();

//test case for a win in first row

console.log(gameboard.checkForWin());


