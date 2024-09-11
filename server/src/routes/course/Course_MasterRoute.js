const express = require("express");
const CourseMaster = express.Router();
const CourseMasterController = require("../../controller/course/Course_Master");
const upload = require("../../middleware/upload");

const uploadFields = upload.fields([
    { name: 'upcoming_course_thumbnail', maxCount: 1 },
    { name: 'course_thumbnail', maxCount: 1 }
]);

CourseMaster.get("/gettingCourseMasterData", CourseMasterController.getCourseMasterData);
CourseMaster.get("/gettingCourseMasterDataWithId/:id", CourseMasterController.getCourseMasterDataWithId);
CourseMaster.post("/addingCourseMaster", uploadFields, CourseMasterController.addCourseMasterData);
CourseMaster.put("/updatingCourseMaster", uploadFields, CourseMasterController.updateCourseMasterData);
CourseMaster.delete("/deletingCourseMaster", CourseMasterController.deleteCourseMaster);


module.exports = CourseMaster