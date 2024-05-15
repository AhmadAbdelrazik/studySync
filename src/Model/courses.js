const fs = require('fs');
const path = require('path');
const coursesPath = path.join(path.dirname(require.main.filename), "data", "courses.json");

module.exports = class Courses{
  constructor(nm) {
    this.name = nm;
  }

  addCourse(cb) {
    fs.readFile(coursesPath, (err, data) => {
      if (!err) {
        // 1) read the courses
        let courses = [];
        courses = JSON.parse(data);
        
        // 2) check if course is there.

        let found = courses.find(crs => crs.name == this.name);
        if (found) {
          cb(false, "Course Already exist");
        } else {
          this.id = courses.length + 1;
          courses.push(this);
          fs.writeFile(coursesPath, JSON.stringify(courses), (err) => {
            if (err) {
              console.log(err);
              cb(false, "Error while writing to file");
            }
          })
          cb(true);
        }
      }
      else {
        console.log(err);
        cb(false, "error while opening File");
      }
    })
  }

  static courses(cb) {
    fs.readFile(coursesPath, (err, data) => {
      if (!err) {
        let courses = [];
        courses = JSON.parse(data);
        cb(courses);
      } else {
        console.log(err);
        cb([]);
      }
    })
  }
}