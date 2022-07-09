const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionCardElement = document.getElementById("question-card");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-btns");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("Started");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionCardElement.classList.remove("hide");

  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "On what continent would you find the world’s largest desert? ",
    answers: [
      { text: "Antarctica", correct: true },
      { text: "Europe", correct: false },
      { text: "Asia", correct: false },
      { text: "Australia", correct: false },
    ],
  },
  {
    question: "Who plays Emily in the Netflix show, Emily in paris?",
    answers: [
      { text: "Amanda Stenberg", correct: false },
      { text: "Eliza Gonzales", correct: false },
      { text: "Lily Collins", correct: true },
      { text: "Eva Marcille", correct: false },
    ],
  },
  {
    question: "What is the highest rated film on IMDb as of January 1st 2022? ",
    answers: [
      { text: "The Shawshank Redemption", correct: true },
      { text: "The Godfather", correct: false },
      { text: "The Lord of the Rings: The Return of the King", correct: false },
      { text: "The Dark Knight", correct: false },
    ],
  },
  {
    question: "What Renaissance artist is buried in Rome's Parthenon? ",
    answers: [
      { text: "Raphael", correct: true },
      { text: "Leonardo da Vinci", correct: false },
      { text: "Michaelangelo", correct: false },
      { text: "Donatello", correct: false },
    ],
  },
];
