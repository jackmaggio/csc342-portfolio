const express = require("express");
const cookieParser = require("cookie-parser");

const studysetRouter = express.Router({ mergeParams: true });
const flashcardRouter = require("./flashcard_routes");

studysetRouter.use(express.json());
studysetRouter.use(cookieParser());
studysetRouter.use("/:studysetId/flashcards", flashcardRouter);

const {
  TokenMiddleware,
  generateToken,
  removeToken,
} = require("../middleware/TokenMiddleware");
const StudysetsDAO = require("./db/StudysetsDAO");

//Studyset Endpoints
studysetRouter.get("/", TokenMiddleware, (req, res) => {
  console.log(req.params);
  StudysetsDAO.getStudysets(req.params.courseId).then((sets) => {
    res.json(sets);
    console.log("Get all studysets");
  });
});

studysetRouter.get("/:studysetId", TokenMiddleware, (req, res) => {
  StudysetsDAO.getStudyset(req.params.studysetId)
    .then((sets) => {
      res.json(sets);
      console.log("Get studyset: " + req.params.studysetId);
    })
    .catch(() => {
      res.status(404).json({ error: "Studyset not found" });
    });
});

studysetRouter.post("/", TokenMiddleware, (req, res) => {
  let data = {
    studyset_title: req.body.title,
    course_id: req.params.courseId,
    user_id: req.user.id,
  };
  StudysetsDAO.createStudyset(data).then((studyset) => {
    console.log("in routes ", studyset);
    res.json(studyset);
  });
});

studysetRouter.delete("/:studysetId", TokenMiddleware, (req, res) => {
  StudysetsDAO.deleteStudyset(req.params.studysetId).then((result) => {
    console.log("in routes ", result);
    res.json(result);
  });
});

studysetRouter.put("/", TokenMiddleware, (req, res) => {
  console.log(req.body);
  let data = {
    studyset_title: req.body.title,
    studyset_id: req.body.id,
  };
  StudysetsDAO.updateStudyset(data).then((studyset) => {
    console.log("in routes ", studyset);
    res.json(studyset);
  });
});
module.exports = studysetRouter;
