const Course = require("../Model/courses");
const validator = require("../utils/courseValidator");

const getCourses = (req, res) => {
  Course.courses()
    .then((courses) => res.status(200).send(courses))
    .catch((e) => res.status(400).send(e));
};

const addCourse = (req, res) => {
  let crs = new Course(req.body.name);

  crs.addCourse()
    .then((m) => res.status(200).send(m))
    .catch((e) => res.status(401).send(e));
};

const courseParam = async (req, res, next, val) => {
  try {
    const courses = await Course.courses();
    const idx = courses.find(obj => obj.name === val);
    if (idx == -1) {
      return res.status(404).send("Course Not found");
    } else {
      req.course = val;
      next();
    }
  } catch (err) {
    res.status(401).send(err);
  }

};

module.exports = {
  getCourses,
  addCourse,
  courseParam,
};
