const express = require("express");
const frontendRouter = express.Router();

const html_dir = __dirname + "../../../" + "templates/";

let path = require("path");

frontendRouter.get("/", (req, res) => {
  res.sendFile(path.resolve(`${html_dir}login.html`));
});

frontendRouter.get("/home", (req, res) => {
  res.sendFile(path.resolve(`${html_dir}home.html`));
});

module.exports = frontendRouter;
