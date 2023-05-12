var timeEl = document.querySelector(".timer");
var startButton = document.getElementById("start-btn");
var gameOver = document.getElementById("end");
var questionContainer = document.querySelector(".container");
var totalScore = document.getElementById("score");
var initialsInput = document.getElementById("inputfield");
var initialsButton = document.querySelector(".initials")
var feedbackEl = document.getElementById("feedback");
var save = document.getElementById("save")

startButton.addEventListener("click", startGame);

var timeLeft = 21;
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
    quizContainer.setAttribute("style", "visibility: hidden");
    timeLeft = 0;
    timeEl.textContent = "Time left: " + timeLeft;
    console.log("Game over!");
}

//quiz materials
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
{
    question: "The answer to this question is not 'C' or 'D' or 'A'",
    choices: ["A", "B", "C", "D"],
    correctAnswer: "B"
},
];

// console.log(myQuestions)


//get questions from myQuestions object array
const quizContainer = document.getElementById("quiz-container");
function getQuestion(currentIndex) { 
    const currentQuestion = myQuestions[currentIndex]
    const questionDiv = document.getElementById("question");
    const questionContent = document.querySelector("h2");
    questionDiv.innerText = '';
    questionContent.innerText = currentQuestion.question;
    questionDiv.appendChild(questionContent);

//generate answer button
    currentQuestion.choices.forEach(chooseAnswer => {
        // console.log(chooseAnswer)
        const answerButton = document.createElement("button");
        answerButton.style.margin= 'auto';
        answerButton.style.marginTop= '15px';
        answerButton.style.padding= '5px 15px 5px 15px';
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
                totalScore.innerText = "Your score: " + score + " / " + myQuestions.length;
                feedbackEl.textContent = "Correct!"
                console.log("correct")
            } else {
                timeLeft -= 5;
                totalScore.innerText = "Your score: " + score + " / " + myQuestions.length;
                feedbackEl.textContent = "Incorrect. Lose 5 seconds!"
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

//character limit on initials field
const maxLength = 6;
initialsInput.setAttribute('maxlength', maxLength);
initialsInput.addEventListener('keyup', function() {
    const currentValue = initialsInput.value;

    if(currentValue.length > maxLength) {
        initialsInput.value = currentValue.substring(0, maxLength);
    }
});


//refresh page on submit to update scoreboard and restart quiz
initialsInput.addEventListener("keypress", function(event) {
    if(event.key === 'Enter') {
        localStorage.setItem(initialsInput.value, score);
        location.reload(); 
    }
});

save.addEventListener("click", function() {

    // console.log(initialsInput.value)
    // console.log(score);
    localStorage.setItem(initialsInput.value, score);
    location.reload();
});

//local storage get. displays highscores directly on page from highest to lowest
const container = document.getElementById("all-scores");
const locStoreVal = [];


Object.keys(localStorage).forEach((key) => {
    const value = localStorage.getItem(key);
    locStoreVal.push({key, value});
});

locStoreVal.sort((a, b) => b.value - a.value);

for (let i = 0; i < locStoreVal.length; i++) {
    const element = document.createElement("p");
    element.textContent = `${locStoreVal[i].key}: ${locStoreVal[i].value}`;
    container.appendChild(element);
} 
