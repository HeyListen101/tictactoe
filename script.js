const gameBoard = (function (){
    let board = [
        [null,null,null],
        [null,null,null],
        [null,null,null],
    ];

    let playerTurn = 1;
    let gameOver = false;

    const play = (x,y) => {
        if (board[x][y] == null && !gameOver) {
            if (playerTurn % 2) {
                domConn.playerTurnCard.innerHTML = "<div>" + playerTwo.name + "'s Turn</div>";
                board[x][y] = playerOne.marker;
                if (checkBoard()) {
                    domConn.playerTurnCard.innerHTML = "<div>" + playerOne.name + " Wins</div>";
                    gameOver = true;
                }
            } else {
                domConn.playerTurnCard.innerHTML = "<div>" + playerOne.name + "'s Turn</div>";
                board[x][y] = playerTwo.marker;
                if (checkBoard()) {
                    domConn.playerTurnCard.innerHTML = "<div>" + playerTwo.name + " Wins</div>";
                    gameOver = true;
                }
            }

            domConn.display(board);
            playerTurn++;

            if (playerTurn == 10 && !gameOver) {
                domConn.playerTurnCard.innerHTML = "<div>It's a Draw</div>";
                gameOver = true;
            }
        }
    };

    const restart = () => {
        board = [
            [null,null,null],
            [null,null,null],
            [null,null,null],
        ];
        playerTurn = 1;
        gameOver = false;
        domConn.playerTurnCard.innerHTML = "<div>" + playerOne.name + "'s Turn</div>";
        domConn.display(board);
    };

    const checkBoard = () => {
        if ((board[0][0] == board[0][1] && board[0][1] == board[0][2]) && board[0][0] != null) {
            return true;
        }
        if ((board[1][0] == board[1][1] && board[1][1] == board[1][2]) && board[1][0] != null) {
            return true;
        }
        if ((board[2][0] == board[2][1] && board[2][1] == board[2][2]) && board[2][0] != null) {
            return true;
        }
        if ((board[0][0] == board[1][0] && board[1][0] == board[2][0]) && board[0][0] != null) {
            return true;
        }
        if ((board[0][1] == board[1][1] && board[1][1] == board[2][1]) && board[0][1] != null) {
            return true;
        }
        if ((board[0][2] == board[1][2] && board[1][2] == board[2][2]) && board[0][2] != null) {
            return true;
        }
        if ((board[0][0] == board[1][1] && board[1][1] == board[2][2]) && board[1][1] != null) {
            return true;
        }
        if ((board[0][2] == board[1][1] && board[1][1] == board[2][0]) && board[1][1] != null) {
            return true;
        }

        return false;
    };
    
    return {board, play, restart};
})();

const domConn = (function (){
    let cells = [
        [document.getElementById("a"), document.getElementById("b"), document.getElementById("c")],
        [document.getElementById("d"), document.getElementById("e"), document.getElementById("f")],
        [document.getElementById("g"), document.getElementById("h"), document.getElementById("i")],
    ];

    const playerTurnCard = document.getElementById("playerTurn");

    let cellsList = document.querySelectorAll(".cell");

    cellsList.forEach(function(cell) {
        cell.addEventListener("click", () => {
            gameBoard.play(Math.floor((cell.id.charCodeAt(0) - 97) / 3), (cell.id.charCodeAt(0) - 97) % 3);
        });
    });

    const display = (newBoard) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (newBoard[i][j] == "X")
                    cells[i][j].innerHTML = "<img src='xMark.svg'>";
                else if (newBoard[i][j] == "O")
                    cells[i][j].innerHTML = "<img src='oMark.svg'>";
                else
                    cells[i][j].innerHTML = "";
            }
        }
    };

    const newGame = document.getElementById("newGame");
    newGame.addEventListener("click", () => {
        gameBoard.restart();
        dialog.showModal();
    });

    const restart = document.getElementById("restart");
    restart.addEventListener("click", () => {
        gameBoard.restart();
    });

    const playerOneFld = document.getElementById("playerOneFld");
    const playerTwoFld = document.getElementById("playerTwoFld");
    const dialog = document.querySelector("dialog");
    dialog.addEventListener("close", () => {
        playerOne.name = playerOneFld.value;
        playerTwo.name = playerTwoFld.value;
        playerTurnCard.innerHTML = "<div>" + playerOne.name + "'s Turn</div>";
    });

    dialog.showModal();

    return {cells, display, playerTurnCard};
})();

const playerOne = (function (){
    let name = "Player One";
    let marker = "X";

    return {name, marker};
})();

const playerTwo = (function (){
    let name = "Player Two";
    let marker = "O";

    return {name, marker};
})();