const express = require('express');
const router = express.Router();
const controller = require('../Controller/courses')

router.get('/', controller.getCourses);

router.post('/', controller.addCourse);


module.exports = router;