var timeEl = document.querySelector(".timer");
var startButton = document.getElementById("start-btn");
var playButton = document.getElementById("play-btn");
var gameOver = document.getElementById("end");
var questionContainer = document.querySelector(".container");
var totalScore = document.getElementById("score");
var initialsInput = document.getElementById("initials");
var initialsButton = document.querySelector(".initials")
var feedbackEl = document.getElementById("feedback");
var save = document.getElementById("save")

startButton.addEventListener("click", startGame);


var timeLeft = 30;
let score = 0;
var currentQuestion= 0;

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


//run game
function startGame() {
    timeLeft;
    startButton.setAttribute("style", "visibility: hidden");
    questionContainer.setAttribute("style", "visibility: visible");
    totalScore.setAttribute("style", "visibility: visible");
    countdown();
    getQuestion(currentQuestion);
    console.log("Started");
}

//set conditions to stop game at 0 seconds inside countdown function then reset clock so counts don't go negative
function endGame() {

    gameOver.setAttribute("style", "visibility: visible");
    initialsInput.setAttribute("style", "visibility: visible");
    initialsButton.setAttribute("style", "visibility: visible");
    timeLeft = 0;
    timeEl.textContent = "Time left: " + timeLeft;
    console.log("Game over!");
}

save.addEventListener("click", function() {

    console.log(initialsInput.value)
    console.log(score);
    localStorage.setItem(initialsInput.value, score);

});



// Object.keys(localStorage).forEach((key) => {
//     console.log(localStorage.getItem(key));
//    });
   

//quiz material
const myQuestions = [ {
    question: "The answer to this question is 'A'",
    choices: ["A", "B", "C", "D"],
    correctAnswer: "A"
},
{
    question: "The answer to this question is 'B'",
    choices: ["A", "B", "C", "D"],
    correctAnswer: "B"
},
{
    question: "The answer to this question is 'C'",
    choices: ["A", "B", "C", "D"],
    correctAnswer: "C"
},
];

console.log(myQuestions)

const quizContainer = document.getElementById("quiz-container");
function getQuestion(currentIndex) { 
    const currentQuestion = myQuestions[currentIndex]
    const questionDiv = document.getElementById("question");
    const questionContent = document.querySelector("h2");
    questionDiv.innerText = '';
    questionContent.innerText = currentQuestion.question;
    questionDiv.appendChild(questionContent);

    currentQuestion.choices.forEach(chooseAnswer => {
        // console.log(chooseAnswer)
        const answerButton = document.createElement("button");
        answerButton.innerText = chooseAnswer;
        answerButton.classList.add("button");

        questionDiv.appendChild(answerButton);
    });
    quizContainer.appendChild(questionDiv);


}

document.addEventListener("click", (event) => {
    if(event.target.matches("button")) { 
        if(event.target.id !== 'start-btn') {
            // console.log(myQuestions[currentQuestion].correctAnswer + event.target.innerText)
            if(event.target.innerText === myQuestions[currentQuestion].correctAnswer) {
                score ++;
                totalScore.innerText = "Your score: " + score + "/3";
                feedbackEl.textContent = "Correct!"
                console.log("correct")
            } else {
                timeLeft -= 10;
                feedbackEl.textContent = "Incorrect. -10 seconds!"
            }
            currentQuestion = currentQuestion + 1;
            if (currentQuestion >= myQuestions.length) {
                endGame();
            }

            // console.log("buttonclicked")
            getQuestion(currentQuestion);
        }

    }
});
