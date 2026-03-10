/* DOM */
const boxes = document.querySelectorAll(".container div")
const display = document.querySelector(".display")
const dialog = document.querySelector(".endGameDialog")
const dialogMsg = document.querySelector(".endGameDialog>div")
const playAgainBtn = document.querySelector(".endGameDialog>button")
const startDialog = document.querySelector(".startGameDialog")
const p1Input = document.querySelector("#player1")
const p2Input = document.querySelector("#player2")
const p1Enter = document.querySelector(".player1Name>button")
const p2Enter = document.querySelector(".player2Name>button")
const playBtn = document.querySelector(".startGameDialog>.play")
const displayP1Name = document.querySelector(".playerBox.p1")
const displayP2Name = document.querySelector(".playerBox.p2")

let p1Name = "Player 1"
let p2Name = "Player 2"

function startPage() {
    startDialog.showModal()
    p1Enter.addEventListener("click", () => {
        if (p1Input.value === "") {
            p1Name = "Player 1"
        } else {
            p1Name = p1Input.value
            displayP1Name.textContent = p1Name
        }
    })
    p2Enter.addEventListener("click", () => {
        if (p2Input.value === "") {
            p2Name = "Player 2"
        } else {
            p2Name = p2Input.value
            displayP2Name.textContent = p2Name
        }
    })
    playBtn.addEventListener("click", () => {
        startDialog.close()
        playGame() 
    })

}

function gameBoard() {
    const board = [1, 1, 2,
        3, 4, 5,
        6, 7, 8];
    return { board }
}

function Player(mark, name) {
    const putMark = (gameboard, position) => {
        gameboard.board[position] = mark
        takenSpots.push(position)
    }
    return { mark, name, putMark }
}

function playGame() {
    const takenSpots = []   /* keep track of boxes that are occupied */
    
    const board1 = gameBoard()
    const player1 = Player("X", p1Name)
    const player2 = Player("O", p2Name)
    let winnerMark = ""
    let player1Turn = true

    displayTurn()

    /* Check if there is any winner */
    function winGame(winnerMark) {
        if (winnerMark === player1.mark) {
            dialogMsg.textContent = p1Name + " wins the game!"
        } else if (winnerMark === player2.mark) {
            dialogMsg.textContent = p2Name + " wins the game!"
        } else {
            dialogMsg.textContent = "It's a Tie!"
        }
        playAgainBtn.addEventListener("click", e => {
            window.location.href = "./index.html"
            dialog.close()
        })
        dialog.showModal()
    }

    /* display for the current turn */
    function displayTurn() {
        if (player1Turn === true) {

            display.textContent = p1Name + "'s turn!"
            display.style.color = "green"
            display.style.textShadow = "0.2px 0.2px 1.2px rgba(110, 3, 3, 0.6)"
            display.style.boxShadow = "2px 2px 8px rgb(7, 201, 59)"
        } else {
            display.textContent = p2Name + "'s turn!"
            display.style.color = "rgba(198, 26, 26, 0.86)"
            display.style.textShadow = "0.2px 0.2px 3px rgba(6, 100, 38, 0.4)"
            display.style.boxShadow = "2px 2px 8px rgba(217, 24, 24)"
        }
    }


    /* main logic for checking wins, and draws */
    function winCheck() {
        const totalX = board1.board.filter(mark => mark === "X")
        const totalO = board1.board.filter(mark => mark === "O")

        if (board1.board[0] === board1.board[1] && board1.board[1] === board1.board[2]) {
            winnerMark = board1.board[0]
            setTimeout(() => winGame(winnerMark), 300)

        } else if (board1.board[3] === board1.board[4] && board1.board[4] === board1.board[5]) {
            winnerMark = board1.board[3]
            setTimeout(() => winGame(winnerMark), 300)

        } else if (board1.board[6] === board1.board[7] && board1.board[7] === board1.board[8]) {
            winnerMark = board1.board[7]
            setTimeout(() => winGame(winnerMark), 300)

        } else if (board1.board[0] === board1.board[4] && board1.board[4] === board1.board[8]) {
            winnerMark = board1.board[0]
            setTimeout(() => winGame(winnerMark), 300)

        } else if (board1.board[6] === board1.board[4] && board1.board[4] === board1.board[2]) {
            winnerMark = board1.board[4]
            setTimeout(() => winGame(winnerMark), 300)

        } else if (board1.board[0] === board1.board[3] && board1.board[3] === board1.board[6]) {
            winnerMark = board1.board[0]
            setTimeout(() => winGame(winnerMark), 300)

        } else if (board1.board[1] === board1.board[4] && board1.board[4] === board1.board[7]) {
            winnerMark = board1.board[1]
            setTimeout(() => winGame(winnerMark), 300)

        } else if (board1.board[2] === board1.board[5] && board1.board[5] === board1.board[8]) {
            winnerMark = board1.board[2]
            setTimeout(() => winGame(winnerMark), 300)

        } else if ((totalX.length === 5 && totalO.length === 4) || (totalX.length === 4 && totalO.length === 5)) {
            setTimeout(() => winGame(winnerMark), 300)
        }
    }

    /* Acutal process of marking "Os and Xs" in the boxes */
    boxes.forEach(box => {
        box.addEventListener("click", e => {
            /* with each click in a box, get the dataset, which is the index
               for the board array in the gameboard object */
            const boxIndex = e.target.dataset.index

            if (takenSpots.includes(boxIndex)) {

            } else {
                /* check if its player1s turn or player2s turn */
                if (player1Turn === true) {
                    /* use the putMark method, to inject a mark 
                    on the index the clicked box */
                    player1.putMark(board1, boxIndex)
                    e.target.textContent = player1.mark /* display the mark in the box */
                    e.target.style.color = "green"
                    e.target.style.textShadow = "0.2px 0.2px 1.2px rgba(110, 3, 3, 0.6)"
                    winCheck() /* do a win check after injecting */

                    player1Turn = !player1Turn /*change the state to signal its player 2's turn */
                    displayTurn()

                } else if (player1Turn === false) {
                    player2.putMark(board1, boxIndex)
                    e.target.textContent = player2.mark
                    e.target.style.color = "red"
                    e.target.style.textShadow = "0.3px 0.3px 5px rgba(6, 100, 38, 0.8)"
                    winCheck()

                    player1Turn = !player1Turn
                    displayTurn()
                }
            }
        })
    })
}

startPage()