/* DOM */
const boxes = document.querySelectorAll(".container div")
const display = document.querySelector(".display")
const dialog = document.querySelector("dialog")
const dialogMsg = document.querySelector("dialog>div")
const playAgainBtn = document.querySelector("dialog>button")

const takenSpots = []   /* keep track of boxes that are occupied */


function gameBoard() {
    const board = [1, 1, 2,
                   3, 4, 5,
                   6, 7, 8];
    return { board }
}

function Player(mark) {
    const putMark = (gameboard, position) => {
        gameboard.board[position] = mark
        takenSpots.push(position)
    }
    return { mark, putMark }
}

function playGame() {
    const board1 = gameBoard()
    const player1 = Player("X")
    const player2 = Player("O")
    let winnerMark = ""
    let player1Turn = true

    /* Check if there is any winner */
    function winGame(winnerMark) {
        if (winnerMark === player1.mark) {
            dialogMsg.textContent = "Player 1 wins the game!"
        } else if (winnerMark === player2.mark) {
            dialogMsg.textContent = "Player 2 wins the game!"
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
    function displayTurn () {
    if (player1Turn === true) {
        display.textContent = "Player 1's turn!"
        display.style.color = "green"
        display.style.textShadow = "0.2px 0.2px 1.2px rgba(110, 3, 3, 0.6)"
        display.style.boxShadow = "2px 2px 8px rgb(7, 201, 59)"
    } else {
        display.textContent = "Player 2's turn!"
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
            setTimeout(()=>winGame(winnerMark), 300)
 
        } else if (board1.board[3] === board1.board[4] && board1.board[4] === board1.board[5]) {
            winnerMark = board1.board[3]
            setTimeout(()=>winGame(winnerMark), 300)

        } else if (board1.board[6] === board1.board[7] && board1.board[7] === board1.board[8]) {
            winnerMark = board1.board[7]
            setTimeout(()=>winGame(winnerMark), 300)

        } else if (board1.board[0] === board1.board[4] && board1.board[4] === board1.board[8]) {
            winnerMark = board1.board[0]
            setTimeout(()=>winGame(winnerMark), 300)

        } else if (board1.board[6] === board1.board[4] && board1.board[4] === board1.board[2]) {
            winnerMark = board1.board[4]
            setTimeout(()=>winGame(winnerMark), 300)

        } else if (board1.board[0] === board1.board[3] && board1.board[3] === board1.board[6]) {
            winnerMark = board1.board[0]
            setTimeout(()=>winGame(winnerMark), 300)

        } else if (board1.board[1] === board1.board[4] && board1.board[4] === board1.board[7]) {
            winnerMark = board1.board[1]
            setTimeout(()=>winGame(winnerMark), 300)

        } else if (board1.board[2] === board1.board[5] && board1.board[5] === board1.board[8]) {
            winnerMark = board1.board[2]
            setTimeout(()=>winGame(winnerMark), 300)

        } else if ((totalX.length === 5 && totalO.length === 4) || (totalX.length === 4 && totalO.length === 5)) {
            setTimeout(()=>winGame(winnerMark), 300)
        }
    }

    displayTurn()

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
        }})
    })
}

playGame() 