import api from "./APIClient.js";

const questionInput = document.querySelector("#question-text");
const submitButton = document.querySelector("#submit-button");
const backButton = document.querySelector("#back-button");

backButton.addEventListener("click", () => {
  //sessionStorage.setItem("forumPost", "");
  document.location = "/discussion";
});

function resetPost() {
  questionInput.value = "";
}

submitButton.addEventListener("click", async () => {
  if (questionInput.value == "") {
    alert("Post need a question");
    return;
  }
  if (questionInput.value.length > 250) {
    alert("Post content must be 250 characters or less");
    return;
  }
  api
    .createForumPost(questionInput.value)
    .then((forumPost) => {
      console.log(forumPost);
      sessionStorage.setItem("forumPost", forumPost.forum_id);
      questionInput.value = "";
      document.location = "/discussion";
    })
    .catch((error) => {
      console.log(error);
    });
});
