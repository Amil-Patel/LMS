const express = require("express");
const AcademicProgress = express.Router();
const AcademicProgressController = require("../../controller/academic_progress/Academic_Progress");


AcademicProgress.get("/gettingAcademicProgressData", AcademicProgressController.getAcademicProgressData);
AcademicProgress.get("/getAcademicProgressDataForManageCourse/:course_id", AcademicProgressController.getAcademicProgressDataForManageCourse);
AcademicProgress.get("/getAcademicProgressDataForManageCourseQuizDisplay/:course_id/:stu_id", AcademicProgressController.getAcademicProgressDataForManageCourseQuizDisplay);
AcademicProgress.get("/gettingAcademicProgressDataWithCourseId/:id/:stuId", AcademicProgressController.getAcademicProgressDataWithCourseId);
AcademicProgress.put("/updattingAcademicProgressDataForViewed/:id/:stuId", AcademicProgressController.UpdateAcademicProgressDataForViewed);
AcademicProgress.put("/updateWatchingDuration/:id", AcademicProgressController.updateWatchingDuration);
AcademicProgress.post("/addingAcademicProgressData", AcademicProgressController.addAcedemicProgressData);


module.exports = AcademicProgress