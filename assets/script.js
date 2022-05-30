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

var index = 0

function countDown(){
    timeEl.textContent=timeRemaining
    timeRemaining--
    if (timeRemaining <= 0){
        clearInterval(clockid);
        timeEl.textContent = 0
        questionsEl.classList.add("hide")
        displayInput()
    }
}

function startQuiz(){
    questionsEl.classList.remove("hide")
    startupEl.classList.add("hide")
    clockid=setInterval(countDown, 1000)
    displayQuestions()
    if(hasPlayed != 1){
        scoreEl.textContent = 0
        firstPlaceEl.textContent = "0"
        secondPlaceEl.textContent = "0"
    }else{
        firstPlaceEl.textContent = localFirstInits + " " + localFirstTime
        secondPlaceEl.textContent = localSecondInits + " " + localSecondTime
        scoreEl.textContent = firstPlaceEl.textContent
    }
}

function displayInput(){
    questionsEl.classList.add("hide")
    initialsEl.classList.remove("hide")
    clearInterval(clockid);
    finalTime = timeEl.textContent
}

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

function nextQuestion(){
    index++
    displayQuestions()
}

function displayLeaderboard(){
    enteredInits = enterInitsEl.value
    initialsEl.classList.add("hide")
    leaderboardEl.classList.remove("hide")
    finalScore = enteredInits + " " + finalTime
    firstPlaceEl.textContent = firstPlaceEl
    if (hasPlayed == 1){
        if (finalTime >= localFirstTime){
            secondPlaceEl.textContent = localFirstInits + " " + localFirstTime
            localStorage.setItem("secondInits", localFirstInits)
            localStorage.setItem("secondTime", localFirstTime)
            firstPlaceEl.textContent = finalScore
            localStorage.setItem("firstInits", enteredInits)
            localStorage.setItem("firstTime", finalTime)
        }else if (finalTime < localFirstTime && finalTime >= localSecondTime){
            secondPlaceEl.textContent = finalScore
            firstPlaceEl.textContent = localFirstInits + " " + localFirstTime
            localStorage.setItem("secondInits", enteredInits)
            localStorage.setItem("secondTime", finalTime)
        }
    }else{
        localStorage.setItem("hasPlayed", 1)
        localStorage.setItem("firstInits", enteredInits)
        localStorage.setItem("firstTime", finalTime)
        localStorage.setItem("secondInits", 0)
        localStorage.setItem("secondTime", 0)
        secondPlaceEl.textContent = 0
        firstPlaceEl.textContent = finalScore
        scoreEl.textContent = finalScore
    }    
    scoreEl.textContent = firstPlaceEl.textContent
}

startQuizEl.addEventListener("click", startQuiz)
answer1El.addEventListener("click", checkAnswer1)
answer2El.addEventListener("click", checkAnswer2)
answer3El.addEventListener("click", checkAnswer3)
answer4El.addEventListener("click", checkAnswer4)
saveEl.addEventListener("click", displayLeaderboard)