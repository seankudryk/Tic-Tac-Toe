//gameboard object storing methods to get, set, and update the gameboard
const gameboard = (function () {
    let board = [];

    const getBoard = () => board;

    const resetBoard = () => {
        board = [[null, null, null], [null, null, null], [null, null, null]];
        console.log(board);
    }

    const updateBoard = () => {
        console.log("This is a placeholder function");
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

//gameSetup function to createUser(s) and resetBoard

const playGame = (function () {
    //write function to createUser, taking a playerName input, and a playerSymbol input

    //reset board to ensure default game state is set
    gameboard.resetBoard();

    //set playerOne to go first
    let playerTurn = players[0];

    //initiate a player turn - we will call this method to "take turns" and actually play the game in console
    const playRound = () => {
        console.log(`it is ${playerTurn.name}'s turn`);
        //what do we need to check?
            //which player's turn is it?
            //which space on the board does the player wish to place their symbol?
            
            

            //once the user has placed their piece, change playerTurn to be NOT the current value of playerTurn
            playerTurn = playerTurn === players[0] ? players[1] : players[0];
    }
        return { playRound };
    }
)();

console.log(playGame.playRound());

