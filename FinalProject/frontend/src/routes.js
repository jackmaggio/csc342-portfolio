const express = require("express");
const router = express.Router();

const html_dir = __dirname + "/templates/";

router.get("/", (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});

router.get("/course", (req, res) => {
  res.sendFile(`${html_dir}course.html`);
});

router.get("/courseselection", (req, res) => {
  res.sendFile(`${html_dir}course_selection.html`);
});

router.get("/login", (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});

router.get("/menu", (req, res) => {
  res.sendFile(`${html_dir}menu.html`);
});

router.get("/register", (req, res) => {
  res.sendFile(`${html_dir}register.html`);
});

router.get("/studyset", (req, res) => {
  res.sendFile(`${html_dir}studyset.html`);
});

router.get("/studysetcreation", (req, res) => {
  res.sendFile(`${html_dir}studyset_creation.html`);
});

router.get("/discussion", (req, res) => {
  res.sendFile(`${html_dir}discussion.html`);
});

router.get("/discussionpost", (req, res) => {
  res.sendFile(`${html_dir}post_discussion.html`);
});

router.get("/discussionpostreplies", (req, res) => {
  res.sendFile(`${html_dir}discussion_replies.html`);
});

router.get("/offline", (req, res) => {
  res.sendFile(`${html_dir}offline.html`);
});



module.exports = router;
