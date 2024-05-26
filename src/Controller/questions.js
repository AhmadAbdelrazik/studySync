const Question = require("../Model/questionsDB");
const validator = require("../utils/validators/courseValidator");
const HttpStatus = require("../utils/HttpStatus");
const httpStatus = require("../utils/HttpStatus");

const getQuestions = async (req, res) => {
  const pageSize = 10;
  // Load All Questions
  const start = (req.body.page - 1) * pageSize;
  const end = req.body.page * pageSize - 1;

  const questions = await Question.find(
    { course: req.course.name },
    {
      _id: 0,
      "choices._id": 0,
      __v: 0,
      course: 0,
    }
  );

  if (!questions.length) {
    res.status(HttpStatus.NOT_FOUND).send("No Questions yet");
    return;
  }

  // Check if page is out of bound.
  if (questions.length < start) {
    const pages = Math.ceil(questions.length / pageSize).toFixed();
    res.status(HttpStatus.BAD_REQUEST).send(`There is only ${pages} pages`);
  } else {
    res.json(questions.slice(start, end));
  }
};

const getRandomQuestion = async (req, res) => {
  const count = await Question.countDocuments({course: req.course.name});
  const random = Math.floor(Math.random() * count);

  const question = await Question.findOne({course: req.course.name}).skip(random);

  if (question) {
    res.send(question);
  } else {
    res.status(HttpStatus.NOT_FOUND).send("No Questions yet");
  }
}

const addQuestion = async (req, res) => {
  const check = await Question.findOne({
    question: req.body.question,
    course: req.course.name,
  });

  if (check) {
    res.status(httpStatus.FORBIDDEN).send("Question already exists");
    return;
  }

  const question = new Question({
    question: req.body.question,
    choices: req.body.choices,
    explaination: req.body.explaination,
    course: req.course.name,
  });

  await question.save();
  res.status(httpStatus.ACCEPTED).send("Question has been added");
};

const putQuestion = async (req, res) => {
  const question = await Question.findOne({
    question: req.body.question,
    course: req.course.name,
  });

  if (!check) {
    res.status(HttpStatus.NOT_FOUND).send("Question Doesn't Exist");
  }

  question.question = req.body.newQuestion;
  question.choices = req.body.choices;
  question.explaination = req.body.explaination;
  question.course = req.body.course;

  await question.save();
  res.status(HttpStatus.ACCEPTED).send("Question has been updated");
};

const deleteQuestion = async (req, res) => {
  const question = await Question.findOneAndDelete({
    question: req.body.question,
    course: req.course.name
  })

  if (question) {
    res.send("Question has been deleted");
  } else 
    res.status(HttpStatus.NOT_FOUND).send("Question doesn't exist");
}

module.exports = {
  getQuestions,
  getRandomQuestion,
  addQuestion,
  putQuestion,
  deleteQuestion
};
