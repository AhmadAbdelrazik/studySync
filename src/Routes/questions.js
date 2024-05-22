const express = require('express');
const router = express.Router();
const controller = require('../Controller/courses')
const validator = require('../Middleware/coursesValidatorMW');



module.exports = router;