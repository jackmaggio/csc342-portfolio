const loginButton = document.querySelector("#login-button.login-button");
const usernameInput = document.querySelector("#username-input");

loginButton.addEventListener("click", async () => {
  let username = usernameInput.value;
  let body = {};
  body["username"] = username;
  let url = "/api/login";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    mode: "cors",
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (!res.ok) {
        alert("Invalid login credentials");
      } else {
        return res.json();
      }
    })
    .then((user) => {
      if (user != null) {
        sessionStorage.setItem("user", JSON.stringify(user));
        document.location = "/main";
      }
    });
});
