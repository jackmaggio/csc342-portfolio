const express = require("express");
const frontendRouter = express.Router();

const html_dir = __dirname + "../../../" + "templates/";

let path = require("path");
console.log(path.resolve(`${html_dir}login.html`));

frontendRouter.get("/", (req, res) => {
  res.sendFile(path.resolve(`${html_dir}login.html`));
});

frontendRouter.get("/profile", (req, res) => {
  res.sendFile(path.resolve(`${html_dir}profile.html`));
});

frontendRouter.get("/main", (req, res) => {
  res.sendFile(path.resolve(`${html_dir}main.html`));
});

module.exports = frontendRouter;
