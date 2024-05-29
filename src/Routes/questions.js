const express = require('express');
const router = express.Router();
const controller = require('../Controller/questions')
const validator = require('../Middleware/questionsValidatorMW');
const tryCatch = require('../utils/tryCatch');

const authenticate = require('./Middleware/AuthenticationMW');
const authorize = require('./Middleware/AuthorizationMW');

// Get n questions
router.get('/', tryCatch(controller.getQuestions));

// Get Random Question 
router.get('/random', tryCatch(controller.getRandomQuestion))
// Change a Question
router.put('/', authenticate, authorize, validator.putQuestion, tryCatch(controller.putQuestion));

// Add a Question
router.post('/', authenticate, authorize, validator.question, tryCatch(controller.addQuestion));

router.delete('/', authenticate, authorize, validator.question, tryCatch(controller.deleteQuestion));

module.exports = router;