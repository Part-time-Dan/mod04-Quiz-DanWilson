var timeEl = document.querySelector(".timer");

var timeLeft = 10;

//game countdown timer
function countdown() {
    var timeInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timeInterval);
            endGame();
        }

    }, 1000);
}

//set conditions to stop game at 0 seconds inside countdown function
function endGame() {
}

countdown();