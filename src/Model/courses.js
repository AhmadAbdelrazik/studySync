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
    this.urlName = nm.split(" ");
    this.urlName = this.urlName.map(w => w.toLowerCase());
    this.urlName = this.urlName.join("_");
  }

  async addCourse() {
    return new Promise(async (resolve, reject) => {
      try {
        // 1) load the courses from database.
        const data = await fs.readFile(coursesPath);
        const courses = JSON.parse(data);
        
        // 2) Check If Course is there.
        const course = courses.find(crs => crs.urlName == this.urlName);

        if (course) throw("Course Already Exists");

        // 3) Create the Questions File.
        await fs.writeFile(path.join(questionsPath, `${this.urlName}.json`), "[]");

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

  static courseExist(name) {
        return new Promise(async (resolve, reject) => {
          try {
            const data = await fs.readFile(coursesPath);
            const courses = JSON.parse(data);
            
            const course = courses.find(crs => crs.urlName == name);
            
            if (course)
              resolve(true);
            else 
              resolve(false);

          } catch (err) {
            reject(err);
          }

        })
  }
};
