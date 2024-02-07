const express = require("express");
const apiRouter = express.Router();

// apiRouter.use("/");
let users = require("../data/users.json");
let howls = require("../data/howls.json");
let follows = require("../data/follows.json");
let howlId = 101;

apiRouter.post("/login", (req, res) => {
  let username = req.body["username"];
  let user = users.find((user) => user.username == username);
  if (user == null) {
    res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

apiRouter.get("/user/:username", (req, res) => {
  let user = users.find((user) => user.username == req.params.username);
  if (user == null) {
    res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

/**
 * Get the follows list of the given user id
 */
apiRouter.get("/user/:userId/follows", (req, res) => {
  let followsList = follows[req.params.userId].following;
  if (followsList == null) {
    res.status(404).json({ error: "Follows list not found" });
  }

  let usersList = users.filter((user) => {
    let result = false;
    followsList.forEach((id) => {
      if (id == user.id) {
        result = true;
      }
    });
    return result;
  });
  res.json(usersList);
});

apiRouter.delete("/user/:userId/follows/unfollow/:followId", (req, res) => {
  let followId = req.params.followId;
  let userId = req.params.userId;
  let followsList = follows[userId].following;
  if (followsList == null) {
    res.status(404).json({ error: "Follows list not found" });
  }
  let updatedList = followsList.filter(
    (followedUser) => followedUser != followId
  );
  follows[userId].following = updatedList;
  res.json(updatedList);
});

apiRouter.post("/user/:userId/follows/follow/:followId", (req, res) => {
  let followId = req.params.followId;
  let userId = req.params.userId;

  let followsList = follows[req.params.userId].following;
  if (followsList == null) {
    res.status(404).json({ error: "Follows list not found" });
  }
  follows[userId].following.push(Number(followId));
  res.json(followsList);
});

apiRouter.get("/user/:userId/howls", (req, res) => {
  let howlsList = howls.filter((howl) => howl.userId == req.params.userId);
  howlsList.sort(function (a, b) {
    let date1 = new Date(a.datetime).getTime();
    let date2 = new Date(b.datetime).getTime();

    if (date1 < date2) {
      return 1;
    } else {
      return -1;
    }
  });
  res.json(howlsList);
});

apiRouter.post("/user/:userId/howls/", (req, res) => {
  let newHowl = req.body;
  newHowl["id"] = howlId;
  howlId += 1;

  howls.push(newHowl);
  return res.json(newHowl);
});
apiRouter.get("/user/:userId/follows/howls", (req, res) => {
  let followsList = follows[req.params.userId].following;
  let howlsList = howls.filter((howl) => {
    let result = false;
    followsList.forEach((id) => {
      if (howl.userId == id || howl.userId == req.params.userId) {
        result = true;
      }
    });
    return result;
  });

  howlsList.sort(function (a, b) {
    let date1 = new Date(a.datetime).getTime();
    let date2 = new Date(b.datetime).getTime();

    if (date1 < date2) {
      return 1;
    } else {
      return -1;
    }
  });

  let usersList = users.filter((user) => {
    let result = false;
    followsList.forEach((id) => {
      if (user.id == id || user.id == req.params.userId) {
        result = true;
      }
    });
    return result;
  });
  let body = {};
  body["users"] = usersList;
  body["howls"] = howlsList;
  res.json(body);
});

module.exports = apiRouter;
