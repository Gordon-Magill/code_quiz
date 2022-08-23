// Starter page section with the opportunity to start the game
var startPage = document.querySelector('#startPage');

// The main quiz section of the page
var quizPage = document.querySelector("#quizPage");

// The bottom section that holds high scores and the option to submit scores
var resultPage = document.querySelector('#resultPage');

// Button to start the game
var startButton = document.querySelector('#startButton');
startButton.addEventListener('click', playGame);


// The main question prompt on the quiz page
var questionPrompt = document.querySelector("#questionPrompt")

// Checkbox labels for the questions
var answer1CheckBoxLabel = document.querySelector('#answer1Label');
var answer2CheckBoxLabel = document.querySelector('#answer2Label');
var answer3CheckBoxLabel = document.querySelector('#answer3Label');
var answer0CheckBoxLabel = document.querySelector('#answer0Label');

// The answer checkboxes themselves
var answer1CheckBox = document.querySelector('#answer1')
var answer2CheckBox = document.querySelector('#answer2')
var answer3CheckBox = document.querySelector('#answer3')
var answer0CheckBox = document.querySelector('#answer0')

// The set of all checkbox elements 
var allCheckBoxes = document.querySelectorAll("input[type='checkbox']");

// The button for submitting an answer to one of the questions
var submitAnswerButton = document.querySelector("#submitAnswer")
submitAnswerButton.addEventListener('click', gradeAnswer);

// Elements that handle the user submitting a score for ranking
var initialForm = document.querySelector('#userInitials');
var submitButton = document.querySelector('#submitButton')
submitButton.addEventListener('click', submitScore)

// Basic setup variables for the quiz
numQuestions = 10; //Number of questions to be asked on the quiz
timerMaxDuration = 60; //Duration in seconds
correctQuestions = 0; //Counter for the correctly answered questions

// Questions, possible answers, and the correct answer encoded as the 
questionsAnswersRef = [
    {question:'Why is JSON required for using local storage in conjunction with non-string objects?',
    answer1: "localStorage can only store and get string representations of objects",
    answer2: "Objects will be stored as '[object Object]' without the usage of JSON.stringify()",
    answer3: "Both A and B",
    answer0: "Neither A nor B",
    correctAns: 3},

    {question:'Which three components compose a conditional iterator in a "for" loop?',
    answer1: "Iterator increment value",
    answer2: "Conditional statement",
    answer3: "Iterator declaration",
    answer0: "All of the above",
    correctAns: 0},

    {question:'How do ',
    answer1: "Answer1-3",
    answer2: "Answer2-3",
    answer3: "Answer3-3",
    answer0: "answer0-3",
    correctAns: 3},

    {question:'Question 4',
    answer1: "Answer1-4",
    answer2: "Answer2-4",
    answer3: "Answer3-4",
    answer0: "answer0-4",
    correctAns: 3},

    {question:'Question 5',
    answer1: "Answer1-5",
    answer2: "Answer2-5",
    answer3: "Answer3-5",
    answer0: "answer0-5",
    correctAns: 3},

    {question:'Question 6',
    answer1: "Answer1-6",
    answer2: "Answer2-6",
    answer3: "Answer3-6",
    answer0: "answer0-6",
    correctAns: 3},

    {question:'Question 7',
    answer1: "Answer1-7",
    answer2: "Answer2-7",
    answer3: "Answer3-7",
    answer0: "answer0-7",
    correctAns: 3},

    {question:'Question 8',
    answer1: "Answer1-8",
    answer2: "Answer2-8",
    answer3: "Answer3-8",
    answer0: "answer0-8",
    correctAns: 3},

    {question:'Question 9',
    answer1: "Answer1-9",
    answer2: "Answer2-9",
    answer3: "Answer3-9",
    answer0: "answer0-9",
    correctAns: 3},

    {question:'Question 10',
    answer1: "Answer1-10",
    answer2: "Answer2-10",
    answer3: "Answer3-10",
    answer0: "answer0-10",
    correctAns: 3},
];

// From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

var questionsAnswers = questionsAnswersRef;
shuffle(questionsAnswers); //Randomize order of questions

// Default user score object, will be initialized with non-default
// values when user finishes a game
userScoreTemplate = {
    userName:"",
    userScore:0
}

// Retrieve user's stats from local storage
function initPage() {
    // startPage.style.display = 'flex'
}

// Updates the win/loss scores at the top of the page
// function renderWL() {
//     winDisplay.textContent = wins;
//     lossDisplay.textContent = losses;

// }

// Start the game by loading up any stored stats
initPage()


// Starts the game after the start button is pressed
function playGame() {
    quizPage.style.display = "flex";
    var timerValue = timerMaxDuration;


    refreshQuestion()
    setInterval(function() {
        timerValue-- //Decrement timer by 1
        if (timerValue == 0) {
            endGame()
        }

    },1000);

    
    return;
}

function setCorrectAnswer(question) {

}


// Selects a fresh question and updates the page
function refreshQuestion() {
    
    // If there are no more questions, end the game
    questionLength = questionsAnswers.length;
    if (questionLength<1) {
        endGame()
    }

    // If there are more questions to answer, refresh the page content with the
    // new questions and answers
    currentQuestion = questionsAnswers.pop();
    questionPrompt.textContent = currentQuestion.question;
    answer1CheckBoxLabel.textContent = currentQuestion.answer1;
    answer2CheckBoxLabel.textContent = currentQuestion.answer2;
    answer3CheckBoxLabel.textContent = currentQuestion.answer3;
    answer0CheckBoxLabel.textContent = currentQuestion.answer0;


    // Upon refresh, uncheck all of the checkboxes
    for (i=0;i<allCheckBoxes.length; i++) {
        allCheckBoxes[i].checked = false;
    }



    return;
}

function gradeAnswer(event) {
    var answerGrade = false;
    event.preventDefault();
    var checkedAnswers = document.querySelectorAll('input:checked')

    console.log("Checked answers:")
    console.log(checkedAnswers)
    console.log("Checked answer status:")
    console.log(checkedAnswers[0].getAttribute('data-correct'))

    if (checkedAnswers.length>1) {
        // More than one answer was submitted, which is wrong
        console.log('Submitted more than one answer, incorrect')
        refreshQuestion();
    } else if (checkedAnswers[0].getAttribute('data-correct')=='true') {
        // Compare if the only selected answer was the correct one
        correctQuestions++
        console.log('Correct answer, points now at '+correctQuestions)
        refreshQuestion()
    } else {
        console.log('No correct answer detected')
        refreshQuestion()
    }
    

}

function endGame() {
    return;
}

// Updates the 
function submitScore() {
    return;
}