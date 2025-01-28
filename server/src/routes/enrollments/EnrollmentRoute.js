const express = require("express");
const Enrollment = express.Router();
const EnrollmentController = require("../../controller/enrollments/Enrollment");


Enrollment.get("/gettingEnrollmentData", EnrollmentController.getEnrollmentData);
Enrollment.get("/gettingEnrollWithStuId/:id", EnrollmentController.getEnrollWithStuId);
Enrollment.get("/gettingEnrollWithCourseId/:id", EnrollmentController.getEnrollWithCourseId);
Enrollment.get("/gettingEnrollWithId/:id", EnrollmentController.getEnrollDataWithId);
// Enrollment.post("/addingEnrollment", EnrollmentController.addEnrollmentData);
Enrollment.put("/updattingEnrollStatus/:id", EnrollmentController.updateEnrollStatus);
Enrollment.put("/updattingEnrollData/:id", EnrollmentController.updateEnrollData);
Enrollment.delete("/deletingEnrollment/:id", EnrollmentController.deleteEnrollmentData);



module.exports = Enrollment



