const httpStatus = require('../utils/HttpStatus');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(httpStatus.BAD_REQUEST).send(`Please Login`);
  }

  const reqJWT = token.split(' ')[1];
  if (!reqJWT)
    return res.status(httpStatus.BAD_REQUEST).send(`Please Login`);

  try {
    const decoded = jwt.verify(reqJWT, process.env.JWT_ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(httpStatus.FORBIDDEN).send(`Invalid Token`);
  }
}