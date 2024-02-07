const backButton = document.querySelector("#back");

backButton.addEventListener("click", () => {
  console.log(window.location.origin + "/");
  window.location.href = window.location.origin + "/";
});
