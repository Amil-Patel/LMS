const express = require("express");
const CourseQuize = express.Router();
const CourseQuizeController = require("../../controller/course/Course_Quize");



CourseQuize.get("/gettingCourseQuizeData/:id", CourseQuizeController.getCourseQuizeData);
CourseQuize.get("/gettingCourseQuizeDataWithId/:id", CourseQuizeController.getCourseQuizeDataWithId);
CourseQuize.post("/addingCourseQuize/:id", CourseQuizeController.addCourseQuizeData);
CourseQuize.put("/updatingCourseQuize/:id", CourseQuizeController.updateCourseQuizeData);
CourseQuize.put("/updatingCourseQuizeStatus/:id", CourseQuizeController.updateCourseQuizStatusData);
CourseQuize.delete("/deletingCourseQuize/:id", CourseQuizeController.deleteCourseQuizeData);


module.exports = CourseQuize

