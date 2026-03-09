function gameBoard() {
    const board = [1, 1, 2,
        3, 4, 5,
        6, 7, 8,];
    return { board }
}

function Player(mark) {
    const putMark = (gameboard, position) => {
        gameboard.board[position] = mark;
    }
    return { mark, putMark }
}

function playGame() {
    const board1 = gameBoard()
    const player1 = Player("X")
    const player2 = Player("O")
    let anyWinner = false
    let winnerMark = ""

    function winCheck() {
        const totalX = board1.board.filter(mark => mark === "X")
        const totalO = board1.board.filter(mark => mark === "O")

        if (board1.board[0] === board1.board[1] && board1.board[1] === board1.board[2]) {
            winnerMark = board1.board[0]
            anyWinner = true
            console.log(`This mark ${winnerMark} won!`)
        } else if (board1.board[3] === board1.board[4] && board1.board[4] === board1.board[5]) {
            winnerMark = board1.board[3]
            anyWinner = true
            console.log(`This mark ${winnerMark} won!`)
        } else if (board1.board[6] === board1.board[7] && board1.board[7] === board1.board[8]) {
            winnerMark = board1.board[7]
            anyWinner = true
            console.log(`This mark ${winnerMark} won!`)
        } else if (board1.board[0] === board1.board[4] && board1.board[4] === board1.board[8]) {
            winnerMark = board1.board[0]
            anyWinner = true
            console.log(`This mark ${winnerMark} won!`)
        } else if (board1.board[6] === board1.board[4] && board1.board[4] === board1.board[2]) {
            winnerMark = board1.board[4]
            anyWinner = true
            console.log(`This mark ${winnerMark} won!`)
        } else if (board1.board[0] === board1.board[3] && board1.board[3] === board1.board[6]) {
            winnerMark = board1.board[0]
            anyWinner = true
            console.log(`This mark ${winnerMark} won!`)
        } else if (board1.board[1] === board1.board[4] && board1.board[4] === board1.board[7]) {
            winnerMark = board1.board[1]
            anyWinner = true
            console.log(`This mark ${winnerMark} won!`)
        } else if (board1.board[2] === board1.board[5] && board1.board[5] === board1.board[8]) {
            winnerMark = board1.board[2]
            anyWinner = true
            console.log(`This mark ${winnerMark} won!`)
        } else if ((totalX.length === 5 && totalO.length === 4) || (totalX.length === 4 && totalO.length === 5)) {
            console.log("DRAWWW")
        }
    }
}

const boxes = document.querySelectorAll(".container div")
console.log(boxes)
boxes.forEach(box => {
    box.addEventListener("click", e => {
        
    })
})


playGame()