import api from "./APIClient.js";

const header = document.querySelector("#main-header");
const logout = document.querySelector("#logout");
document.addEventListener("DOMContentLoaded", async () => {
  api
    .getCurrentUser()
    .then((user) => {
      header.innerHTML = "Hi " + user.first_name + " " + user.last_name + "!";
    })
    .catch((err) => {
      if (err.status == 401) {
        sessionStorage.setItem("auth", "User is not authenticated");
        document.location = "/";
      } else {
        console.log(err.status);
      }
    });
});

logout.addEventListener("click", async () => {
  api
    .logOut()
    .then((document.location = "/"))
    .catch((error) => {
      console.log(error);
    });
});
