const Course = require("../Model/coursesDB");
const HttpStatus = require("../utils/HttpStatus");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}, {_id: 0, name: 1, urlName: 1});
    res.send(courses);
  } catch (err) {
    console.log(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

const addCourse = async (req, res) => {
  try {
    let urlName = req.body.name;
    urlName = urlName.toLowerCase();
    urlName = urlName.replace(' ', '_');
    const course = new Course({name: req.body.name, urlName: urlName});
    await course.save();
    res.status(HttpStatus.ACCEPTED).send("Course has been added");
  } catch (err) {
    console.log(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

const courseParam = async (req, res, next, val) => {
  try{
    const course = await Course.find({name: val});
    if (course) {
      req.course = course;
      console.log(course);
      next();
    } else  res.status(HttpStatus.NOT_FOUND).send("Course Not Found");
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

module.exports = {
  getCourses,
  addCourse,
  courseParam,
};
