const Question = require("../Model/questionsDB");
const validator = require("../utils/courseValidator");
const httpStatus = require("../utils/HttpStatus");

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ course: req.course.name }, {
      '_id': 0,
      'choices._id': 0,
      '__v': 0,
      'course': 0
    });
    res.json(questions);
  } catch (err) {
    console.log(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

const addQuestion = async (req, res) => {
  try {
    console.log(req.course);
    const check = await Question.findOne({question: req.body.question});
    
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
  } catch (err) {
    for (let p in err) {
      console.log(p);
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
};

module.exports = {
  getQuestions,
  addQuestion,
};
