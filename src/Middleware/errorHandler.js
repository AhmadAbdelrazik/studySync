const httpStatus = require("../utils/HttpStatus");

module.exports = function (err, req, res, next) {
  console.log(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
};
