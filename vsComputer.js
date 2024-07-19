let player1Name, computerName = "Computer";
let player1win = 0;
let computerWin = 0; 
const player1Symbol = "O";
const computerSymbol = "X";
let boxes = document.querySelectorAll("#box");
let clearBoard = document.querySelector("#newGame");
let resetBtn = document.querySelector("#reset");
let result = document.querySelector(".showWinner");
let player1Score = document.querySelector(".user1Score");
let computerScore = document.querySelector(".user2Score");
let clickcounter = 1;

getPlayerName();
setScore();

function getPlayerName() {
    player1Name = prompt("Enter player 1 name").toUpperCase();
    document.querySelector("#user1Name").innerText = `${player1Name} (${player1Symbol})`;
    document.querySelector("#user2Name").innerText = `${computerName} (${computerSymbol})`;
    setScore();
}

function setScore() {
    player1Score.innerText = player1win;
    computerScore.innerText = computerWin;
}

let playerTurn = (event) => {
    if (clickcounter % 2 !== 0) {
        event.target.innerText = player1Symbol;
        event.target.removeEventListener("click", playerTurn);
        clickcounter++;
        if (isWinner()){
            return;
        }
        setTimeout(computerTurn, 300); 
    }
}

function computerTurn() {
    let availableBoxes = Array.from(boxes).filter(box => box.innerText.trim() === "");
    if (availableBoxes.length === 0) return;


    for (let symbol of [computerSymbol, player1Symbol]) {
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (boxes[a].innerText === symbol && boxes[b].innerText === symbol && boxes[c].innerText.trim() === "") {
                boxes[c].innerText = computerSymbol;
                boxes[c].removeEventListener("click", playerTurn);
                clickcounter++;
                isWinner();
                return;
            }
            if (boxes[a].innerText === symbol && boxes[c].innerText === symbol && boxes[b].innerText.trim() === "") {
                boxes[b].innerText = computerSymbol;
                boxes[b].removeEventListener("click", playerTurn);
                clickcounter++;
                isWinner();
                return;
            }
            if (boxes[b].innerText === symbol && boxes[c].innerText === symbol && boxes[a].innerText.trim() === "") {
                boxes[a].innerText = computerSymbol;
                boxes[a].removeEventListener("click", playerTurn);
                clickcounter++;
                isWinner();
                return;
            }
        }
    }


    let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    randomBox.innerText = computerSymbol;
    randomBox.removeEventListener("click", playerTurn);
    clickcounter++;
    isWinner();
}

function enableBox() {
    boxes.forEach(box => {
        box.addEventListener("click", playerTurn);
    });
}

function disableBox() {
    boxes.forEach(box => {
        box.removeEventListener("click", playerTurn);
    });
}

function clearBox() {
    boxes.forEach(box => {
        box.innerText = " ";
    });
}

function updateWinner(winner) {
    player1Score.classList.remove("hide");
    computerScore.classList.remove("hide");
    result.classList.remove("hide");
    result.innerText = `${winner} wins!`;
    result.style.backgroundColor = "#058C42";
    result.style.color = "black";
    setScore();
    disableBox();
}

function draw() {
    result.classList.remove("hide");
    result.innerText = "Game Tied!";
    result.style.backgroundColor = "#3D0814";
    result.style.color = "whitesmoke";
    disableBox();
}

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function isWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            if (boxes[a].innerText === player1Symbol) {
                player1win++;
                updateWinner(player1Name);
            } else {
                computerWin++;
                updateWinner(computerName);
            }
            return true;
        }
    }

    if (clickcounter > 9) {
        draw();
        return true;
    }
    return false;
}

clearBoard.addEventListener("click", () => {
    clearBox();
    clickcounter = 1;
    enableBox();
    result.classList.add("hide");
});

resetBtn.addEventListener("click", () => {
    player1Score.classList.add("hide");
    computerScore.classList.add("hide");
    result.classList.add("hide");
    clearBox();
    clickcounter = 1;
    enableBox();
    player1win = 0;
    computerWin = 0;
    setScore();
    getPlayerName();
});

enableBox();
