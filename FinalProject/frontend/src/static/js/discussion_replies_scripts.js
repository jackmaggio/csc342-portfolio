import api from "./APIClient.js";

const main_post = document.querySelector("#main_post");
const post_replies = document.querySelector("#replies-wrapper");

const replyMessage = document.querySelector("#reply-message");
const submitButton = document.querySelector("#submit-button");
const replyButton = document.querySelector("#reply-button");
const backButton = document.querySelector("#back-button");

document.addEventListener("DOMContentLoaded", async () => {
  let url =
    "/api/courses/" +
    sessionStorage.getItem("course") +
    "/forumPosts/" +
    sessionStorage.getItem("post") +
    "/replies";
  let url2 =
    "/api/courses/" +
    sessionStorage.getItem("course") +
    "/forumPosts/" +
    sessionStorage.getItem("post");
  //await fetch(url2)
  //  .then((res) => res.json())
  //  .then((post) => fillPostHtml(post));

  api.getCurrentUser().then((user) => {
    fetch(url)
      .then((res) => res.json())
      .then((replies) => fillReplyHtml(replies, user.id));
    fetch(url2)
      .then((res) => res.json())
      .then((post) => fillPostHtml(post));
  });
});

backButton.addEventListener("click", () => {
  sessionStorage.setItem("forumReply", "");
  document.location = "/discussion";
});

//<textarea cols="68" rows="4" class="answer-text" id="reply-message" placeholder="Leave a reply..."></textarea>
//            <button class="reply-button" id="reply-button">Reply</button>

function fillPostHtml(post) {
  console.log("we here");
  //const item = document.createElement("div");
  //item.classList.add("reply");
  const question = document.createElement("h2");
  question.classList.add("content");
  question.innerHTML = post.post_content;

  /*const replyarea = document.createElement("textarea");
    replyarea.classList.add("answer-text");
    replyarea.id("reply-message");
    replyarea.cols("68");
    replyarea.rows("4");
    replyarea.placeholder("Leave a reply...");
    main_post.appendChild(replyarea);

    const replybutton = document.createElement("button");
    replybutton.classList.add("reply-button");
    replybutton.id("reply-button");
    main_post.appendChild(replybutton);*/

  //item.appendChild(question);
  //item.addEventListener("click", () => {
  //  sessionStorage.setItem("post", post.post_id);
  //  document.location = "/discussionpostreplies";
  //});
  main_post.prepend(question);
}

function fillReplyHtml(replies, userId) {
  replies.forEach((reply) => {
    const item = document.createElement("div");
    item.classList.add("reply");
    const question = document.createElement("h2");
    question.innerHTML = reply.reply_content;
    //new items
    const editedReply = document.createElement("textarea");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    const submitButton = document.createElement("button");

    //adding classes and values
    item.id = reply.user_id;

    //question.classList.add("hidden");

    editedReply.classList.add("edited-question");
    editedReply.classList.add("hidden");
    editedReply.value = reply.reply_content;

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

    //buttons clicked
    editButton.addEventListener("click", () => {
      //header.classList.add("hidden");
      editButton.classList.add("hidden");
      deleteButton.classList.add("hidden");

      editedReply.classList.remove("hidden");

      submitButton.classList.remove("hidden");
      cancelButton.classList.remove("hidden");
    });

    cancelButton.addEventListener("click", () => {
      submitButton.classList.add("hidden");
      cancelButton.classList.add("hidden");
      editedReply.classList.add("hidden");

      //header.classList.remove("hidden");
      editButton.classList.remove("hidden");
      deleteButton.classList.remove("hidden");
    });

    deleteButton.addEventListener("click", async () => {
      api
        .deleteForumReply(reply.reply_id)
        .then(() => {
          post_replies.removeChild(item);
        })
        .catch((err) => {
          console.log("unable to delete reply.", err);
        });
    });

    submitButton.addEventListener("click", async () => {
      let reply2 = editedReply.value;
      if (reply2.length > 250) {
        alert("Reply content must be 250 characters or less");
        return;
      }
      api
        .updateForumReply(reply.reply_id, reply2)
        .then((reply) => {
          //header.innerHTML = flashcard.question;
          question.innerHTML = reply.reply_content;

          submitButton.classList.add("hidden");
          cancelButton.classList.add("hidden");
          editedReply.classList.add("hidden");

          //header.classList.remove("hidden");
          editButton.classList.remove("hidden");
          deleteButton.classList.remove("hidden");
        })
        .catch((err) => {
          console.log("unable to delete reply.", err);
        });
    });

    item.appendChild(question);
    item.appendChild(editedReply);
    item.appendChild(editButton);
    item.appendChild(submitButton);
    item.appendChild(cancelButton);
    item.appendChild(deleteButton);
    post_replies.appendChild(item);
  });
}

function resetReply() {
  replyMessage.value = "";
}

replyButton.addEventListener("click", async () => {
  if (replyMessage.value == "") {
    alert("Reply needs text.");
    return;
  }

  if (replyMessage.value.length > 250) {
    alert("Replies must be 250 characters or less");
    return;
  }
  api
    .createForumReply(replyMessage.value)
    .then((forumReply) => {
      console.log(forumReply);
      sessionStorage.setItem("forumReply", forumReply.reply_id);
      resetReply();
    })
    .catch((error) => {
      console.log(error);
    });
});
