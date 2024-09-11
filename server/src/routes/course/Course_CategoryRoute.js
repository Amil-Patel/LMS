const express = require("express");
const CourseCateRoute = express.Router();
const upload = require("../../middleware/upload");
const CourseCateController = require("../../controller/course/Course_Category");


CourseCateRoute.get("/gettingNullCourseCategory", CourseCateController.getNullCourseCategoryData);
CourseCateRoute.get("/gettingNullCourseCategoryWithId/:id", CourseCateController.getNullCourseCategoryWithId);
CourseCateRoute.get("/gettingCourseCategoryWithParentId/:id", CourseCateController.getCourseCategoryWithParentId);
CourseCateRoute.get("/gettingCoureseCategoryWithId/:id", CourseCateController.getCourseCategoryWithId);
CourseCateRoute.post("/addingCourseCategory", upload.single('cate_thumbnail'), CourseCateController.addCourseCategoryData);
CourseCateRoute.put("/updatingCourseCategory/:id", upload.single('cate_thumbnail'), CourseCateController.updateCourseCategoryData);
CourseCateRoute.put("/updatingCourseCategoryStatus/:id", CourseCateController.updateCourseCategoryStatusData);
CourseCateRoute.delete("/deletingCourseCategory/:id", CourseCateController.deleteCourseCategoryData);



module.exports = CourseCateRoute


