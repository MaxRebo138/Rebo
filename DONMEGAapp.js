

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//push the questions into availableQuestions Array
function setAvailableQuestions(){
	const totalQuestion = quiz.length;
	for(let i=0; i<quiz.length; i++){
		availableQuestions.push(quiz[i])
	}
}

//set question number, question and options
function getNewQuestion(){
	//set question number
	questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + 50;

	//set question text
	//get random question
	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
	currentQuestion = questionIndex;
	questionText.innerHTML = currentQuestion.q;
	
	//get the position of 'questionIndex' from the availableQuestion Array
	const index1 = availableQuestions.indexOf(questionIndex);
	
	//remove the 'questionIndex' from the availableQuestion Array
	//so that the question does not repeat
	availableQuestions.splice(index1,1);

	//set options
	//get the length of options
	const optionLen = currentQuestion.options.length
	//push options into availableOptions Array
	for(let i=0; i<optionLen; i++){
		availableOptions.push(i)
	}
	optionContainer.innerHTML = '';

	let animationDelay = 0.15;
	//create options in html
	for(let i=0; i<optionLen; i++){
	//random option
	const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
	//get the position of 'OptionIndex' from the availableOptions
	const index2 = availableOptions.indexOf(optionIndex);
	//remove the option 'optionIndex' from the availableOptions
	//so that the option does not repeat
	availableOptions.splice(index2,1);
	const option = document.createElement("div")
	option.innerHTML = currentQuestion.options[optionIndex];
	option.id = optionIndex;
	option.style.animationDelay = animationDelay + 's';
	animationDelay = animationDelay + 0.15;
	option.className = "option";
	optionContainer.appendChild(option)
	option.setAttribute("onclick", "getResult(this)");
	}

	questionCounter++
}

//get the result current attempt question
function getResult(element){
	const id = parseInt(element.id);
	//get the answer by comparing the id of clicked option
	if (id === currentQuestion.answer){
	//set the green color to the correct option
		element.classList.add("correct");
		//add the indicator with "correct" marks
		updateAnswerIndicator("correct");
		correctAnswers++;
		
	}
	else{
		//set the red color to the incorrect option
		element.classList.add("wrong");
		//add the indicator with "wrong" marks
		updateAnswerIndicator("wrong");

		//if answer is incorrect, show correct answer
		const optionLen = optionContainer.children.length;
		for(let i=0; i<optionLen; i++){
			if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
				optionContainer.children[i].classList.add("correct");
			}
		}
	}
	attempt++;
	unclickableOptions();
}

//make all options unclickable after user selects answer
function unclickableOptions(){
	const optionLen = optionContainer.children.length;
	for(let i=0; i<optionLen; i++){
		optionContainer.children[i].classList.add("already-answered");
	}
}

function answersIndicator(){
	answersIndicatorContainer.innerHTML = '';
	//const totalQuestion = quiz.length;
	const totalQuestion = 50;
	for(let i=0; i<totalQuestion; i++){
		const indicator = document.createElement("div");
		answersIndicatorContainer.appendChild(indicator);

	}
}
function updateAnswerIndicator(markType){
	answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
	if(questionCounter === 50){
		quizOver();
	}
	else{
		getNewQuestion();	
	}
}
function quizOver(){
	//hide quizBox
	quizBox.classList.add("hide"); 
	//show result box
	resultBox.classList.remove("hide");
	quizResult();
}
//get the quiz results
function quizResult(){
	resultBox.querySelector(".total-question").innerHTML = 50;
	resultBox.querySelector(".total-attempt").innerHTML = attempt;
	resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
	resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
	const percentage = (correctAnswers/50)*100;

	resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%"; 

if(percentage > 50){
resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + 50 + ": You Know your Shit, Mofako";
}

if(percentage <= 50){
resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + 50 + ": \xa0\xa0\xa0You are a Juff";
}

/*	resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + 50;  */
}

function resetQuiz(){
	questionCounter = 0;
	correctAnswers = 0;
	attempt = 0;
}

function tryAgainQuiz(){
	//hide the resultBox
	resultBox.classList.add("hide");
	//show the QuizBox
	quizBox.classList.remove("hide");
	resetQuiz();
	startQuiz();
}

function goToHome(){
	//hide result Box
	resultBox.classList.add("hide");
	//show home box
	homeBox.classList.remove("hide");
	resetQuiz();
}

// #### STARTING POINT ####

function startQuiz(){

	//hide home box
	homeBox.classList.add("hide");
	//show quiz box
	quizBox.classList.remove("hide");

	//first we will set all questions in availableQuestions Array
	setAvailableQuestions();
	//second we will call getNewQuestion() function
	getNewQuestion();
	//to create indcators of answers
	answersIndicator()
}

window.onload = function(){
	homeBox.querySelector(".total-question").innerHTML = 50;
}

