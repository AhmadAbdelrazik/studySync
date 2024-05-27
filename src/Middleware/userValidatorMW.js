const ajv =require('ajv');
const loginValid = require('../utils/validators/loginValidator')
const signUpValid = require('../utils/validators/signUpValidator')
const httpStatus = require('../utils/HttpStatus');

const signUpValidator = function (req, res, next) {
  const valid = signUpValid(req.body);

  if (!valid) 
    return res.status(httpStatus.BAD_REQUEST).send('Invalid Sign up Format');
  else 
    next();
}


const loginValidator = function (req, res, next) {
  const valid = loginValid(req.body);

  if (!valid) 
    return res.status(httpStatus.BAD_REQUEST).send('Invalid login Format');
  else 
    next();
}

module.exports = {
  signUpValidator,
  loginValidator
}