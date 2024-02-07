module.exports = class {
  post_id = null;
  post_content = null;
  user_id = null;
  course_id = null;


  constructor(data) {
    this.post_id = data.post_id;
    this.post_content = data.post_content;
    this.user_id = data.user_id;
    this.course_id = data.course_id;
  }
};
