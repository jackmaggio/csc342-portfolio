const express = require("express");
const cookieParser = require('cookie-parser');

const forumReplyRouter = express.Router({ mergeParams: true });

forumReplyRouter.use(express.json());

const ForumRepliesDAO = require("./db/ForumRepliesDAO");

forumReplyRouter.use(cookieParser());
const {TokenMiddleware, generateToken, removeToken} = require('../middleware/TokenMiddleware');

//Forum Reply Endpoints
forumReplyRouter.get("/", TokenMiddleware, (req, res) => {
  console.log("Gettings heree me too")
  console.log("Gettings heree me too")
  console.log("Gettings heree me too")
  console.log("Gettings heree me too")
  console.log("Gettings heree me too")
  console.log("Gettings heree me too")
  console.log("Gettings heree me too")
  console.log("Gettings heree me too")
  
  console.log(req.params);
  ForumRepliesDAO.getForumReplies(req.params.forumPostId).then((forumReplies) => {
    res.json(forumReplies);
    console.log("Get all forum replies");
  });
});

forumReplyRouter.get("/:forumReplyId", TokenMiddleware, (req, res) => {
  ForumRepliesDAO.getForumReply(req.params)
    .then((forumReplies) => {
      res.json(forumReplies);
      console.log("Get forum reply: " + req.params.forumReplyId);
    })
    .catch(() => {
      res.status(404).json({ error: "Forum reply not found" });
    });
});

forumReplyRouter.post("/", TokenMiddleware, (req, res) => {
  //ForumRepliesDAO.createForumReply(req.body).then(() => {
  //  alert("Created Forum Reply! (Not Implemented)");
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
  console.log(req.params);
  let data = {
    reply_content: req.body.body,
    post_id: req.params.forumPostId,
    user_id: req.user.id,
  };
  console.log(data);
  ForumRepliesDAO.createForumReply(data).then((forumreply) => {
    console.log("in routes ", forumreply);
    res.json(forumreply);
  });
});

forumReplyRouter.delete("/:forumReplyId",  TokenMiddleware, (req, res) => {
  console.log(req.params);
  ForumRepliesDAO.deleteForumReply(req.params.forumReplyId).then((result) => {
    console.log("in routes 5", result);
    res.json(result);
  });
});

forumReplyRouter.put("/", TokenMiddleware, (req, res) => {
  console.log(req.body);
  let data = {
    reply_content: req.body.reply,
    reply_id: req.body.id,
  };
  ForumRepliesDAO.updateForumReply(data).then((reply) => {
    console.log("in here part2");
    console.log("in routes 4", reply);
    res.json(reply);
  });
});

module.exports = forumReplyRouter;
