const express = require("express");
const cookieParser = require("cookie-parser");

const courseRouter = express.Router();
const studysetRouter = require("./studyset_routes");
const forumRouter = require("./forum_post_routes");

courseRouter.use(express.json());
courseRouter.use("/:courseId/studysets", studysetRouter);
courseRouter.use("/:courseId/forumPosts", forumRouter);

const CoursesDAO = require("./db/CoursesDAO");

courseRouter.use(cookieParser());
const {
  TokenMiddleware,
  generateToken,
  removeToken,
} = require("../middleware/TokenMiddleware");

//Courses Endpoints
courseRouter.get("/", TokenMiddleware, (req, res) => {
  CoursesDAO.getCourses().then((courses) => {
    res.json(courses);
    console.log("Get all courses");
  });
});

courseRouter.get("/:courseId", TokenMiddleware, (req, res) => {
  let id = req.params.courseId;
  console.log("Get course with id: " + id);
  CoursesDAO.getCourse(id)
    .then((course) => {
      res.json(course);
    })
    .catch(() => {
      res.status(404).json({ error: "Course not found" });
    });
});

module.exports = courseRouter;
