const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(cookieParser());

const UserDAO = require("./db/UsersDAO");

const {
  TokenMiddleware,
  generateToken,
  removeToken,
} = require("../middleware/TokenMiddleware");

userRouter.get("/", TokenMiddleware, (req, res) => {
  UserDAO.getUsers().then((users) => {
    res.json(users);
    console.log("Get all users");
  });
});

userRouter.get("/email/:email", TokenMiddleware, (req, res) => {
  UserDAO.getUser(req.params.email)
    .then((users) => {
      res.json(users);
      console.log("Get user: " + req.params.email);
    })
    .catch(() => {
      res.status(404).json({ error: "user not found" });
    });
});

userRouter.get("/id/:userId", TokenMiddleware, (req, res) => {
  UserDAO.getUserById(req.params.userId)
    .then((users) => {
      res.json(users);
      console.log("Get user: " + req.params.email);
    })
    .catch(() => {
      res.status(404).json({ error: "user not found" });
    });
});

userRouter.post("/", TokenMiddleware, (req, res) => {
  const newUser = req.body;
  UserDAO.createUser(newUser)
    .then((newUser) => {
      res.status(201).json(newUser);
      console.log("Created user: ", newUser);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not create user" });
    });
});

userRouter.get("/current", TokenMiddleware, (req, res) => {
  console.log("Getting current user");
  res.json(req.user);
});

module.exports = userRouter;
