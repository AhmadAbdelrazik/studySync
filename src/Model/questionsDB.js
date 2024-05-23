const mongoose = require('mongoose');

// const answerSchema = new mongoose.Schema({
//   choice: {
//     type: String,
//     maxLength: 200,
//     required: true,
//   },
//   isCorrect: {
//     type: Boolean,
//     required: true,
//   }
// })

const schema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 400,
    minLength: 5,
  },
  choices: [{
  choice: {
    type: String,
    maxLength: 200,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  }
  }],
  explaination: {
    type: String,
    maxLength: 1000,
  },
  course: {
    type: String
  }
});

const Question = mongoose.model('questions', schema);

module.exports = Question;