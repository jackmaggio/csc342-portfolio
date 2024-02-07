import api from "./APIClient.js";

const title = document.querySelector("#title-input");
const questionInput = document.querySelector("#question-input");
const answerInput = document.querySelector("#answer-input");
const addCardButton = document.querySelector("#add-card-button");
const submitButton = document.querySelector("#submit-button");
const backButton = document.querySelector("#back-button");

let cards = [];

backButton.addEventListener("click", () => {
  document.location = "/course";
});

addCardButton.addEventListener("click", () => {
  if (questionInput.value == "" || answerInput.value == "") {
    alert("Flashcards need a question and answer");
    return;
  }
  if (questionInput.value.length > 250) {
    alert("Questions must be 250 characters or less.");
    return;
  }
  if (answerInput.value.length > 250) {
    alert("Answers must be 250 characters or less.");
    return;
  }
  cards.push({
    question: questionInput.value,
    answer: answerInput.value,
  });
  questionInput.value = "";
  answerInput.value = "";
});

submitButton.addEventListener("click", async () => {
  if (title.value == "") {
    alert("Studysets need a title");
    return;
  }
  if (title.value.length > 100) {
    alert("Studyset titles must be 100 characters or less.");
    return;
  }
  api
    .createStudyset(title.value)
    .then((studyset) => {
      console.log(studyset);
      sessionStorage.setItem("studyset", studyset.studyset_id);
      if (cards.length > 0) {
        cards.forEach((card) => {
          api.createFlashcard(card);
        });
      }
      title.value = "";
      questionInput.value = "";
      answerInput.value = "";
      cards = [];
    })
    .catch((error) => {
      console.log(error);
    });
});
