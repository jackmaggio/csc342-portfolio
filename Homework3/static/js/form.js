document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#payment-form");
  const fileInput = document.querySelector("#file");

  fileInput.addEventListener("change", (e) => {
    const input = document.querySelector("#file");
    const image = document.querySelector("#preview-image");
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        image.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  });

  form.addEventListener("submit", (e) => {
    const notifyEmail = document.querySelector("#notify-email");
    const notifySms = document.querySelector("#notify-sms");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const expiration = document.querySelector("#expiration-date").value;

    if (notifyEmail.checked && emailInput.value == "") {
      alert("You must provide an email for the recipient.");
      e.preventDefault();
      return false;
    }
    if (notifySms.checked && phoneInput.value == "") {
      alert("You must provide a phone number for the recipient.");
      e.preventDefault();
      return false;
    }

    const date = Date.parse(expiration);
    if (isNaN(date) || date <= new Date()) {
      alert("The card is expired.");
      e.preventDefault();
      return false;
    }
  });
});
