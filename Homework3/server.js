const express = require("express");
const multer = require("multer");
const fs = require("fs");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    let mimetype = file.mimetype.split("/");
    let extension = mimetype[mimetype.length - 1];
    let filename = file.originalname.split(".");
    let name = filename[0];
    cb(null, name + "-" + Date.now() + "." + extension);
  },
});
const upload = multer({ storage: storage });

const app = express();

const PORT = 80;

const html_dir = __dirname + "/templates";
const static_dir = __dirname + "/static";

app.use(express.static(static_dir));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(html_dir + "/form.html");
});

app.post("/send", upload.single("picture"), (req, res) => {
  let valid = server_validation(req);
  if (!valid) {
    res.sendFile(html_dir + "/error.html");
    if (req.file != undefined) {
      fs.unlinkSync(req.file.path);
    }
  } else {
    res.sendFile(html_dir + "/success.html");
  }
});
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

function server_validation(req) {
  const body = req.body;
  const file = req.file;

  if (
    file == null ||
    file["mimetype"] == null ||
    !file["mimetype"].startsWith("image")
  ) {
    return false;
  }
  const fields = [
    "sender-fname",
    "sender-lname",
    "recipient-fname",
    "recipient-lname",
    "message",
    "card-type-input",
    "card-number",
    "expiration-date",
    "ccv",
    "amount",
    "terms",
  ];

  fields.forEach((field) => {
    if (body[field] == null || body[field] === "") {
      return false;
    }
  });

  const recipientFname = body["recipient-fname"].toLowerCase();
  const recipientLname = body["recipient-lname"].toLowerCase();
  if (
    (recipientFname === "stuart" || recipientFname === "stu") &&
    recipientLname === "dent"
  ) {
    return false;
  }

  const senderFname = body["sender-fname"].toLowerCase();
  const senderLname = body["sender-lname"].toLowerCase();
  if (
    (senderFname === "stuart" || senderFname === "stu") &&
    senderLname === "dent"
  ) {
    return false;
  }

  if (body["message"].length < 10) {
    return false;
  }
  if (body["notify-email"] != null && body["email"] == null) {
    return false;
  }
  if (body["notify-sms"] != null && body["phone"] == null) {
    return false;
  }

  const expiration = Date.parse(body["expiration-date"]);
  if (isNaN(expiration) || expiration <= new Date()) {
    return false;
  }
  const amount = Number(body["amount"]);
  if (isNaN(amount) || amount <= 0) {
    return false;
  }
  const cardNumber = body["card-number-input"];
  if (!cardNumber.match("[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}")) {
    return false;
  }
  if (body["ccv"].length >= 3 && body["ccv"].length <= 4) {
    for (char in body["ccv"]) {
      if (isNaN(char)) {
        return false;
      }
    }
  } else {
    return false;
  }

  if (body["terms"] == null || body["terms"] != "on") {
    return false;
  }
  return true;
}
