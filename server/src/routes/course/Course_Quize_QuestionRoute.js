const express = require("express");
const CourseQuizeQuestion = express.Router();
const CourseQuizeQuestionController = require("../../controller/course/Course_Quize_Question");



CourseQuizeQuestion.get("/gettingCourseQuizeQuestionData/:id", CourseQuizeQuestionController.getCourseQuizeQuestionData);
CourseQuizeQuestion.get("/gettingCourseQuizeQuestionDataWithId/:id", CourseQuizeQuestionController.getCourseQuizeQuestionDataWithId);
CourseQuizeQuestion.post("/addingCourseQuizeQuestion/:id", CourseQuizeQuestionController.addCourseQuizeQuestionData);
CourseQuizeQuestion.put("/updatingCourseQuizeQuestion/:id", CourseQuizeQuestionController.updateCourseQuizeQuestionData);
CourseQuizeQuestion.delete("/deletingCourseQuizeQuestion/:id", CourseQuizeQuestionController.deleteCourseQuizeQuestionData);



module.exports = CourseQuizeQuestion