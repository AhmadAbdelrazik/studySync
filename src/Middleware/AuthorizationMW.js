const httpStatus = require('../utils/HttpStatus');

module.exports = function (req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(httpStatus.FORBIDDEN).send('Unauthorized Access');
  } else {
    next();
  }
}