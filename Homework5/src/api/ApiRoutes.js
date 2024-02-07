const express = require("express");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const apiRouter = express.Router();
apiRouter.use(cookieParser());

let users = require("../data/users.json");

const {
  validateToken,
  generateToken,
  removeToken,
} = require("../middleware/TokenMiddleware");

apiRouter.post("/login", (req, res) => {
  let username = req.body["username"];
  let password = req.body["password"];
  let user = users.find((user) => user.username == username);

  if (user == null) {
    res.status(401).json({ error: "User not found" });
  } else {
    let hashedPassword = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, `sha512`)
      .toString(`hex`);
    if (hashedPassword != user.password) {
      res.status(401).json({ error: "Invalid username or password" });
    } else {
      generateToken(req, res, user);
      return res.json(user);
    }
  }
});

apiRouter.post("/logout", (req, res) => {
  removeToken(req, res);
  res.json({ success: true });
});

apiRouter.get("/users/current", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = apiRouter;
