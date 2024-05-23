const fs = require("fs/promises");
const path = require("path");

const pageSize = 10;

const questionPath = path.join(
  path.dirname(require.main.filename),
  "Data",
  "Questions"
);

module.exports = class Question {
  constructor(question, choices, explaination, course) {
    this.question = question;
    this.choices = choices;
    this.explaination = explaination;
    this.course = course;
  }

  async addQuestion() {
    return new Promise(async (resolve, reject) => {
      try {
        // 1) load the questions from the database.

        const qPath = path.join (questionPath, `${this.course}.json`);

        const data = await fs.readFile(qPath);
        const questions = JSON.parse(data);

        const check = questions.find(q => q.question.toLowerCase() == this.question.toLowerCase());

        if (check) {
          resolve(false);
          return;
        }

        this.id = questions.length + 1;
        questions.push(this);

        await fs.writeFile(path.join(qPath), JSON.stringify(questions));
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getQuestions() {
    return new Promise(async (resolve, reject) => {
      const qPath = path.join(questionPath, `${this.course}.json`);
    });
  }
}