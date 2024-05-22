const validator = require('../utils/questionsValidator');
const statusCode = require('../utils/HttpStatus');

module.exports = (req, res, next) => {
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