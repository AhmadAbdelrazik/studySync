const express = require('express');
const router = express.Router();

const controller = require('../Controller/courses')
const validator = require('../Middleware/coursesValidatorMW');
const tryCatch = require('../utils/tryCatch');

const questionsRoute = require('./questions');

router.param('course', tryCatch(controller.courseParam));

router.get('/', tryCatch(controller.getCourses));
router.post('/', validator, tryCatch(controller.addCourse));

router.get('/:course', questionsRoute);



module.exports = router;


