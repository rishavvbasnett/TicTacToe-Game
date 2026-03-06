function gameBoard() {
    const board = [1,1,2,
                   3,4,5,
                   6,7,8,];
    return {board}
}

function Player(mark) {
    const putMark = (gameboard, position) => {
        gameboard.board[position] = mark;
    }
    return {mark, putMark}
}

function playGame() {
    const board1 = gameBoard()
    const player1 = Player("X")
    const player2 = Player("O")
    let anyWinner = false

    function winCheck() {
        if ((board1.board[0]===board1.board[1] && board1.board[1]===board1.board[2])
            || (board1.board[3]===board1.board[4] && board1.board[4]===board1.board[5])
            || (board1.board[6]===board1.board[7] && board1.board[7]===board1.board[8])
            || (board1.board[0]===board1.board[4] && board1.board[4]===board1.board[8])
            || (board1.board[6]===board1.board[4] && board1.board[4]===board1.board[2])
        ) {
            anyWinner = true
            console.log("There is a winner!")
            console.log(board1.board)
        } else if (board1.board.length===9)
            {
            console.log("DRAW")
        }
    }
    player1.putMark(board1, 0)
    winCheck()
    player1.putMark(board1, 0)
    winCheck()
    player1.putMark(board1, 0)
    winCheck()
}

playGame()