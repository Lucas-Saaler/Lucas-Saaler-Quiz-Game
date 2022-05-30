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

var timeRemaining = 74
var clockid
var question=[{
    title:"New question 1",
    answers:["answer1", "answer2", "answer3", "answer4"],
    solution: "answer2"
},{
    title:"New question 2",
    answers:["answer21", "answer22", "answer23", "answer24"],
    solution: "answer22"
},{
    title:"New question 3",
    answers:["answer31", "answer32", "answer33", "answer34"],
    solution: "answer32"
},{
    title:"New question 4",
    answers:["answer41", "answer42", "answer43", "answer44"],
    solution: "answer42"
},{
    title:"New question 5",
    answers:["answer51", "answer52", "answer53", "answer54"],
    solution: "answer52"
}]

var index = 0

function countDown(){
    timeEl.textContent=timeRemaining
    timeRemaining--
}

function displayQuestions(){
    questionTitleEl.textContent=question[index].title
    answer1El.textContent=question[index].answers[0]
    answer2El.textContent=question[index].answers[1]
    answer3El.textContent=question[index].answers[2]
    answer4El.textContent=question[index].answers[3]
}

function nextQuestion(){
    index++
    displayQuestions()
}

function startQuiz(){
    questionsEl.classList.remove("hide")
    startupEl.classList.add("hide")
    clockid=setInterval(countDown, 1000)
    displayQuestions()
}

answer1El.addEventListener("click", nextQuestion)
answer2El.addEventListener("click", nextQuestion)
answer3El.addEventListener("click", nextQuestion)
answer4El.addEventListener("click", nextQuestion)
startQuizEl.addEventListener("click", startQuiz)