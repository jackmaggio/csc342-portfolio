let Post = require("./model/Post");
const db = require("./DBConnection");
const { create } = require("domain");

function getForumPosts(courseId) {
  return db
    .query("SELECT * FROM posts p WHERE p.course_id = ?", [courseId])
    .then(({ results }) => {
      return results.map((forumpost) => new Post(forumpost));
    });
}

function getForumPost(postId) {
  return db
    .query("SELECT * FROM posts p WHERE p.post_id = ?", [postId])
    .then(({ results }) => {
      if (results[0]) {
        return new Post(results[0]);
      }
    });
}

function createForumPost(data) {
  console.log(data);
  return db
    .query("INSERT INTO posts VALUES (null, ?, ?, ?)", [
      data.course_id,
      data.user_id,
      data.post_content,
    ])
    .then(({ results }) => {
      console.log("I was updated successfully! ", results.insertId);
      return getForumPost(results.insertId);
    });
}

function deleteForumPost(postId) {
  return db
    .query("DELETE FROM posts WHERE post_id = ?", [postId])
    .then(({ results }) => {
      console.log("I was deleted successfully! ", results);
      return results;
    });
}

function updateForumPost(data) {
  return db
    .query(
      "UPDATE posts SET post_content = ? WHERE post_id = ?",
      [data.post_content, data.post_id]
    )
    .then(() => {
      return getForumPost(data.post_id);
    });
}

module.exports = {
  getForumPosts: getForumPosts,
  getForumPost: getForumPost,
  createForumPost: createForumPost,
  deleteForumPost: deleteForumPost,
  updateForumPost: updateForumPost,
};
