import api from "./APIClient.js";

const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const confirmEmailInput = document.querySelector("#confirm-email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");

const registerButton = document.querySelector("#register-button");
const backButton = document.querySelector("#back-button");

backButton.addEventListener("click", () => {
  document.location = "/login";
});

registerButton.addEventListener("click", async (e) => {
  e.preventDefault();
  let email = emailInput.value;
  let confirmEmail = confirmEmailInput.value;
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;

  if (
    email === "" ||
    confirmEmail === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("Must fill out all inputs");
    return;
  }

  const emailRegex = /^[\w.+\-]+@ncsu\.edu$/;
  if (email.match(emailRegex) == null) {
    alert("Email must end in @ncsu.edu");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least six characters in length");
    return;
  }
  if (email !== confirmEmail) {
    alert("Emails need to match");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords need to match");
    return;
  }

  api
    .register(email, password)
    .then((user) => {
      sessionStorage.setItem("user", user.user.id);
      document.location = "/courseselection";
    })
    .catch((error) => {
      alert(
        "This email is in use by another account. Please use a different email."
      );
    });
});
