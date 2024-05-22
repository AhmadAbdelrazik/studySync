const Course = require("../Model/courses");
const Courses = require("../Model/questions");
const validator = require("../utils/courseValidator");
const HttpStatus = require("../utils/HttpStatus");
const httpStatus = require("../utils/HttpStatus");

const getCourses = (req, res) => {
  Course.courses()
    .then((courses) => res.status(httpStatus.OK).send(courses))
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const addCourse = (req, res) => {
  let crs = new Course(req.body.name);

  crs.addCourse()
    .then((m) => res.status(201).send(m))
    .catch((e) => {
      res.status(401).send(e);
      console.log(e);
    });
};

const courseParam = async (req, res, next, val) => {
  Course.courseExist(val)
    .then((v) => {
      if (v) {
        req.course = val;
        next();
      } else res.status(httpStatus.NOT_FOUND).send("Course Not Found");
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Server Error");
    });
};

module.exports = {
  getCourses,
  addCourse,
  courseParam,
};
