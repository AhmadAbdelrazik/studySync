const fs = require("fs/promises");
const path = require("path");
const coursesPath = path.join(
  path.dirname(require.main.filename),
  "Data",
  "courses.json"
);
const questionsPath = path.join(
  path.dirname(require.main.filename),
  "Data",
  "Questions"
);
module.exports = class Courses {
  constructor(nm) {
    this.name = nm;
  }

  async addCourse() {
    return new Promise(async (resolve, reject) => {
      try {
        // 1) load the courses from database.
        const data = await fs.readFile(coursesPath);
        const courses = JSON.parse(data);
        // Parse The Name Format
        let courseName = this.name.split(" ");
        courseName = courseName.map((w) => w.toLowerCase());
        courseName = courseName.join("_");

        // 2) Check If Course is there.
        const codurse = courses.find((crs) => crs.name == courseName);
        const course = courses.find(crs => {
          let name = crs.name.split(" ");
          name = crs.name.map(w => w.toLowerCase());
          name = name.join("_");

          return name == courseName;
        });


        console.log(course);
        if (course) throw("Course Already Exists");


        // 3) Create the Questions File.
        await fs.writeFile(path.join(questionsPath, `${courseName}.json`), "[]");

        // 4) Add to the database.

        courses.push(this);
        await fs.writeFile(coursesPath, JSON.stringify(courses));

        resolve("Course Added Successfully");
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  static courses() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fs.readFile(coursesPath);
        const courses = JSON.parse(data);
        resolve(courses);
      } catch (err) {
        reject(err);
      }
    });
  }
};
