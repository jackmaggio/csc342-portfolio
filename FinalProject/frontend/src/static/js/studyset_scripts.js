import api from "./APIClient.js";

const flashcardsContainer = document.querySelector("#flashcard-wrapper");
const createFlashcardButton = document.querySelector("#create-flashcard");
const questionInput = document.querySelector("#question-input");
const answerInput = document.querySelector("#answer-input");
const discussBtn = document.querySelector("#discuss");
const backButton = document.querySelector("#back-button");

backButton.addEventListener("click", () => {
  sessionStorage.setItem("studyset", "");
  document.location = "/course";
});

document.addEventListener("DOMContentLoaded", async () => {
  let url =
    "/api/courses/" +
    sessionStorage.getItem("course") +
    "/studysets/" +
    sessionStorage.getItem("studyset") +
    "/flashcards";

  api.getCurrentUser().then((user) => {
    fetch(url)
      .then((res) => res.json())
      .then((flashcards) => fillFlashcardHtml(flashcards, user.id));
  });
});

createFlashcardButton.addEventListener("click", async () => {
  if (questionInput.value == "" || answerInput.value == "") {
    alert("Flashcards need a question and an answer");
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
  api
    .getCurrentUser()
    .then((user) => {
      api
        .createFlashcard({
          question: questionInput.value,
          answer: answerInput.value,
        })
        .then((flashcard) => {
          fillFlashcardHtml([flashcard], user.id);
          questionInput.value = "";
          answerInput.value = "";
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

function fillFlashcardHtml(flashcards, userId) {
  flashcards.forEach((flashcard) => {
    const item = document.createElement("div");
    const header = document.createElement("h2");
    const questionValue = document.createElement("div");
    const answerValue = document.createElement("div");

    const questionLabel = document.createElement("label");
    const answerLabel = document.createElement("label");
    const editedQuestion = document.createElement("textarea");
    const editedAnswer = document.createElement("textarea");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    const submitButton = document.createElement("button");

    item.id = flashcard.user_id;
    item.classList.add("flashcard");

    questionValue.classList.add("hidden");
    questionValue.innerHTML = flashcard.question;

    answerValue.classList.add("hidden");
    answerValue.innerHTML = flashcard.answer;

    questionLabel.classList.add("hidden");
    questionLabel.innerHTML = "Question";

    answerLabel.classList.add("hidden");
    answerLabel.innerHTML = "Answer";

    editedQuestion.classList.add("edited-question");
    editedQuestion.classList.add("hidden");
    editedQuestion.value = flashcard.question;

    editedAnswer.classList.add("edited-answer");
    editedAnswer.classList.add("hidden");
    editedAnswer.value = flashcard.answer;

    editButton.classList.add("edit-button");
    editButton.innerHTML = "Edit";

    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = "Delete";

    submitButton.classList.add("submit-button");
    submitButton.classList.add("hidden");
    submitButton.innerHTML = "Submit";

    cancelButton.classList.add("cancel-button");
    cancelButton.classList.add("hidden");
    cancelButton.innerHTML = "Cancel";

    if (item.id != userId) {
      editButton.classList.add("hidden");
      deleteButton.classList.add("hidden");
    }

    header.id = "header";
    header.innerHTML = flashcard.question;
    item.addEventListener("click", () => {
      let content = item.firstChild;
      if (content != null) {
        if (content.innerHTML === questionValue.innerHTML) {
          content.innerHTML = answerValue.innerHTML;
        } else {
          content.innerHTML = questionValue.innerHTML;
        }
      }
    });

    editButton.addEventListener("click", () => {
      header.classList.add("hidden");
      editButton.classList.add("hidden");
      deleteButton.classList.add("hidden");

      questionLabel.classList.remove("hidden");
      answerLabel.classList.remove("hidden");
      editedQuestion.classList.remove("hidden");
      editedAnswer.classList.remove("hidden");

      submitButton.classList.remove("hidden");
      cancelButton.classList.remove("hidden");
      // input.classList.remove("hidden");
    });

    cancelButton.addEventListener("click", () => {
      submitButton.classList.add("hidden");
      cancelButton.classList.add("hidden");
      questionLabel.classList.add("hidden");
      answerLabel.classList.add("hidden");
      editedQuestion.classList.add("hidden");
      editedAnswer.classList.add("hidden");

      header.classList.remove("hidden");
      editButton.classList.remove("hidden");
      deleteButton.classList.remove("hidden");
    });

    deleteButton.addEventListener("click", async () => {
      api
        .deleteFlashcard(flashcard.flashcard_id)
        .then(() => {
          flashcardsContainer.removeChild(item);
        })
        .catch((err) => {
          console.log("unable to delete flashcard.", err);
        });
    });

    submitButton.addEventListener("click", async () => {
      let question = editedQuestion.value;
      let answer = editedAnswer.value;
      if (question.length > 250) {
        alert("Questions must be 250 characters or less.");
        return;
      }
      if (answer.length > 250) {
        alert("Answers must be 250 characters or less.");
        return;
      }
      api
        .updateFlashcard(flashcard.flashcard_id, question, answer)
        .then((flashcard) => {
          header.innerHTML = flashcard.question;
          questionValue.innerHTML = flashcard.question;
          answerValue.innerHTML = flashcard.answer;

          submitButton.classList.add("hidden");
          cancelButton.classList.add("hidden");
          editedQuestion.classList.add("hidden");
          editedAnswer.classList.add("hidden");
          questionLabel.classList.add("hidden");
          answerLabel.classList.add("hidden");

          header.classList.remove("hidden");
          editButton.classList.remove("hidden");
          deleteButton.classList.remove("hidden");
        })
        .catch((err) => {
          console.log("unable to delete studyset.", err);
        });
    });

    item.appendChild(header);
    item.appendChild(questionLabel);
    item.appendChild(editedQuestion);
    item.appendChild(answerLabel);
    item.appendChild(editedAnswer);
    item.appendChild(editButton);
    item.appendChild(submitButton);
    item.appendChild(cancelButton);
    item.appendChild(deleteButton);
    item.appendChild(questionValue);
    item.appendChild(answerValue);

    flashcardsContainer.appendChild(item);
  });

  discussBtn.addEventListener("click", () => {
    document.location = "/discussion";
  });
}
