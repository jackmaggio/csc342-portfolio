const express = require("express");
const cookieParser = require("cookie-parser");

const router = express.Router();
const courseRouter = require("./course_routes");
const userRouter = require("./user_routes");

router.use(cookieParser());
const {
  TokenMiddleware,
  generateToken,
  removeToken,
} = require("../middleware/TokenMiddleware");

router.use(express.json());
router.use("/courses", courseRouter);
router.use("/users", userRouter);

const UserDAO = require("./db/UsersDAO");

router.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    UserDAO.getUserByCredentials(req.body.email, req.body.password).then(user => {
      let result = {
        user: user
      }

      generateToken(req, res, user);

      res.json(result);
    }).catch(err => {
      res.status(400).json({error: err});
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

router.post("/logout", (req, res) => {
  removeToken(req, res);
  res.json({ success: true });
});

router.post("/register", (req, res) => {
  if (req.body.email && req.body.password) {
    UserDAO.createUser(req.body.email, req.body.password).then((user) => {
      let result = { 
        user: user
      };
      generateToken(req, res, user);
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.code).json({ error: err.message });
      });
  } else {
    res.status(401).json({ error: "Bad request" });
  }
})

module.exports = router;
