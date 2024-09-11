const express = require("express");
const CourseLesson = express.Router();
const CourseLessonController = require("../../controller/course/Course_Lesson");



CourseLesson.get("/gettingCourseLessonDataWithSectionId/:id", CourseLessonController.getCourseLessonDataWithSectionId);
CourseLesson.get("/gettingCourseLessonDataWithId/:id", CourseLessonController.getCourseLessonDataWithId);
CourseLesson.post("/addingCourseLesson", CourseLessonController.addCourseLessonData);
CourseLesson.put("/updatingCourseLesson/:id", CourseLessonController.updateCourseLessonData);
CourseLesson.delete("/deletingCourseLesson/:id", CourseLessonController.deleteCourseLessonData);


module.exports = CourseLesson
