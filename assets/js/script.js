// The main quiz section of the page
var quizPage = document.querySelector("#quizPage")

// The displayed win/loss values at the top of the page
var winDisplay = document.querySelector('#winCount');
var lossDisplay = document.querySelector('#lossCount')

// Buttons to start the game / reset the user's score
var startButton = document.querySelector('#startButton');
var resetButton = document.querySelector('#resetButton');

startButton.addEventListener('click', playGame);
resetButton.addEventListener('click', resetGame)

var questionPrompt = document.querySelector("#questionPrompt")

// Buttons that handle the multiple choice questions
var answer1Button = document.querySelector('#answer1');
var answer2Button = document.querySelector('#answer2');
var answer3Button = document.querySelector('#answer3');
var answer4Button = document.querySelector('#answer4');

answer1Button.addEventListener('click', gradeAnswer);
answer2Button.addEventListener('click', gradeAnswer);
answer3Button.addEventListener('click', gradeAnswer);
answer4Button.addEventListener('click', gradeAnswer);

// Elements that handle the user submitting a score for ranking
var initialForm = document.querySelector('#userInitials');
var submitButton = document.querySelector('#submitButton')
submitButton.addEventListener('click', submitScore)

// Initializing scores
var wins = localStorage.getItem('wins') || 0;
var losses = localStorage.getItem('losses') || 0;

numQuestions = 10; //Number of questions to be asked on the quiz
timerDuration = 60; //Duration in seconds

questionsAnswers = [
    {question:'Question 1',
    answer1: "Answer1-1",
    answer2: "Answer2-1",
    answer3: "Answer3-1",
    answer4: "Answer4-1"},
    {question:'Question 2',
    answer1: "Answer1-2",
    answer2: "Answer2-2",
    answer3: "Answer3-2",
    answer4: "Answer4-2"},
    {question:'Question 3',
    answer1: "Answer1-3",
    answer2: "Answer2-3",
    answer3: "Answer3-3",
    answer4: "Answer4-3"},
    {question:'Question 4',
    answer1: "Answer1-4",
    answer2: "Answer2-4",
    answer3: "Answer3-4",
    answer4: "Answer4-4"},
    {question:'Question 5',
    answer1: "Answer1-5",
    answer2: "Answer2-5",
    answer3: "Answer3-5",
    answer4: "Answer4-5"},
    {question:'Question 6',
    answer1: "Answer1-6",
    answer2: "Answer2-6",
    answer3: "Answer3-6",
    answer4: "Answer4-6"},
    {question:'Question 7',
    answer1: "Answer1-7",
    answer2: "Answer2-7",
    answer3: "Answer3-7",
    answer4: "Answer4-7"},
    {question:'Question 8',
    answer1: "Answer1-8",
    answer2: "Answer2-8",
    answer3: "Answer3-8",
    answer4: "Answer4-8"},
    {question:'Question 9',
    answer1: "Answer1-9",
    answer2: "Answer2-9",
    answer3: "Answer3-9",
    answer4: "Answer4-9"},
    {question:'Question 10',
    answer1: "Answer1-10",
    answer2: "Answer2-10",
    answer3: "Answer3-10",
    answer4: "Answer4-10"},
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

shuffle(questionsAnswers); //Randomize order of questions

// Default user score object, will be initialized with non-default
// values when user finishes a game
userScoreTemplate = {
    userName:"",
    userScore:0
}

// Retrieve user's stats from local storage
function getStats() {
    var wins = localStorage.getItem('wins') || 0;
    var losses = localStorage.getItem('losses') || 0;
    console.log(wins, losses)
    renderWL()
}

// Stores the user's current score
function storeStats() {
    localStorage.setItem('wins', wins);
    localStorage.setItem('losses', losses);
}

// Updates the win/loss scores at the top of the page
function renderWL() {
    winDisplay.textContent = wins;
    lossDisplay.textContent = losses;

}

// Start the game by loading up any stored stats
getStats()


// Starts the game after the start button is pressed
function playGame() {
    quizPage.style.display = "flex";

    refreshQuestion()
    // setInterval(,timerDuration*1000)

    
    storeStats();
    return;
}

// Resets the user's score
function resetGame() {
    wins = 0;
    losses = 0;
    storeStats();
    renderWL()
    return;
}

// Selects a fresh question and updates the page
function refreshQuestion() {
    questionLength = questionsAnswers.length;
    currentQuestion = questionsAnswers.pop();
    questionPrompt.textContent = currentQuestion.question;
    answer1Button.textContent = currentQuestion.answer1;
    answer2Button.textContent = currentQuestion.answer2;
    answer3Button.textContent = currentQuestion.answer3;
    answer4Button.textContent = currentQuestion.answer4;



    return;
}

function gradeAnswer() {

    return;
}

// Updates the 
function submitScore() {
    return;
}