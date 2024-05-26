const mongoose = require('mongoose')
const User = require('../Model/user');
const bcrypt = require('bcrypt');
const httpStatus = require('../utils/HttpStatus');


module.exports = async function (req, res) {
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).send('Wrong Email or Password');
  }

  const hashData = `${req.body.email}+${req.body.password}`;
  const pwCheck = await bcrypt.compare(hashData, user.password);

  if (pwCheck)
    return res.status(httpStatus.NOT_FOUND).send('Wrong Email or Password');

  const accessJWT = user.generateJWT;
  const refreshJWT = user.generateRefreshJWT;

  user.refreshToken = refreshJWT;

  await user.save();

  const response = {
    tokenType : "JWT",
    accessToken : accessJWT,
    refreshToken: refreshJWT
  };

  res.json(response);
}