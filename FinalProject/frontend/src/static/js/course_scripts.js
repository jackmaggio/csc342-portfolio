import api from "./APIClient.js";

const studysetWrapper = document.querySelector("#studyset-wrapper");
const createStudyset = document.querySelector("#create-studyset");
const studysetBtn = document.querySelector("#study-button");
const postsBtn = document.querySelector("#discuss-button");
const backButton = document.querySelector("#back-button");

backButton.addEventListener("click", () => {
  sessionStorage.setItem("course", "");
  document.location = "/courseselection";
});

document.addEventListener("DOMContentLoaded", async () => {
  let url = "/api/courses/" + sessionStorage.getItem("course") + "/studysets";

  api.getCurrentUser().then((user) => {
    fetch(url)
      .then((res) => res.json())
      .then((studysets) => fillStudysetHtml(studysets, user.id));
  });
});

createStudyset.addEventListener("click", () => {
  document.location = "/studysetcreation";
});

postsBtn.addEventListener("click", () => {
  document.location = "/discussion";
});

function fillStudysetHtml(studysets, userId) {
  studysets.forEach((studyset) => {
    const item = document.createElement("div");
    const header = document.createElement("h2");
    const input = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    const submitButton = document.createElement("button");

    item.id = studyset.user_id;
    item.classList.add("studyset");

    input.classList.add("hidden");
    input.placeholder = studyset.studyset_title;

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

    deleteButton.addEventListener("click", async () => {
      api
        .deleteStudyset(studyset.studyset_id)
        .then(() => {
          studysetWrapper.removeChild(item);
        })
        .catch((err) => {
          console.log("unable to delete studyset.", err);
        });
    });

    submitButton.addEventListener("click", async () => {
      let title = input.value;
      if (title.length > 100) {
        alert("Studyset titles must be 100 characters or less.");
        return;
      }
      api
        .updateStudyset(studyset.studyset_id, title)
        .then((studyset) => {
          header.innerHTML = studyset.studyset_title;

          submitButton.classList.add("hidden");
          cancelButton.classList.add("hidden");
          input.classList.add("hidden");

          header.classList.remove("hidden");
          editButton.classList.remove("hidden");
          deleteButton.classList.remove("hidden");
        })
        .catch((err) => {
          console.log("unable to delete studyset.", err);
        });
    });

    header.innerHTML = studyset.studyset_title;
    header.addEventListener("click", () => {
      sessionStorage.setItem("studyset", studyset.studyset_id);
      document.location = "/studyset";
    });

    item.appendChild(header);
    item.appendChild(input);
    item.appendChild(editButton);
    item.appendChild(submitButton);
    item.appendChild(cancelButton);
    item.appendChild(deleteButton);

    studysetWrapper.appendChild(item);
  });
}
