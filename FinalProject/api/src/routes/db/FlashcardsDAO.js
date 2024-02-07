let Flashcard = require("./model/Flashcard");
const db = require("./DBConnection");

function getFlashcards(studysetId) {
  return db
    .query("SELECT * FROM flashcards fc WHERE fc.studyset_id = ?", [studysetId])
    .then(({ results }) => {
      return results.map((flashcard) => new Flashcard(flashcard));
    });
}

function getFlashcard(flashcardId) {
  return db
    .query("SELECT * FROM flashcards fc WHERE fc.flashcard_id = ?", [
      flashcardId,
    ])
    .then(({ results }) => {
      if (results[0]) {
        return new Flashcard(results[0]);
      }
    });
}

function createFlashcard(flashcard) {
  console.log(flashcard);
  return db
    .query("INSERT INTO flashcards VALUES (null, ?, ?, ?, ?)", [
      flashcard.studyset_id,
      flashcard.user_id,
      flashcard.question,
      flashcard.answer,
    ])
    .then(({ results }) => {
      console.log("I was updated successfully! ", results.insertId);
      return getFlashcard(results.insertId);
    });
}

function deleteFlashcard(flashcardId) {
  return db
    .query("DELETE FROM flashcards WHERE flashcard_id = ?", [flashcardId])
    .then(({ results }) => {
      console.log("I was deleted successfully! ", results);
      return results;
    });
}

function updateFlashcard(data) {
  return db
    .query(
      "UPDATE flashcards SET question = ?, answer = ? WHERE flashcard_id = ?",
      [data.question, data.answer, data.flashcard_id]
    )
    .then(() => {
      return getFlashcard(data.flashcard_id);
    });
}

module.exports = {
  getFlashcards: getFlashcards,
  getFlashcard: getFlashcard,
  createFlashcard: createFlashcard,
  deleteFlashcard: deleteFlashcard,
  updateFlashcard: updateFlashcard,
};
