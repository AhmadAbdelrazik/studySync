const validator = require('../utils/questionsValidator');
const putValidator = require('../utils/questionsPutValidator');
const nQvalidator = require('../utils/nQuestionsValidator');
const statusCode = require('../utils/HttpStatus');




const question = (req, res, next) => {
  const valid = validator(req.body);

  if (!valid)
    return res.status(statusCode.BAD_REQUEST).send(`Invalid Format ...`);

  let correct = 0;
  for (let ans of req.body.choices) {
    if (ans.isCorrect)
      correct += 1;
  }
  if (correct != 1) {
    return res.status(statusCode.BAD_REQUEST).send(`correct answers are not 1`);
  } else {
    if (!req.body.explaination) 
      req.body.explaination = "No Explaination";
    
    next();
  }
}


const putQuestion = (req, res, next) => {
  const valid = putValidator(req.body);

  if (!valid)
    return res.status(statusCode.BAD_REQUEST).send(`Invalid Format ...`);

  let correct = 0;
  for (let ans of req.body.choices) {
    if (ans.isCorrect)
      correct += 1;
  }
  if (correct != 1) {
    return res.status(statusCode.BAD_REQUEST).send(`correct answers are not 1`);
  } else {
    if (!req.body.explaination) 
      req.body.explaination = "No Explaination";
    
    next();
  }
}

const nQuestions = (req, res, next) => {
  const valid = nQvalidator(req.body);

  if (!valid)
    return res.status(statusCode.BAD_REQUEST).send(`Invalid Format ...`);

  if (!req.body.page)
    req.body.page = 1;

  next();
}

module.exports = {
  question,
  nQuestions,
  putQuestion
}