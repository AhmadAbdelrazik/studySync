const Question = require("../Model/questions");
const validator = require("../utils/courseValidator");
const HttpStatus = require("../utils/HttpStatus");


const getQuestions = (req, res) => {
  // Load All Questions
  
  // Check if page is out of bound.

  // Get the questions belonging to the specified page
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
