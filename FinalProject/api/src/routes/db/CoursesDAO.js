let Course = require("./model/Course");
const db = require("./DBConnection");

module.exports = {
  getCourses: () => {
    return db.query("SELECT * FROM courses").then(({ results }) => {
      return results.map((course) => new Course(course));
    });
  },

  getCourse: (courseId) => {
    return db
      .query("SELECT * FROM courses WHERE course_id=?", [courseId])
      .then(({ results }) => {
        if (results[0]) {
          return new Course(results[0]);
        }
      });
  },

  createCourse: (course) => {
    return db
      .query("INSERT INTO courses (course_title) VALUES (?)", [
        course.course_title,
      ])
      .then(({ results }) => {
        return getCourse(results.course_title);
      });
  },
};
