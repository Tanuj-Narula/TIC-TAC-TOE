let player1Name, player2Name;
let player1win = 0;
let player2Win = 0; 
const player1Symbol = "O";
const player2Symbol = "X";
let boxes = document.querySelectorAll("#box");
let clearBoard = document.querySelector("#newGame");
let resetBtn = document.querySelector("#reset");
let result = document.querySelector(".showWinner");
let player1Score = document.querySelector(".user1Score");
let player2Score = document.querySelector(".user2Score");
let clickcounter = 1;

getPlayerName();
setScore();

function getPlayerName(){
    player1Name = prompt("enter player 1 name").toUpperCase();
    player2Name = prompt("enter player 2 name").toUpperCase();
    document.querySelector("#user1Name").innerText = `${player1Name}  (${player1Symbol})`;
    document.querySelector("#user2Name").innerText = `${player2Name}  (${player2Symbol})`;
    setScore();
}

function setScore(){
    player1Score.innerText = player1win;
    player2Score.innerText = player2Win;
}

let playerTurn = (event)=>{
    if(clickcounter%2 !== 0){
        event.target.innerText= player1Symbol;
    }else{
        event.target.innerText = player2Symbol;
    }
    event.target.removeEventListener("click" , playerTurn);
    iswinner();
    clickcounter++;
}

function enablebox(){
    boxes.forEach(box =>{
        box.addEventListener("click" ,playerTurn);
    })
};

function disableBox(){
    boxes.forEach(box =>{
        box.removeEventListener("click" , playerTurn);
    })
};

function clearBox(){
    boxes.forEach((box)=>{
        box.innerText = " ";
    })
}

function updateWinner(winner){
    player1Score.classList.remove("hide");
    player2Score.classList.remove("hide");
    result.classList.remove("hide");
    result.innerText = `${winner} WINS!`;
    result.style.backgroundColor = "#089c4b";  
    result.style.color ="black";
    setScore();
    disableBox();
}

function draw(){
    result.classList.remove("hide");
    result.innerText = "Game Tied!";
    result.style.backgroundColor = "#7e0e28"; 
    result.style.color= "whitesmoke";
    disableBox();
}

function iswinner(){
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

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (boxes[a].innerText !== "" && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            if (boxes[a].innerText === player1Symbol) {
                player1win++;
                updateWinner(player1Name);
            } else {
                player2Win++;
                updateWinner(player2Name);
            }
            return;
        }
    }

    if (clickcounter === 9){
        draw();
    }
}

clearBoard.addEventListener("click" ,()=>{
    clearBox();
    clickcounter = 1;
    enablebox();
    result.classList.add("hide");
})

resetBtn.addEventListener("click" , ()=>{
    player1Score.classList.add("hide");
    player2Score.classList.add("hide");
    result.classList.add("hide");
    clearBox();
    clickcounter = 1;
    enablebox();
    player1win = 0; 
    player2Win = 0;
    setScore();
    getPlayerName();
})

enablebox();

