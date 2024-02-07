import api from "./APIClient.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginButton = document.querySelector("#login-button");
const signupButton = document.querySelector("#signup-button");

loginButton.addEventListener("click", (e) => {
  api
    .logIn(email.value, password.value)
    .then((userData) => {
      console.log(userData);
      sessionStorage.setItem("user", userData.user.id);
      document.location = "/courseselection";
    })
    .catch((err) => {
      alert("Invalid login credentials.");
    });
});

signupButton.addEventListener("click", () => {
  document.location = "/register";
});
