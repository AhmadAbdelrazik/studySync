const express = require("express");
const router = express.Router();

const controller = require("../Controller/courses");
const validator = require("../Middleware/coursesValidatorMW");
const putValidator = require("../Middleware/coursesPutValidatorMW");
const tryCatch = require("../utils/tryCatch");

const questionsRoute = require("./questions");

router.param("course", controller.courseParam);

router.get("/", tryCatch(controller.getCourses));
router.post("/", validator, tryCatch(controller.addCourse));
router.put("/:course", putValidator, controller.putCourse);
router.delete("/", validator, controller.deleteCourse);

router.use("/:course/questions", questionsRoute);

module.exports = router;