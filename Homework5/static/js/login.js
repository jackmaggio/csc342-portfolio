import api from "./APIClient.js";

const loginButton = document.querySelector("#login-button.login-button");
const usernameInput = document.querySelector("#username-input");
const passwordInput = document.querySelector("#password-input");
const errorMsg = document.querySelector("#error-msg");

document.addEventListener("DOMContentLoaded", () => {
  let auth = sessionStorage.getItem("auth");
  if (auth == "User is not authenticated") {
    errorMsg.classList.remove("hidden");
    errorMsg.innerHTML = auth;
  }
  sessionStorage.setItem("auth", "");
});

loginButton.addEventListener("click", async () => {
  let username = usernameInput.value;
  let password = passwordInput.value;
  let body = {};
  body["username"] = username;
  body["password"] = password;

  api
    .logIn(username, password)
    .then((user) => {
      document.location = "/home";
    })
    .catch((err) => {
      errorMsg.classList.remove("hidden");
      if (err.status == 401) {
        errorMsg.innerHTML = "Invalid username or password";
      } else {
        errorMsg.innerHTML = err;
      }
    });
});
