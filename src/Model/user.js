const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    maxLength: 30,
    minLength: 2
  },
  lastName: {
    type: String,
    maxLength: 30,
    minLength: 2
  },
  email: {
    type: String,
    maxLength: 100,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 100
  },
  isAdmin: {
    type: Boolean,
  },
  refreshToken: {
    type: String
  }
});


schema.methods.generateJWT = function generateJWT() {
  const token = jwt.sign(
    {
      _id: User._id,
      isAdmin: User.isAdmin,
    },
    process.env.JWT_ACCESS_TOKEN,
    { algorithm: "HS256", expiresIn: "30m" }
  );
  return token;
};

schema.methods.generateRefreshJWT = function generateRefreshJWT() {
  const token = jwt.sign(
    {
      _id: User._id,
      isAdmin: User.isAdmin,
    },
    process.env.JWT_REFRESH_TOKEN,
    { algorithm: "HS256", expiresIn: "14d" }
  );
  return token;
};

const User = mongoose.model('user', schema);

module.exports = User;

