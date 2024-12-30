const quizData = [
    {
        question: "The Playstation game console was developed by which company?",
        options: ["Sega", "Sony", "Nintendo", "Capcom"],
        answer: "Sony"
    },
    {
        question: "Which one of the following is the largest ocean in the world?",
        options: ["Indian Ocean", "Arctic Ocean", "Pacific Ocean", "Atlantic Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "What year did the Chernobyl disaster occur?",
        options: ["1983", "1984", "1985", "1986"],
        answer: "1986"
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Nauru", "Vatican City", "Tuvalu"],
        answer: "Vatican City"
    },
    {
        question: "In the following which one food Giant Pandas normally eat?",
        options: ["Bamboo", "Banana", "Corn", "Fish"],
        answer: "Bamboo"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let answerShown = false;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const showAnswerButton = document.getElementById('show-answer-btn');
const resultsElement = document.getElementById('final-results');

function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    answerShown = false;

    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', selectOption);
        optionsContainer.appendChild(optionElement);
    });

    showAnswerButton.disabled = true;
    showAnswerButton.style.display = 'none';
    nextButton.disabled = true;
    nextButton.style.display = 'none';
}

function selectOption(event) {
    if (answerShown) return; // Prevent selection after answer is shown

    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }
    selectedOption = event.target;
    selectedOption.classList.add('selected');
    showAnswerButton.style.display = 'block';
    showAnswerButton.disabled = false;
}

function showAnswer() {
    if (answerShown) return;

    const correctAnswer = quizData[currentQuestionIndex].answer;
    const options = optionsContainer.children;
    for (const option of options) {
        if (option.textContent === correctAnswer) {
            option.style.backgroundColor = "lightgreen";
        } else if (option.classList.contains("selected") && option.textContent !== correctAnswer) {
            option.style.backgroundColor = "lightcoral";
        }
    }
    showAnswerButton.disabled = true;
    nextButton.style.display = 'block';
    nextButton.disabled = false;
    answerShown = true;

    // Remove click listeners from options after showing the answer
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach(optionElement => {
        optionElement.removeEventListener('click', selectOption);
    });
}

function checkAnswer() {
    if (!selectedOption && !answerShown) {
        alert("Please select an answer and view the result.");
        return;
    }
    if(!answerShown){
        alert("Please view the result")
        return;
    }


    const userAnswer = selectedOption ? selectedOption.textContent : null; // Handle cases where no option is selected
    const correctAnswer = quizData[currentQuestionIndex].answer;
    if (userAnswer === correctAnswer) {
        score++;
    }

    selectedOption = null;
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-area').style.display = 'none';
    nextButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultsElement.textContent = `You scored ${score} out of ${quizData.length}.`;
    resultsElement.style.display = 'block';
}

showAnswerButton.addEventListener('click', showAnswer);
nextButton.addEventListener('click', checkAnswer);
displayQuestion();