const gameboard = (function () {
    let board = [];

    const getBoard = () => {
        console.log(board);
        return board;
    }

    const checkForWin = () => {
        //console.log(gameboard.getCell(0, 0), gameboard.getCell(0, 1), gameboard.getCell(0, 2));
        // if (gameboard.getCell(0, 0) !== null) {
        //     //check if all values in the same row are equal to value of .getCell(0, 0);
        //     if (gameboard.getCell(0, 0) === gameboard.getCell(0, 1) && (gameboard.getCell(0, 0) === gameboard.getCell(0, 2))) {
        //         return "You Win!"
        //     }
        // }
        gameboard.getCell(1, 2);
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

    const checkForWin = () => {
        //console.log(gameboard.getCell(0, 0), gameboard.getCell(0, 1), gameboard.getCell(0, 2));
        // if (gameboard.getCell(0, 0) !== null) {
        //     //check if all values in the same row are equal to value of .getCell(0, 0);
        //     if (gameboard.getCell(0, 0) === gameboard.getCell(0, 1) && (gameboard.getCell(0, 0) === gameboard.getCell(0, 2))) {
        //         return "You Win!"
        //     }
        // }
        gameboard.getCell(1, 2);
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
                //if checkForWin, then declare winner and prompt user to play again
    
            //once the user has placed their piece, change playerTurn to be NOT the current value of playerTurn
            playerTurn = playerTurn === players[0] ? players[1] : players[0];
            console.log(`It is ${playerTurn.name}'s turn`);
        }
    }
    return { resetGame, checkForWin, playRound };
})();


// playGame.playRound(0, 1);
// playGame.playRound(0, 2);
playGame.checkForWin();

