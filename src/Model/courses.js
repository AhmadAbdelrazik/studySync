const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 30,
    minLength: 3
  },
  urlName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course; 