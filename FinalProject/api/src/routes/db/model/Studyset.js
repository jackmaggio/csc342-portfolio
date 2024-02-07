module.exports = class {
  studyset_id = null;
  studyset_title = null;
  course_id = null;
  user_id = null;

  constructor(data) {
    this.studyset_id = data.studyset_id;
    this.studyset_title = data.studyset_title;
    this.course_id = data.course_id;
    this.user_id = data.user_id;
  }
};
