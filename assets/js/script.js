// Starter page section with the opportunity to start the game
var startPage = document.querySelector("#startPage");

// The main quiz section of the page
var quizPage = document.querySelector("#quizPage");

// The bottom section that holds high scores and the option to submit scores
var resultPage = document.querySelector("#resultPage");

// Button to start the game
var startButton = document.querySelector("#startButton");
startButton.addEventListener("click", playGame);

// The main question prompt on the quiz page
var questionPrompt = document.querySelector("#questionPrompt");

// Checkbox labels for the questions
var answer0CheckBoxLabel = document.querySelector("#answer0Label");
var answer1CheckBoxLabel = document.querySelector("#answer1Label");
var answer2CheckBoxLabel = document.querySelector("#answer2Label");
var answer3CheckBoxLabel = document.querySelector("#answer3Label");

// The answer checkboxes themselves
var answer0CheckBox = document.querySelector("#answer0");
var answer1CheckBox = document.querySelector("#answer1");
var answer2CheckBox = document.querySelector("#answer2");
var answer3CheckBox = document.querySelector("#answer3");

// The set of all checkbox elements
var allCheckBoxes = document.querySelectorAll("input[type='checkbox']");

// The text element stating the score of the current completed quiz
var userScore = document.querySelector("#userScore");

// Message on the results page
var resultMessage = document.querySelector("#resultMessage");

// The button for submitting an answer to one of the questions
var submitAnswerButton = document.querySelector("#submitAnswer");
submitAnswerButton.addEventListener("click", gradeAnswer);

// Timer <span> value shown to the user
var timerTimeLeft = document.querySelector("#timerTimeLeft");

var btnClearScores = document.querySelector('#btnClearScores');
btnClearScores.addEventListener('click', clearScores);
var btnPlayAgain = document.querySelector("#btnPlayAgain");
btnPlayAgain.addEventListener('click', playAgain);

// Elements that handle the user submitting a score for ranking
var initialForm = document.querySelector("#userInitials");
var submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", submitScore);

// Basic setup variables for the quiz
numQuestions = 10; //Number of questions to be asked on the quiz
timerMaxDuration = 60; //Duration in seconds
var timerValue = timerMaxDuration; //Counter variable
correctAnswers = 0; //Counter for the correctly answered questions
timerPenalty = 5; //Penalize time for an incorrect guess

// Questions, possible answers, and the correct answer
questionsAnswersRef = [
  {
    question:
      "Why is JSON required for using local storage in conjunction with non-string objects?",
    answer0:
      "localStorage can only store and get string representations of objects",
    answer1:
      "Objects will be stored as '[object Object]' without the usage of JSON.stringify()",
    answer2: "Both A and B",
    answer3: "Neither A nor B",
    correctAns: 2,
  },

  {
    question:
      'Which three components compose a conditional iterator in a "for" loop?',
    answer0: "Iterator increment value",
    answer1: "Conditional statement",
    answer2: "Iterator declaration",
    answer3: "All of the above",
    correctAns: 3,
  },

  {
    question:
      'Which characters are used to enclose the conditional statement of an "if" block?',
    answer0: "()",
    answer1: "[]",
    answer2: "{}",
    answer3: "Spaces",
    correctAns: 0,
  },

  {
    question:
      'Which characters are used to enclose the executed code block of an "if" block?',
    answer0: "()",
    answer1: "[]",
    answer2: "{}",
    answer3: "Spaces",
    correctAns: 2,
  },

  {
    question:
      "Which command will cause code execution to jump out of the current block and move to the next expression?",
    answer0: "stop",
    answer1: "clear",
    answer2: "break",
    answer3: "continue",
    correctAns: 2,
  },

  {
    question: "Which of these is not a primitive type in JS?",
    answer0: "number",
    answer1: "dataframe",
    answer2: "boolean",
    answer3: "string",
    correctAns: 1,
  },

  {
    question: "Which character is used to select an id in CSS?",
    answer0: "#",
    answer1: "$",
    answer2: ".",
    answer3: "!",
    correctAns: 0,
  },

  {
    question: "Which character is used to select a class in CSS?",
    answer0: "#",
    answer1: "$",
    answer2: ".",
    answer3: "!",
    correctAns: 2,
  },

  {
    question:
      "What function can be used to prevent automatic refreshing on form submissions?",
    answer0: "event.stopPropagation()",
    answer1: "event.preventDefault()",
    answer2: "event.stopImmediatePropagation()",
    answer3: "event.coolIt()",
    correctAns: 1,
  },

  {
    question:
      "What is your favorite type of pizza (a serious and objectively definable question in JS)?",
    answer0: "Supreme",
    answer1: "Cheese",
    answer2: "Pepperoni",
    answer3: "Vegetarian",
    correctAns: 0,
  },
];

// From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Starts the game after the start button is pressed
function playGame() {
  startButton.disabled = true;
  startPage.style.display = "none";
  quizPage.style.display = "flex";

  refreshQuestion();
  setInterval(function () {
    timerValue--; //Decrement timer by 1
    timerTimeLeft.textContent = timerValue;
    if (timerValue <= 0) {
      endGame();
    //   clearInterval();
    }
  }, 1000);

  return;
}

// Given a question object, set the html attributes for the checkboxes to reflect the correct answer
function setCorrectAnswer(question) {
  // Cycle through all the checkboxes
  for (i = 0; i < allCheckBoxes.length; i++) {
    // If the integer in question.correctAns matches the index of the iterator, set its answer to true
    if (question.correctAns == i) {
      allCheckBoxes[i].setAttribute("data-correct", "true");
    } else {
      allCheckBoxes[i].setAttribute("data-correct", "false");
    }

    // console.log("Set question "+i+" to "+allCheckBoxes[i].getAttribute('data-correct'))
  }
}

// Selects a fresh question and updates the page
function refreshQuestion() {
  // If there are no more questions, end the game
  questionLength = questionsAnswers.length;
  if (questionLength < 1) {
    endGame();
    return;
  }

  // If there are more questions to answer, refresh the page content with the
  // new questions and answers
  currentQuestion = questionsAnswers.pop();
  questionPrompt.textContent = currentQuestion.question;
  answer1CheckBoxLabel.textContent = currentQuestion.answer1;
  answer2CheckBoxLabel.textContent = currentQuestion.answer2;
  answer3CheckBoxLabel.textContent = currentQuestion.answer3;
  answer0CheckBoxLabel.textContent = currentQuestion.answer0;

  setCorrectAnswer(currentQuestion);

  // Upon refresh, uncheck all of the checkboxes
  for (i = 0; i < allCheckBoxes.length; i++) {
    allCheckBoxes[i].checked = false;
  }
}

function gradeAnswer(event) {
  var answerGrade = false;
  event.preventDefault();
  var checkedAnswers = document.querySelectorAll("input:checked");

  // console.log("Checked answers:")
  // console.log(checkedAnswers)
  // console.log("Checked answer status:")
  // console.log(checkedAnswers[0].getAttribute('data-correct'))

  if (checkedAnswers.length !== 1) {
    // Didn't submit the correct number of answers, there is only a single true option
    console.log("Bad number of submitted answers, incorrect");
    refreshQuestion();
    timerValue -= timerPenalty;
  } else if (checkedAnswers[0].getAttribute("data-correct") == "true") {
    // Compare if the only selected answer was the correct one
    correctAnswers++;
    console.log("Correct answer, points now at " + correctAnswers);
    refreshQuestion();
  } else {
    console.log("No correct answer detected");
    refreshQuestion();
    timerValue -= timerPenalty;
  }
}

function endGame() {
  quizPage.style.display = "none";
  resultPage.style.display = "flex";
  userScore.textContent = correctAnswers;

}

var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log("Existing High Scores:");
console.log(highScores);

// Updates the high scores page and storage after user submits their score
function submitScore(event) {
  event.preventDefault();

  userScore = {
    userInitials: initialForm.value,
    userPoints: correctAnswers,
  };

  function scoreHelper() {
    console.log(
      "Acivated scoreHelper() to refresh the results page with post-game content and save highScores"
    );

    // Disable the input text field
    initialForm.disabled = true;

    // Sorting function for high scores, sorting by the point value
    function scoreSorter(a, b) {
      if (a.userPoints < b.userPoints) {
        return 1;
      } else if (a.userPoints > b.userPoints) {
        return -1;
      } else {
        return 0;
      }
    }

    // Sort the scores
    highScores.sort(scoreSorter);

    // Only store the top 10 scores
    highScores = highScores.slice(0, 10);

    // Save the new high scores to localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Render the new high scores
    refreshHighScores();

    // Change the results page message
    resultMessage.textContent += "\nYour score has been submitted!";
    submitButton.disabled = true;
  }

  // If there are less than 10 scores, simply add it
  if (highScores.length < 10) {
    console.log("Less than 10 scores found, adding the score");
    highScores.push(userScore);
    scoreHelper();
    return;
  } else {
    //In cases where there are already scores, add userScore if it beats out the worst highscore

    // Find the current max and min score amongst those that are stored
    maxScore = 0;
    minScore = numQuestions;
    for (const score in highScores) {
      if (score.userPoints > maxScore) {
        maxScore = score.userPoints;
      } else if (score.userPoints < minScore) {
        minScore = score.userPoints;
      }
    }

    // If the current score is greater than the min score, add it to highScores
    if (userScore.userPoints > minScore) {
      highScores.push(userScore);
    }

    scoreHelper();
  }
}

function refreshHighScores() {
  highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  document.querySelector("#highScoresTitle").style.display = "block";
  var highScoreTable = document.querySelector("#highScoreTable");

  if (highScores.length>0) {
    // If there are high scores to display, create a table for them

    var tableHeader = document.createElement("tr");
    tableHeader.innerHTML = "<th>Initials</th><th>Score</th>";
  
    // Adding the table header to the table
    highScoreTable.appendChild(tableHeader);
  
    // Adding table rows for each entry in highScores
    for (i = 0; i < highScores.length; i++) {
      // Ahhh, so this is how it's done in JS - loved f-strings in python
      // Create and append a table row with the correct data already loaded in
      var tableRow = document.createElement("tr");
      tableRow.innerHTML = `<td id="td${i}userInitial">${highScores[i].userInitials}</td><td id="td${i}userScore">${highScores[i].userPoints}</td>`;
      highScoreTable.appendChild(tableRow);
    } 

  } else {
    // If there are no high scores to display, reset the table
    highScoreTable.innerHTML = '';
    document.querySelector("#highScoresTitle").style.display = "none";


  }
}

function clearScores() {
  // Deletes any scores from localStorage when the clear storage button is clicked
  localStorage.clear()
  refreshHighScores()
}

function playAgain() {
  // Resets the page
  location.reload() //Honestly I thought there would be more to it, but this seems to work

}

// Initialize the game questions
var questionsAnswers = questionsAnswersRef; // Set up a randomized copy of the questions
shuffle(questionsAnswers); //Randomize order of questions


// // Radical animation attempt
// var maxRadius = 20; //px
// var minRadius = 5; //px
// var radiusChangeDirection = -1;

// var newRadius = 20;
// setInterval(function(){
//   quizPage.style.borderRadius = `${newRadius}px`;
//   newRadius =+ radiusChangeDirection;
//   if (newRadius <2 || newRadius >19) {
//     radiusChangeDirection *= -1;
//   }

// }, 1000/60)
