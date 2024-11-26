const express=require("express");
const AcademicProgress = express.Router();
const AcademicProgressController = require("../../controller/academic_progress/Academic_Progress");


AcademicProgress.get("/gettingAcademicProgressData", AcademicProgressController.getAcademicProgressData);


module.exports = AcademicProgress