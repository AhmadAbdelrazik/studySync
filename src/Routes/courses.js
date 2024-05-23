const express = require('express');
const router = express.Router();

const controller = require('../Controller/coursesDB')
const validator = require('../Middleware/coursesValidatorMW');
const tryCatch = require('../utils/tryCatch');

const questionsRoute = require('./questions');

router.param('course', controller.courseParam);


router.get('/', tryCatch(controller.getCourses));
router.post('/', validator, tryCatch(controller.addCourse));

router.use('/:course', questionsRoute);



module.exports = router;


