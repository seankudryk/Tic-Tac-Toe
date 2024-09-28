const gameboard = (function () {
    let board = [["x", "x", "x"], [null, null, null], [null, null, null]];

    const getBoard = () => {
        console.log(board);
        return board;
    }

    const checkForWin = () => {
        //only check for the following win conditions if cell 0, 0 has a value in it
        if (board[0][0] !== null) {
            //check for win conditions including 0, 0
            if 
                //check for win in first row
                ((board[0][0] === board[0][1] && board[0][0] === board[0][2]) ||
                //check for win in first column
                (board[0][0] === board[1][0] && board[0][0] === board[2][0]) ||
                //check for win in diagonal Top Left to Bottom Right
                (board[0][0] === board[1][1] && board[0][0] === board[2][2])) 
            {
                return "You Win!"
            }
            
            else if 
                //check for win in second row
                (board[1][0] === board[1][1] && board[1][0] === board[1][2])
            {
                return "You Win!";
            }
            else if
                //check for win in third row 
                ((board[2][0] === board[2][1] && board[2][0] === board[2][2]) ||
                //check for win diagonal from bottom left to top right
                (board[2][0] === board[1][1] && board[2][0] === board[0][2])    
            )
            {
                return "You Win";
            }
            else if
                //check for win in second column
                ((board[0][1]) === (board[1][1]) && (board[0][1] === board[2][1]))
                //check for win in third column

            {
                return "You Win"
            }

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
            gameboard.checkForWin()
                //if checkForWin, then declare winner and prompt user to play again
    
            //once the user has placed their piece, change playerTurn to be NOT the current value of playerTurn
            playerTurn = playerTurn === players[0] ? players[1] : players[0];
            console.log(`It is ${playerTurn.name}'s turn`);
        }
    }
    return { resetGame, playRound };
})();


// playGame.playRound(0, 1);
// playGame.playRound(0, 2);

