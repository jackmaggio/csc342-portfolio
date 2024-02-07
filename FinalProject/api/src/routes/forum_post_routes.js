const express = require("express");
const cookieParser = require('cookie-parser');

const forumPostRouter = express.Router({ mergeParams: true });
const forumReplyRouter = require("./forum_replies_routes");

forumPostRouter.use(express.json());
forumPostRouter.use("/:forumPostId/replies", forumReplyRouter);

const ForumPostsDAO = require("./db/ForumPostsDAO");

forumPostRouter.use(cookieParser());
const {TokenMiddleware, generateToken, removeToken} = require('../middleware/TokenMiddleware');

//Forum Posts Endpoints
forumPostRouter.get("/", TokenMiddleware, (req, res) => {
  console.log(req.params);
  ForumPostsDAO.getForumPosts(req.params.courseId).then((forumPosts) => {
    res.json(forumPosts);
    console.log("Get all forum posts");
  });
});

forumPostRouter.get("/:forumPostId", TokenMiddleware, (req, res) => {
  ForumPostsDAO.getForumPost(req.params.forumPostId)
    .then((forumPosts) => {
      res.json(forumPosts);
      console.log("Get forum post: " + req.params.forumPostId);
    })
    .catch(() => {
      res.status(404).json({ error: "Forum Post not found" });
    });
});

forumPostRouter.post("/", TokenMiddleware, (req, res) => {
  //ForumPostsDAO.createForumPost(req.body).then(() => {
  //  alert("Created Forum Post! (Not Implemented)");
  //});
  console.log("Gettings heree")
  console.log("Gettings heree")
  console.log("Gettings heree")
  console.log("Gettings heree")
  console.log("Gettings heree")
  console.log("Gettings heree")
  console.log("Gettings heree")
  console.log("Gettings heree")
  console.log("Gettings heree")

  console.log(req.body);
  let data = {
    post_content: req.body.question,
    course_id: req.params.courseId,
    user_id: req.user.id,
  };
  ForumPostsDAO.createForumPost(data).then((forumpost) => {
    console.log("in routes ", forumpost);
    res.json(forumpost);
  });
});

forumPostRouter.delete("/:forumPostId", (req, res) => {
  //alert("Deleted Forum Post: " + req.params.forumPostId);
  ForumPostsDAO.deleteForumPost(req.params.forumPostId).then((result) => {
    console.log("in routes 1", result);
    res.json(result);
  });
});

forumPostRouter.put("/", (req, res) => {
  console.log(req.body);
  console.log("hi");
  let data = {
    post_content: req.body.question,
    post_id: req.body.id,
  };
  ForumPostsDAO.updateForumPost(data).then((forumPost) => {
    console.log("in here");
    console.log("in routes 2", forumPost);
    res.json(forumPost);
  });
});
module.exports = forumPostRouter;
