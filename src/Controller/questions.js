const Question = require("../Model/questions");
const validator = require("../utils/courseValidator");
const HttpStatus = require("../utils/HttpStatus");


const getQuestions = async (req, res) => {
  const pageSize = 10;
  // Load All Questions
  const start = (req.body.page - 1) * pageSize;
  const end = (req.body.page * pageSize) - 1;

  const questions = await Question.find({course: req.course.name});

  if (!questions.length) {
    res.status(HttpStatus.NOT_FOUND).send("No Questions yet");
    return;
  }

  const pages = Math.ceil(questions.length / pageSize).toFixed();

  // Check if page is out of bound.
  if (questions.length < start) {
    res.status(HttpStatus.BAD_REQUEST).send(`There is only ${pages} pages`);
  } else {
    res.json(questions.slice(start, end));
  }
}

const addQuestion = (req, res) => {
  const question = new Question(
    req.body.question,
    req.body.choices,
    req.body.explaination,
    req.course
  )

  question.addQuestion()
    .then(v => {
      if (v)
        res.status(HttpStatus.ACCEPTED).send("Questions has been submitted");
      else
        res.status(HttpStatus.BAD_REQUEST).send("Questions already exists");
    })
    .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error"));

}

module.exports = {
  getQuestions,
  addQuestion
};
