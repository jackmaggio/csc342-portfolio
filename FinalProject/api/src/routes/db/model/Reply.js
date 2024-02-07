module.exports = class {
  reply_id = null;
  post_id = null;
  user_id = null;
  reply_content = null;


  constructor(data) {
    this.reply_id = data.reply_id;
    this.post_id = data.post_id;
    this.user_id = data.user_id;
    this.reply_content = data.reply_content;
  }
};
