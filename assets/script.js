var timeEl = document.querySelector(".timer");
var startButton = document.getElementById("start-btn");
var playButton = document.getElementById("play-btn");
var gameOver = document.getElementById("end");
var questionContainer = document.querySelector(".container")
var totalScore = document.getElementById("score")


startButton.addEventListener("click", startGame);
playButton.addEventListener("click", playAgain);

var timeLeft = 10;

//game countdown timer
function countdown() {
    var timeInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = "Time left: " + timeLeft;

        if(timeLeft <= 0) {
            clearInterval(timeInterval);
            endGame();
        }

    }, 1000);
}

function startGame() {
    startButton.setAttribute("style", "visibility: hidden");
    questionContainer.setAttribute("style", "visibility: visible");
    totalScore.setAttribute("style", "visibility: visible")
    countdown();
    console.log("Started");
}

function chooseAnswer() {

}

//set conditions to stop game at 0 seconds inside countdown function then reset clock so counts don't go negative
function endGame() {
    gameOver.setAttribute("style", "visibility: visible");
    playButton.setAttribute("style", "visibility: visible");
    timeLeft = 10;
    console.log("Game over!");
}

//run start game from new button (could also swap text in start quiz button on endGame condition)
function playAgain() {
    playButton.setAttribute("style", "visibility: hidden");
    gameOver.setAttribute("style", "visibility: hidden");
    startGame();
    console.log("Playing again");
}
