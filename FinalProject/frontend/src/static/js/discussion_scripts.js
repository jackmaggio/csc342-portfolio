import api from "./APIClient.js";

const discussBtn = document.querySelector("#study");
const postBtn = document.querySelector("#post_question");
const currentBtn = document.querySelector("#current_post");
const flashcardsContainer = document.querySelector("#flashcard-wrapper");
const backButton = document.querySelector("#back-button");

document.addEventListener("DOMContentLoaded", async () => {
  let url = "/api/courses/" + sessionStorage.getItem("course") + "/forumPosts";
  //await fetch(url)
  //  .then((res) => res.json())
  //  .then((posts) => fillPostsHtml(posts));
  api.getCurrentUser().then((user) => {
    fetch(url)
      .then((res) => res.json())
      .then((studysets) => fillPostsHtml(studysets, user.id));
  });
});

backButton.addEventListener("click", () => {
  sessionStorage.setItem("post", "");
  document.location = "/course";
});

function fillPostsHtml(posts, userId) {
  posts.forEach((post) => {
    const item = document.createElement("div");
    item.classList.add("flashcard");
    const header = document.createElement("h2");
    header.innerHTML = post.post_content;

    //new items
    const input = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    const submitButton = document.createElement("button");

    item.id = post.user_id;

    //setting the items
    input.classList.add("hidden");
    input.placeholder = post.post_content;

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

    //if id's dont match then no edit/delete options
    if (item.id != userId) {
      editButton.classList.add("hidden");
      deleteButton.classList.add("hidden");
    }

    //change classes if buttons are clicked
    editButton.addEventListener("click", () => {
      header.classList.add("hidden");
      editButton.classList.add("hidden");
      deleteButton.classList.add("hidden");

      submitButton.classList.remove("hidden");
      cancelButton.classList.remove("hidden");
      input.classList.remove("hidden");
    });

    cancelButton.addEventListener("click", () => {
      submitButton.classList.add("hidden");
      cancelButton.classList.add("hidden");
      input.classList.add("hidden");

      header.classList.remove("hidden");
      editButton.classList.remove("hidden");
      deleteButton.classList.remove("hidden");
    });

    //calls and actions when clicking
    deleteButton.addEventListener("click", async () => {
      api
        .deleteForumPost(post.post_id)
        .then(() => {
          flashcardsContainer.removeChild(item);
        })
        .catch((err) => {
          console.log("unable to delete post.", err);
        });
    });

    submitButton.addEventListener("click", async () => {
      console.log("we here");
      let question = input.value;
      if (question.length > 250) {
        alert("Post content must be 250 characters or less");
        return;
      }
      console.log(question);
      api
        .updateForumPost(post.post_id, question)
        .then((post) => {
          header.innerHTML = post.post_content;

          submitButton.classList.add("hidden");
          cancelButton.classList.add("hidden");
          input.classList.add("hidden");

          header.classList.remove("hidden");
          editButton.classList.remove("hidden");
          deleteButton.classList.remove("hidden");
        })
        .catch((err) => {
          console.log("unable to update post.", err);
          console.log(post);
        });
    });

    item.appendChild(header);
    header.addEventListener("click", () => {
      sessionStorage.setItem("post", post.post_id);
      document.location = "/discussionpostreplies";
    });
    console.log(item);
    console.log(header);
    console.log(post);
    console.log(post.post_content);
    console.log(flashcardsContainer);
    item.appendChild(input);
    item.appendChild(editButton);
    item.appendChild(submitButton);
    item.appendChild(cancelButton);
    item.appendChild(deleteButton);
    flashcardsContainer.appendChild(item);
  });

  discussBtn.addEventListener("click", () => {
    document.location = "/studyset";
  });

  postBtn.addEventListener("click", () => {
    document.location = "/discussionpost";
  });
}
