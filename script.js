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


//produce the default game board with all indexes set to null
gameboard.resetBoard(); 

const createPlayer = () => {

}