const express = require("express");
const CourseResource = express.Router();
const CourseResourceController = require("../../controller/course/Course_Resource");


CourseResource.get("/gettingCourseResourceData/:moduleId/:lessonId", CourseResourceController.getCourseResourceData);
CourseResource.get("/gettingCourseResourceDataWithId/:id", CourseResourceController.getCourseResourceDataWithId);
CourseResource.post("/addingCourseResource", CourseResourceController.addCourseResourceData);
CourseResource.put("/updatingCourseResource/:id", CourseResourceController.updateCourseResourceData);
CourseResource.put("/updatingCourseResourceStatus/:id", CourseResourceController.updateCourseResourceStatusData);
CourseResource.delete("/deletingCourseResource/:id", CourseResourceController.deleteCourseResourceData);


module.exports = CourseResource
