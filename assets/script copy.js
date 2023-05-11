const questions=[
    {question:"What year did the United States gain independence?",
answers:[
    {text:"1776",correct:true},
    {text:"1676",correct:false},
    {text:"1576",correct:false},
    {text:"1476",correct:false}
]},
    {question:"What star does Earth orbit?",answers:[
        {text:"Moon",correct:false},
        {text:"Proxima Centauri",correct:false},
        {text:"Sun",correct:true},
        {text:"Roy Orbison",correct:false}
    ]}
    ];

// `checkAnswers` accepts the answers for the question
// and returns a new function (closure) that is assigned to the
// listener which fires when any of the child elements
// (the buttons) of the container `.answers` is clicked
// The closure keeps a reference to the answers when it is returned
function checkAnswer(answers) {
  return function(e) {

    // If the clicked child element is a button
    // get its textContent, `find` the correct answer
    // from the answers array, destructure its text value
    // and then compare it to the textContent of the clicked button
    if (e.target.matches('.answer')) {
      const { textContent } = e.target;
      const { text } = answers.find(answer => answer.correct);
      if (textContent === text) {
        console.log('Correct');
      } else {
        console.log('Incorrect');
      }
    }
  }
}

// Accepts the question answers and builds
// the buttons HTML
function buildAnswers(answers) {
  return answers.map(answer => {
    return `<button class="answer">${answer.text}</button>`;
  }).join('');
}

// Builds the question which is added to the
// element with the `question` class. It adds the
// question to an <h3> elementm, and calls `buildAnswers`
// with the answers as an argument to return the answers HTML
// Note: `map` returns an array so we need to join into into
// a string
function buildQuestion(question) {
  return `
    <h3>${question.question}</h3>
    <section class="answers">
      ${buildAnswers(question.answers)}
    </section>
  `;
}

// Get a random number based on the length of
// the questions array
function rnd(questions) {
  return Math.floor(Math.random() * questions.length);
}

// The main function
// 1) Gets a random question from the array
// 2) Gets the question element
// 3) Creates the question HTML
// 4) Inserts the HTML into the question element
// 5) It grabs the answers container element
// 6) Adds an event listener to it which calls `checkAnswer`
// with the set of available answers as an argument, which
// returns a function that is used when a button is clicked
function main() {
  
  const question = questions[rnd(questions)];
  const el = document.querySelector('.question');
  const html = buildQuestion(question);
  el.insertAdjacentHTML('beforeend', html);
  
  const answers = document.querySelector('.answers');
  answers.addEventListener('click', checkAnswer(question.answers));

}

// Call main
main();