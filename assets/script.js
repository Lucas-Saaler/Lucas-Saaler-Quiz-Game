// Static selectors
var highScoreEl = document.querySelector("#highscore")
var timerEl = document.querySelector("#timeLeft")
var startupEl = document.querySelector("#startup")
var questionsEl = document.querySelector("#questions")
var initialsEl = document.querySelector("#initials")
var leaderboardEl = document.querySelector("#leaderboard")
var startQuizEl = document.querySelector("#start-quiz")
var scoreEl = document.querySelector("#score")
var timeEl = document.querySelector("#time")
var questionTitleEl = document.querySelector("#question-title")
var answer1El = document.querySelector("#answer1")
var answer2El = document.querySelector("#answer2")
var answer3El = document.querySelector("#answer3")
var answer4El = document.querySelector("#answer4")
var saveEl = document.querySelector("#save")
var enterInitsEl = document.querySelector("#enter-inits")
var firstPlaceEl = document.querySelector("#first-place")
var secondPlaceEl = document.querySelector("#second-place")

// Values that will dynamically change
var hasPlayed = localStorage.getItem("hasPlayed")
var localFirstInits = localStorage.getItem("firstInits")
var localFirstTime = localStorage.getItem("firstTime")
var localSecondInits = localStorage.getItem("secondInits")
var localSecondTime = localStorage.getItem("secondTime")
var timeRemaining = 74
var clockid
var enteredInits
var finalTime
var finalScore
var question=[{
    title:"2 + 2 = ?",
    answers:["1", "4", "6", "2,000"],
    solution: "4"
},{
    title:"2 + 2 * 4 = ?",
    answers:["10", "16", "20", "4"],
    solution: "10"
},{
    title:"(2 * 10) / 4 = ?",
    answers:["10", "20", "5", "45"],
    solution: "5"
},{
    title:"(5 + 5) * 2 = ?",
    answers:["10", "4", "5", "20"],
    solution: "20"
},{
    title:"11 * 11 = ?",
    answers:["121", "122", "111", "1,111"],
    solution: "121"
}]

// Keeps track of what question we are on
var index = 0

// Makes the timer go down 1 number per second
function countDown(){
    timeEl.textContent=timeRemaining
    timeRemaining--
    // Will kill the timer when it hits 0
    if (timeRemaining <= 0){
        clearInterval(clockid);
        timeEl.textContent = 0
        questionsEl.classList.add("hide")
        displayInput()
    }
}

// Pressing the start button will hide the start screen, start the counter and display the questions
function startQuiz(){
    questionsEl.classList.remove("hide")
    startupEl.classList.add("hide")
    clockid=setInterval(countDown, 1000)
    displayQuestions()
    // Checks to see if the user has played yet. If not, then placeholder 0s will be put on the leaderboard
    if(hasPlayed != 1){
        scoreEl.textContent = 0
        firstPlaceEl.textContent = 0
        secondPlaceEl.textContent = 0
    // If the user has played, it will put their previous high score in the top-left and on the leaderboard
    }else{
        firstPlaceEl.textContent = localFirstInits + " " + localFirstTime
        secondPlaceEl.textContent = localSecondInits + " " + localSecondTime
        scoreEl.textContent = firstPlaceEl.textContent
    }
}

// Stops the clock and saves the time. Also allows the user to input their initials
function displayInput(){
    questionsEl.classList.add("hide")
    initialsEl.classList.remove("hide")
    clearInterval(clockid);
    finalTime = timeEl.textContent
}

// Displays the question based on the current index value. If the index is greater than 4 (question 5 is done), the game ends
function displayQuestions(){
    if (index <= 4){
        questionTitleEl.textContent=question[index].title
        answer1El.textContent=question[index].answers[0]
        answer2El.textContent=question[index].answers[1]
        answer3El.textContent=question[index].answers[2]
        answer4El.textContent=question[index].answers[3]
    }else{
        displayInput()
    }    
}

// These checkAnswerx() functions check to see if your selection is correct. If it isn't, time is subtracted. Regardless, you are moved on to the next question
function checkAnswer1(){
    if (question[index].answers[0] != question[index].solution){
        timeRemaining = timeRemaining - 15
    }
    nextQuestion()
}

function checkAnswer2(){
    if (question[index].answers[1] != question[index].solution){
        timeRemaining = timeRemaining - 15
    }
    nextQuestion()
}

function checkAnswer3(){
    if (question[index].answers[2] != question[index].solution){
        timeRemaining = timeRemaining - 15
    }
    nextQuestion()
}

function checkAnswer4(){
    if (question[index].answers[3] != question[index].solution){
        timeRemaining = timeRemaining - 15
    }
    nextQuestion()
}

// This function displays the next set of questions by increasing the index value and re-running the displayQuestions function
function nextQuestion(){
    index++
    displayQuestions()
}

// This function displays the leaderboard. It will hide the input in the process.
function displayLeaderboard(){
    enteredInits = enterInitsEl.value
    initialsEl.classList.add("hide")
    leaderboardEl.classList.remove("hide")
    finalScore = enteredInits + " " + finalTime
    firstPlaceEl.textContent = firstPlaceEl
    // Checks if the user has played before. If they have, it will compare their score to their previous attempts at the quiz. It will update local storage with new values if new values are needed (if the user places on the leaderboard at all).
    if (hasPlayed == 1){
        // If you beat or meet the high score
        if (finalTime >= localFirstTime){
            secondPlaceEl.textContent = localFirstInits + " " + localFirstTime
            // Updates second place with the former first place score
            localStorage.setItem("secondInits", localFirstInits)
            localStorage.setItem("secondTime", localFirstTime)
            firstPlaceEl.textContent = finalScore
            // Updates first place with your score
            localStorage.setItem("firstInits", enteredInits)
            localStorage.setItem("firstTime", finalTime)
        // If you beat or meer the second place score but don't meet the high score 
        }else if (finalTime < localFirstTime && finalTime >= localSecondTime){
            secondPlaceEl.textContent = finalScore
            firstPlaceEl.textContent = localFirstInits + " " + localFirstTime
            localStorage.setItem("secondInits", enteredInits)
            localStorage.setItem("secondTime", finalTime)
        // If you don't place, then the values remain the same.    
        }else{
            firstPlaceEl.textContent = localFirstInits + " " + localFirstTime
            secondPlaceEl.textContent = localSecondInits + " " + localSecondTime
        }
    //if the user hasn't played before, then they will automatically be put in first place, and 0 will be scored as the second place local storage value. 
    }else{
        localStorage.setItem("hasPlayed", 1)
        localStorage.setItem("firstInits", enteredInits)
        localStorage.setItem("firstTime", finalTime)
        localStorage.setItem("secondInits", 0)
        localStorage.setItem("secondTime", 0)
        firstPlaceEl.textContent = finalScore
        scoreEl.textContent = finalScore
    }    
    // Fills the high score with the score from first place
    scoreEl.textContent = firstPlaceEl.textContent
}

// Adds click event listenrs to the various buttons in the quiz
startQuizEl.addEventListener("click", startQuiz)
answer1El.addEventListener("click", checkAnswer1)
answer2El.addEventListener("click", checkAnswer2)
answer3El.addEventListener("click", checkAnswer3)
answer4El.addEventListener("click", checkAnswer4)
saveEl.addEventListener("click", displayLeaderboard)