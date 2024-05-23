const express = require('express');
const router = express.Router();
const controller = require('../Controller/questionsDB')
const validator = require('../Middleware/questionsValidatorMW');

// Get n questions
router.get('/', controller.getQuestions);

// Get Random Question 
router.get('/random')

// Change a Question
router.put('/', validator.question);

// Add a Question
router.post('/', validator.question, controller.addQuestion);

module.exports = router;