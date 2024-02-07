let Studyset = require("./model/Studyset");
const db = require("./DBConnection");
const { create } = require("domain");

function getStudysets(courseId) {
  return db
    .query("SELECT * FROM studysets ss WHERE ss.course_id = ?", [courseId])
    .then(({ results }) => {
      return results.map((studyset) => new Studyset(studyset));
    });
}

function getStudyset(studysetId) {
  return db
    .query("SELECT * FROM studysets ss WHERE ss.studyset_id = ?", [studysetId])
    .then(({ results }) => {
      if (results[0]) {
        return new Studyset(results[0]);
      }
    });
}

function createStudyset(data) {
  return db
    .query("INSERT INTO studysets VALUES (null, ?, ?, ?)", [
      data.course_id,
      data.user_id,
      data.studyset_title,
    ])
    .then(({ results }) => {
      console.log("I was updated successfully! ", results.insertId);
      return getStudyset(results.insertId);
    });
}

function deleteStudyset(studysetId) {
  return db
    .query("DELETE FROM studysets WHERE studyset_id = ?", [studysetId])
    .then(({ results }) => {
      console.log("I was deleted successfully! ", results);
      return results;
    });
}

function updateStudyset(data) {
  return db
    .query("UPDATE studysets SET studyset_title = ? WHERE studyset_id = ?", [
      data.studyset_title,
      data.studyset_id,
    ])
    .then(() => {
      return getStudyset(data.studyset_id);
    });
}

module.exports = {
  getStudysets: getStudysets,
  getStudyset: getStudyset,
  createStudyset: createStudyset,
  deleteStudyset: deleteStudyset,
  updateStudyset: updateStudyset,
};
