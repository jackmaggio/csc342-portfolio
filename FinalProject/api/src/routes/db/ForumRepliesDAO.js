let Reply = require("./model/Reply");
const db = require("./DBConnection");
const { create } = require("domain");


  function getForumReplies (postId) {
    return db
      .query(" SELECT * FROM replies r WHERE r.post_id = ?", [postId])
      .then(({ results }) => {
        return results.map((reply) => new Reply(reply));
      });
  }

  function getForumReply (replyId) {
    return db
      .query("SELECT * FROM replies r WHERE r.reply_id = ?", [replyId])
      .then(({ results }) => {
        if (results[0]) {
          return new Reply(results[0]);
        }
      });
  }

  function createForumReply(data) {
    console.log(data);
      return db
      .query("INSERT INTO replies VALUES (null, ?, ?, ?)", [
        data.post_id,
        data.user_id,
        data.reply_content,
      ])
      .then(({ results }) => {
        console.log("I was updated successfully! ", results.insertId);
        return getForumReply(results.insertId);
      });
  }

  function deleteForumReply(replyId) {
    return db
    .query("DELETE FROM replies WHERE reply_id = ?", [replyId])
    .then(({ results }) => {
      console.log("I was deleted successfully! ", results);
      return results;
    });
  }

  function updateForumReply(data) {
    return db
    .query(
      "UPDATE replies SET reply_content = ? WHERE reply_id = ?",
      [data.reply_content, data.reply_id]
    )
    .then(() => {
      return getForumReply(data.reply_id);
    });
  }

module.exports = {
  getForumReplies: getForumReplies,
  getForumReply: getForumReply,
  createForumReply: createForumReply,
  deleteForumReply: deleteForumReply,
  updateForumReply: updateForumReply,
};
