const express = require("express");
const CourseLesson = express.Router();
const CourseLessonController = require("../../controller/course/Course_Lesson");
const upload = require("../../middleware/upload");

const uploadFields = upload.fields([
    { name: 'thumbnail_preview_image_url', maxCount: 1 },
    { name: 'attachment', maxCount: 1 }
]);


CourseLesson.get("/gettingCourseLessonDataWithSectionId/:id", CourseLessonController.getCourseLessonDataWithSectionId);
CourseLesson.get("/gettingCourseLessonDataWithId/:id", CourseLessonController.getCourseLessonDataWithId);
CourseLesson.post("/addingCourseLesson/:id", uploadFields, CourseLessonController.addCourseLessonData);
CourseLesson.put("/updatingCourseLesson/:id", uploadFields, CourseLessonController.updateCourseLessonData);
CourseLesson.put("/updatingCourseLessonStatus/:id", CourseLessonController.updateCourseLessonStatus);
CourseLesson.put("/updatingCourseLessonOrder/:id", CourseLessonController.updateCourseLessonOrderData);
CourseLesson.delete("/deletingCourseLesson/:id", CourseLessonController.deleteCourseLessonData);


module.exports = CourseLesson
