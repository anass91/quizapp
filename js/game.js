const question = document.querySelector('#question');
const choices =Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availbleQuestions = [];

let questions = [
    {
        question:'كم عدد إخوة أناس و ما اسم ولده؟',
        choice1:'3 إخوة - إبنه فهد',
        choice2:'7 إخوة - إبنه معاد',
        choice3:'4 إخوة - إبنه فهد',
        choice4:'5 إخوة - إبنه صالح',
        answer:3,
    },
    {
        question:'كم يساوي 3 × 4 + 13؟',
        choice1:'25',
        choice2:'26',
        choice3:'25',
        choice4:'51',
        answer:1,
    },
    {
        question:'في أي سنة ولدت الجميلة فاطمة الزهراء؟',
        choice1:'1998',
        choice2:'2002',
        choice3:'2000',
        choice4:'2004',
        answer:4,
    },
    {
        question:'ما هي عاصمة دولة إسبانية؟',
        choice1:'مدريد',
        choice2:'باريس',
        choice3:'روما',
        choice4:'ليشبونه',
        answer:1,
    },
    {
        question:'ما اسم أم أناس شنتوف؟',
        choice1:'رحمة',
        choice2:'ربيعة',
        choice3:'السعدية',
        choice4:'كلثوم',
        answer:3,
    },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availbleQuestions = [...questions];
    
    getNewQuestion();
}



getNewQuestion = () =>{
    if(availbleQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS * 100)}%`;


    const questionsIndex = Math.floor(Math.random() * availbleQuestions.length);
    currentQuestion = availbleQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availbleQuestions.splice(questionsIndex, 1);
     acceptingAnswers = true;

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})
incrementScore = num => {
    score += num;
    scoreText.innerText = score
}
startGame();