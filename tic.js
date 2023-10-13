const board = document.querySelector('.board');

for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
    }
}

const cellElement = document.querySelectorAll('.cell');
const winningTextElement = document.querySelector('[winning-message]');
const announceTurn = document.querySelector('[who_turn]')
const restartBtn = document.getElementById('restartBtn');

const X_turn = 'x'
const O_turn = 'o'

let circleTurn

startGame()

restartBtn.addEventListener('click', startGame)

function startGame() {
    announceTurn.innerHTML = `X's Turn`
    circleTurn = false
    cellElement.forEach(cell => {
        cell.classList.remove(X_turn);
        cell.classList.remove(O_turn);
        winningTextElement.innerHTML = '';
        cell.addEventListener('click', handleClick, {once: true})
    })
}

function handleClick(e) {
    const cell = e.target
    const currentPlayer = circleTurn ? O_turn : X_turn
    takeTurn(cell, currentPlayer)
    if(is_Win(currentPlayer)) {
        endGame(false)
        console.log('winner')
    }else if(is_Draw()){
        endGame(true)
    } else {
        switchPlayers()
        announceTurn.innerHTML = `${circleTurn ? "O's Turn": "X's Turn"}`
    }
}

function takeTurn(cell, currentPlayer) {
    cell.classList.add(currentPlayer)
}

function switchPlayers() {
    circleTurn = !circleTurn
}

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


function is_Win(currentPlayer) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentPlayer)
        })
    })
}

function endGame(draw) {
    if(draw) {
        winningTextElement.innerHTML = 'No Winner! Try Again'
        announceTurn.innerHTML = ``
    }else {
        winningTextElement.innerHTML = `${circleTurn ? "O WON!! ": "X WON!!"}`
        announceTurn.innerHTML = ``
    }
}

function is_Draw() {
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_turn) ||
        cell.classList.contains(O_turn);
    })
}