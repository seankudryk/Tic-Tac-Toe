const gameboard = (function () {
    let board = [[null, null, null], [null, null, null], [null, null, null]];

    const getBoard = () => board;

    const checkForWin = () => {
       // only check for the following win conditions if cell 0, 0 has a value in it
        if ((board[0][0] !== null) && ((board[0][0] === board[0][1] && board[0][0] === board[0][2]) || (board[0][0] === board[1][0] && board[0][0] === board[2][0]) || (board[0][0] === board[1][1] && board[0][0] === board[2][2]))) {
            console.log("A 0,0 win condition was triggered");
            playGame.toggleGameFinished();
            return playGame.resetGame("win");
        }
        //check for win in second row
        else if ((board[1][0] !== null) && ((board[1][0] === board[1][1] && board[1][0] === board[1][2]))) {
            console.log("A 1,0 win condition was triggered");
            playGame.toggleGameFinished();
            return playGame.resetGame("win");
        }
        //check for win in third row or diagonal bottom left to top right
        else if ((board[2][0] !== null) && ((board[2][0] == board[2][1] && board[2][0] === board[2][2]) || (board[2][0] === board[1][1] && board[2][0] === board[0][2]))) { 
            console.log("A 2,0 win condition was triggered");
            playGame.toggleGameFinished();
            return playGame.resetGame("win");
        } 
        //check for win in second column
        else if ((board[0][1] !== null) && ((board[0][1] === board[1][1] && board[0][1] === board[2][1]))) {
            console.log("A 0,1 win condition was triggered");
            playGame.toggleGameFinished();
            return playGame.resetGame("win");
        }
        //check for win in third column
        else if ((board[0][2] !== null) && (board[0][2] === board[1][2] && board[0][2] === board[2][2])) {
            console.log("A 0,2 win condition was triggered");
            playGame.toggleGameFinished();
            return playGame.resetGame("win");
        }        
        //extra conditonal to check when all indexes of board !null - draw is declared, game is reset
        else if (board.every(row => row.every(cell => cell !== null))) {
            console.log("tie condition triggered");
            playGame.toggleGameFinished();
            return playGame.resetGame("draw");
        //tell players to continue playing the game as no win has been declared yet
        } else {
            console.log("No win yet, keep playing");
        }
    }

    const resetBoard = () => {
        board = [[null, null, null], [null, null, null], [null, null, null]];
        displayController.resetDisplay();
    }

    const getCellValue = (row, column) => {
        return board[row][column];
    }

    const updateBoard = (row, column, symbol) => {
        if (board[row][column] !== null) {
            return false;
        } else {
            return board[row][column] = symbol;
        }
    }
    
    return { getBoard, checkForWin, resetBoard, updateBoard, getCellValue };
})();   

const players = [
    {
        name: "playerOne",
        symbol: "X",
        wins: 0,
        color: "green",
    },
    {
        name: "playerTwo",
        symbol: "O",
        wins: 0,
        color: "red",
    }
];

const playGame = (function () {
    //write function to createUser, taking a playerName input, and a playerSymbol input
    let playerTurn = players[0];
    let gameFinished = false;
    
    //reset board to ensure default game state is set
    const resetGame = (endCondition) => {
        if (endCondition === "win") {
            displayController.updateGameOutcome(endCondition);
            console.log(`${playerTurn.name} Won!`);
            playGame.addPlayerWin();
            displayController.updatePlayerScore(playerTurn);
        } else if (endCondition === "draw") {
            displayController.updateGameOutcome(endCondition);
            console.log(`It's a draw! If this isn't the case at the end of every single game, ${players[1].name} needs to shape up.`);
        } else if (endCondition === "reset") {
            displayController.updateGameOutcome(endCondition);
            toggleGameFinished();
        }
        toggleGameFinished();
        playerTurn = players[1];
        gameboard.resetBoard();
    }

    //initiate a player turn - we will call this method to "take turns" and actually play the game in console
    const playRound = (row, column) => {
        //check that the selected cell on the gameboard is not aleady selected by a player
        if (gameboard.updateBoard(row, column, playerTurn.symbol) === false) {
            console.log("Not a valid entry");
            return;
        } else {
            gameboard.updateBoard(row, column, playerTurn.symbol);
            console.log(`${playerTurn.name} chose Row ${row + 1}, Column ${column + 1} for ${playerTurn.symbol}`)
            console.log(gameboard.getBoard());

            gameboard.checkForWin();

            if (gameFinished === false) {
                playerTurn = playerTurn === players[0] ? players[1] : players[0];
                displayController.updateCurrentTurn();
                console.log(`It is ${playerTurn.name}'s turn`);   
            }
        }
    }

    const toggleGameFinished = () => {
        gameFinished = !gameFinished;
        console.log(`gameFinished value is now ${gameFinished}`);
    }

    const getPlayerTurn = (key) => {
        if (key === "name") {
            return playerTurn.name;
        } else if (key === "wins") {
            return playerTurn.wins;
        }
    }
    const addPlayerWin = () => playerTurn.wins++;

    return { resetGame, playRound, getPlayerTurn, addPlayerWin, toggleGameFinished };
})();


const displayController = (function () {
    const gameBoard = document.querySelector(".game-board");
    const submitButton = document.querySelector("#submit-button");
    const resetButton = document.querySelector("#reset-button");
    const playerOneNameInput = document.querySelector("#player-one-name-input");
    const playerTwoNameInput = document.querySelector("#player-two-name-input");
    const gameTurn = document.querySelector("#game-turn");
    const gameOutcome = document.querySelector("#game-outcome");
    const playerOneScoreName = document.querySelector("#player-one-score-name");
    const playerTwoScoreName = document.querySelector("#player-two-score-name");
    const playerOneScore = document.querySelector("#player-one-score");
    const playerTwoScore = document.querySelector("#player-two-score");
    
    submitButton.addEventListener("click", () => {
        players[0].name = playerOneNameInput.value;
        players[1].name = playerTwoNameInput.value;
        playerOneNameInput.value = "";
        playerTwoNameInput.value = "";
        playerOneScoreName.textContent = players[0].name;
        playerTwoScoreName.textContent = players[1].name;
    })

    resetButton.addEventListener("click", () => {
        playGame.resetGame("reset");
    })
    
    const createCell = (count) => {
        const addCell = document.createElement("div");
        addCell.classList.add("board-cell"); 
        addCell.setAttribute("id", `${count + 1}`);
        gameBoard.appendChild(addCell);
    }

    const updateDisplay = () => {
        for (let i = 0; i < 9; i++) {
            createCell(i);
        }
    }

    const resetDisplay = () => {
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild);
        }
        updateDisplay();
    }

    const updatePlayerScore = (player) => {
        if(players.indexOf(player) === 0) {
            playerOneScore.textContent = players[0].wins;
        } else if (players.indexOf(player) === 1) {
            playerTwoScore.textContent = players[1].wins;
        };
    }

    gameBoard.addEventListener("click", (e) => {
        let target = e.target;
        cellMap(target);
        updateCurrentTurn();
    });

    const updateCurrentTurn = () => gameTurn.innerText = `It is ${playGame.getPlayerTurn("name")}'s turn`;

    const updateGameOutcome = (winCondition) => {
        if (winCondition === "win") {
            gameOutcome.innerText = `${playGame.getPlayerTurn("name")} wins!`;
        } else if (winCondition === "draw") {
            gameOutcome.innerText = `It's a Draw! You are both losers!`
        } else if (winCondition === "reset") {
            gameOutcome.innerText = "The game has been reset";
        }
    }
 
    //we will use this function to link the gameboard array indexes (which checks for win conditions and stores the actual turn data of the game) to the user interface through referencing each board cell's id value
    const cellMap = (target) => {
        if (target.id === "1") {
            playGame.playRound(0, 0);
            target.innerText = gameboard.getCellValue(0, 0);
        } else if (target.id === "2") {
            playGame.playRound(0, 1);
            target.innerText = gameboard.getCellValue(0, 1);
        } else if (target.id === "3") {
            playGame.playRound(0, 2);
            target.innerText = gameboard.getCellValue(0, 2);
        } else if (target.id === "4") {
            playGame.playRound(1, 0);
            target.innerText = gameboard.getCellValue(1, 0);
        } else if (target.id === "5") {
            playGame.playRound(1, 1);
            target.innerText = gameboard.getCellValue(1, 1);
        } else if (target.id === "6") {
            playGame.playRound(1, 2);
            target.innerText = gameboard.getCellValue(1, 2);
        } else if (target.id === "7") {
            playGame.playRound(2, 0);
            target.innerText = gameboard.getCellValue(2, 0);
        } else if (target.id === "8") {
            playGame.playRound(2, 1);
            target.innerText = gameboard.getCellValue(2, 1);
        } else if (target.id === "9") {
            playGame.playRound(2, 2);
            target.innerText = gameboard.getCellValue(2, 2);
        }
    }
    
    return { createCell, updateDisplay, updateCurrentTurn, resetDisplay, updateGameOutcome, updatePlayerScore };
})();

displayController.updateDisplay();
console.log(playGame.getPlayerTurn("index"));
