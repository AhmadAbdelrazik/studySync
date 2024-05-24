const Course = require("../Model/courses");
const HttpStatus = require("../utils/HttpStatus");

const getCourses = async (req, res) => {
    const courses = await Course.find({}, { _id: 0, name: 1, urlName: 1 });
    res.send(courses);
};

const addCourse = async (req, res) => {
    let urlName = req.body.name;
    urlName = urlName.toLowerCase();
    urlName = urlName.replace(" ", "_");
    const course = new Course({ name: req.body.name, urlName: urlName });
    await course.save();
    res.status(HttpStatus.ACCEPTED).send("Course has been added");
};

const putCourse = async (req, res) => {
    const newCourse = await Course.findOne({urlName: req.body.newName});
    if (newCourse) {
      res.status(HttpStatus.FORBIDDEN).send("Course Already Exists");
      return;
    }

    req.course.name = req.body.newName;
    req.course.urlName = req.course.name.toLowerCase();
    req.course.urlName = req.course.urlName.replace(" ", "_");

    await req.course.save();
    res.status(HttpStatus.ACCEPTED).send("Course has been updated");
};

const deleteCourse = async (req, res) => {
    const course = await Course.findOneAndDelete({name: req.body.name});
    if (course)
      res.send("Course has been deleted");
    else 
      res.status(HttpStatus.NOT_FOUND).send("Course doesn't exist");
}

const courseParam = async (req, res, next, val) => {
  try {
    const course = await Course.findOne({ urlName: val });
    if (course) {
      req.course = course;
      next();
    } else res.status(HttpStatus.NOT_FOUND).send("Course Not Found");
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

module.exports = {
  getCourses,
  addCourse,
  putCourse,
  deleteCourse,
  courseParam
};
