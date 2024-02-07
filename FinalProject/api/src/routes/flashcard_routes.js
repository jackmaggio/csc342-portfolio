const express = require("express");
const cookieParser = require("cookie-parser");

const flashcardRouter = express.Router({ mergeParams: true });
const FlashcardsDAO = require("./db/FlashcardsDAO");

flashcardRouter.use(cookieParser());
const {
  TokenMiddleware,
  generateToken,
  removeToken,
} = require("../middleware/TokenMiddleware");

//Flashcard Endpoints
flashcardRouter.get("/", TokenMiddleware, (req, res) => {
  console.log("in flashcards get all: " + req.params.studysetId);
  FlashcardsDAO.getFlashcards(req.params.studysetId).then((cards) => {
    res.json(cards);
    console.log("Get all flashcards");
  });
});

flashcardRouter.get("/:question", TokenMiddleware, (req, res) => {
  FlashcardsDAO.getFlashcard(req.params)
    .then((cards) => {
      res.json(cards);
      console.log("Get flashcard: " + req.params.question);
    })
    .catch(() => {
      res.status(404).json({ error: "Flashcard not found" });
    });
});

flashcardRouter.post("/", TokenMiddleware, (req, res) => {
  console.log(req.body);
  let data = {
    question: req.body.question,
    answer: req.body.answer,
    studyset_id: req.params.studysetId,
    user_id: req.user.id,
  };
  console.log(data);
  FlashcardsDAO.createFlashcard(data).then((flashcard) => {
    console.log("in routes ", flashcard);
    res.json(flashcard);
  });
});

flashcardRouter.delete("/:flashcardId", TokenMiddleware, (req, res) => {
  FlashcardsDAO.deleteFlashcard(req.params.flashcardId).then((result) => {
    console.log("in routes ", result);
    res.json(result);
  });
});

flashcardRouter.put("/", TokenMiddleware, (req, res) => {
  console.log(req.body);
  let data = {
    answer: req.body.answer,
    question: req.body.question,
    flashcard_id: req.body.id,
  };
  FlashcardsDAO.updateFlashcard(data).then((flashcard) => {
    console.log("in routes ", flashcard);
    res.json(flashcard);
  });
});

module.exports = flashcardRouter;
