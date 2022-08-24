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
var answer0CheckBoxLabel = document.querySelector('#answer0Label');
var answer1CheckBoxLabel = document.querySelector('#answer1Label');
var answer2CheckBoxLabel = document.querySelector('#answer2Label');
var answer3CheckBoxLabel = document.querySelector('#answer3Label');

// The answer checkboxes themselves
var answer0CheckBox = document.querySelector('#answer0')
var answer1CheckBox = document.querySelector('#answer1')
var answer2CheckBox = document.querySelector('#answer2')
var answer3CheckBox = document.querySelector('#answer3')

// The set of all checkbox elements 
var allCheckBoxes = document.querySelectorAll("input[type='checkbox']");

// The text element stating the score of the current completed quiz
var userScore = document.querySelector('#userScore')

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
correctAnswers = 0; //Counter for the correctly answered questions

// Questions, possible answers, and the correct answer encoded as the 
questionsAnswersRef = [
    {question:'Why is JSON required for using local storage in conjunction with non-string objects?',
    answer0: "localStorage can only store and get string representations of objects",
    answer1: "Objects will be stored as '[object Object]' without the usage of JSON.stringify()",
    answer2: "Both A and B",
    answer3: "Neither A nor B",
    correctAns: 2},

    {question:'Which three components compose a conditional iterator in a "for" loop?',
    answer0: "Iterator increment value",
    answer1: "Conditional statement",
    answer2: "Iterator declaration",
    answer3: "All of the above",
    correctAns: 3},

    {question:'Which characters are used to enclose the conditional statement of an "if" block?',
    answer0: "()",
    answer1: "[]",
    answer2: "{}",
    answer3: "Spaces",
    correctAns: 0},

    {question:'Which characters are used to enclose the executed code block of an "if" block?',
    answer0: "()",
    answer1: "[]",
    answer2: "{}",
    answer3: "Spaces",
    correctAns: 2},

    {question:'Which command will cause code execution to jump out of the current block and move to the next expression?',
    answer0: "stop",
    answer1: "clear",
    answer2: "break",
    answer3: "continue",
    correctAns: 2},

    {question:'Which of these is not a primitive type in JS?',
    answer0: "number",
    answer1: "dataframe",
    answer2: "boolean",
    answer3: "string",
    correctAns: 1},

    {question:'Which character is used to select an id in CSS?',
    answer0: "#",
    answer1: "$",
    answer2: ".",
    answer3: "!",
    correctAns: 0},

    {question:'Which character is used to select a class in CSS?',
    answer0: "#",
    answer1: "$",
    answer2: ".",
    answer3: "!",
    correctAns: 2},

    {question:'What function can be used to prevent automatic refreshing on form submissions?',
    answer0: "event.stopPropagation()",
    answer1: "event.preventDefault()",
    answer2: "event.stopImmediatePropagation()",
    answer3: "event.coolIt()",
    correctAns: 1},

    {question:'What is your favorite type of pizza (a serious and objectively definable question in JS)?',
    answer0: "Supreme",
    answer1: "Cheese",
    answer2: "Pepperoni",
    answer3: "Vegetarian",
    correctAns: 0},
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



// Starts the game after the start button is pressed
function playGame() {
    startPage.style.display = 'none';
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

// Given a question object, set the html attributes for the checkboxes to reflect the correct answer
function setCorrectAnswer(question) {

    // Cycle through all the checkboxes
    for (i=0;i<allCheckBoxes.length; i++) {

        // If the integer in question.correctAns matches the index of the iterator, set its answer to true
        if (question.correctAns == i) {
            allCheckBoxes[i].setAttribute('data-correct','true')
        }
        else {
            allCheckBoxes[i].setAttribute('data-correct','false')
        }
        
        console.log("Set question "+i+" to "+allCheckBoxes[i].getAttribute('data-correct'))
    }
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

    setCorrectAnswer(currentQuestion)

    // Upon refresh, uncheck all of the checkboxes
    for (i=0;i<allCheckBoxes.length; i++) {
        allCheckBoxes[i].checked = false;
    }

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
        correctAnswers++
        console.log('Correct answer, points now at '+correctAnswers)
        refreshQuestion()
    } else {
        console.log('No correct answer detected')
        refreshQuestion()
    }
    

}

function endGame() {
    quizPage.style.display = 'none';
    resultPage.style.display = 'flex';
    userScore.textContent = correctAnswers;

}

// Updates the 
function submitScore() {
    return;
}

// Initialize the game questions
var questionsAnswers = questionsAnswersRef; // Set up a randomized copy of the questions
shuffle(questionsAnswers); //Randomize order of questions