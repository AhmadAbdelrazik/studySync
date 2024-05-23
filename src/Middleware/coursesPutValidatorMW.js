const validator = require('../utils/coursePutValidator');

  

module.exports = (req, res, next) => {
  const valid = validator(req.body)

  if (valid)
    next();
  else 
    return res.status(400).send(`Invalid Format ...`);
}