const mongoose = require('mongoose')
const User = require('../Model/user');
const bcrypt = require('bcrypt');
const httpStatus = require('../utils/HttpStatus');

module.exports = async function (req, res) {
  const user = await User.findOne({
    email: req.body.email
  })
  if (user) 
    return res.status(httpStatus.FORBIDDEN).send("Email already used");

  const hash = await bcrypt.hash(`${req.body.email}+${req.body.password}`, 10);

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash 
  });

  
  const accessJWT = await newUser.generateJWT();
  const refreshJWT = await newUser.generateRefreshJWT();
  
  newUser.refreshToken = refreshJWT;
  await newUser.save();
  
  const response = {
    tokenType : "JWT",
    accessToken : accessJWT,
    refreshToken: refreshJWT
  };
  res.status(httpStatus.CREATED).json(response);
}