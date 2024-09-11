const express = require("express");
const CourseQuize = express.Router();
const CourseQuizeController = require("../../controller/course/Course_Quize");



CourseQuize.get("/gettingCourseQuizeData", CourseQuizeController.getCourseQuizeData);
CourseQuize.get("/gettingCourseQuizeDataWithId/:id", CourseQuizeController.getCourseQuizeDataWithId);
CourseQuize.post("/addingCourseQuize", CourseQuizeController.addCourseQuizeData);
CourseQuize.put("/updatingCourseQuize/:id", CourseQuizeController.updateCourseQuizeData);
CourseQuize.delete("/deletingCourseQuize/:id", CourseQuizeController.deleteCourseQuizeData);


module.exports = CourseQuize

