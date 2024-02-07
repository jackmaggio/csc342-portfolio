module.exports = class {
  flashcard_id = null;
  user_id = null;
  studyset_id = null;
  question = null;
  answer = null;

  constructor(data) {
    this.flashcard_id = data.flashcard_id;
    this.user_id = data.user_id;
    this.studyset_id = data.studyset_id;
    this.question = data.question;
    this.answer = data.answer;
  }
};
