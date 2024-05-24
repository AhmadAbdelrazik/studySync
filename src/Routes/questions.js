const express = require('express');
const router = express.Router();
const controller = require('../Controller/questions')
const validator = require('../Middleware/questionsValidatorMW');
const tryCatch = require('../utils/tryCatch');
// Get n questions
router.get('/', tryCatch(controller.getQuestions));

// Get Random Question 
router.get('/random', tryCatch(controller.getRandomQuestion))
// Change a Question
router.put('/', validator.putQuestion, tryCatch(controller.putQuestion));

// Add a Question
router.post('/', validator.question, tryCatch(controller.addQuestion));

router.delete('/', validator.question, tryCatch(controller.deleteQuestion));

module.exports = router;