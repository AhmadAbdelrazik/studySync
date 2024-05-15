const Course = require('../Model/courses');
const validator = require('../utils/courseValidator');

const getCourses = (req, res) => {  
  Course.courses((coursesData) => {
    res.json(coursesData);
  })
}

const addCourse = (req, res) => {
  const valid = validator(req.body)

  if (valid) {
    let crs = new Course(req.body.name);
    crs.addCourse((ok, message) => {
      if (ok) {
        res.send("course has been added successfully");
      } else {
        res.status(402).send(message);
      }
    });
  } else {
    res.status(402).send("Invalid Format");
  }
}

module.exports = {
  getCourses,
  addCourse
}