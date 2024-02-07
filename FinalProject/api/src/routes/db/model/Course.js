module.exports = class {
  course_id = null;
  course_title = null;

  constructor(data) {
    this.course_id = data.course_id;
    this.course_title = data.course_title;
  }
};
