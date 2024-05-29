const express = require("express");
const router = express.Router();

const authenticate = require('./Middleware/AuthenticationMW');
const authorize = require('./Middleware/AuthorizationMW');

const controller = require("../Controller/courses");
const validator = require("../Middleware/coursesValidatorMW");
const putValidator = require("../Middleware/coursesPutValidatorMW");
const tryCatch = require("../utils/tryCatch");

const questionsRoute = require("./questions");

router.param("course", controller.courseParam);

router.get("/", tryCatch(controller.getCourses));
router.post("/",authenticate, authorize, validator, tryCatch(controller.addCourse));
router.put("/:course", authenticate, authorize, putValidator, tryCatch(controller.putCourse));
router.delete("/", authenticate, authorize, validator, tryCatch(controller.deleteCourse));

router.use("/:course/questions", questionsRoute);

module.exports = router;
