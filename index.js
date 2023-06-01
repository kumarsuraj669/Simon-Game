// document.addEventListener("keypress", newMove);
document.onload = setTimeout(newMove, 2000);
var level = 0;
var box = document.querySelectorAll(".box-item");
var header = document.querySelector("#header");

var computerMoves = [];
var userMoves = [];

box.forEach(element => element.addEventListener("click", handleUserClick));

function newMove () {
//     document.removeEventListener("keypress", newMove);
    userMoves = [];

    let random = Math.floor(Math.random()*4);
    level++;

    animation(box[random]);

    header.innerText = `Level ${level}`;
    computerMoves.push(box[random].getAttribute("id"));
}

function handleUserClick(){
    const clickedBox = this;
    animation(clickedBox);

    const id = clickedBox.getAttribute("id");
    userMoves.push(id);

    if(!check()){
        gameOver();
    } else if(userMoves.length == computerMoves.length){
        setTimeout(newMove, 1000);
    }
}

function check(){
    for (let i=0; i<userMoves.length; i++){
        if(userMoves[i] != computerMoves[i]){
            return false;
        }
    }
    return true;
}

function gameOver(){
    let body = document.querySelector("body");
    body.classList.add("game-over");

    const sound = new Audio('./music/game_over.wav');
    sound.play();
    setTimeout(()=>{
        body.classList.remove("game-over");
    }, 100)


    header.innerText = `Game Over, Press any key to restart`;
    computerMoves = [];
    level = 0;
    
    document.addEventListener("keypress", newMove);
}

function animation(boxItem){
    boxItem.classList.add("box-effect");
    const clickAudio = new Audio('./music/click.wav');
    clickAudio.play();
    setTimeout(()=>{
        boxItem.classList.remove("box-effect");
    }, 100)
}

