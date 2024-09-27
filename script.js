const gameboard = (function () {
    let board = [];

    const getBoard = () => {
        console.log(board);
        board;
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
    return { getBoard, resetBoard, updateBoard };
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

    //reset board to ensure default game state is set
    gameboard.resetBoard();

    //set playerOne to go first
    let playerTurn = players[0];

    //initiate a player turn - we will call this method to "take turns" and actually play the game in console
    const playRound = (row, column) => {
        // if (!row || !column) {
        //     console.log("Please enter both a row and column value");
        //     return;
        // }

        console.log(`It is ${playerTurn.name}'s turn`);
        //which space on the board does the player wish to place their symbol?
        gameboard.updateBoard(row, column, playerTurn.symbol);
            
        //call checkForWin function which contains the win conditions for the game
            //if checkForWin, then declare winner and prompt user to play again

        //once the user has placed their piece, change playerTurn to be NOT the current value of playerTurn
        playerTurn = playerTurn === players[0] ? players[1] : players[0];
    }
        return { playRound };
    }
)();

gameboard.getBoard();
// playGame.playRound(1, 2);
// playGame.playRound(0, 1);
// playGame.playRound(0, 2);
// gameboard.getBoard();

