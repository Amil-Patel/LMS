const express = require("express");
const Enrollment = express.Router();
const EnrollmentController = require("../../controller/enrollments/Enrollment");


Enrollment.get("/gettingEnrollmentData", EnrollmentController.getEnrollmentData);
Enrollment.get("/gettingEnrollWithStuId/:id", EnrollmentController.getEnrollWithStuId);
Enrollment.post("/addingEnrollment", EnrollmentController.addEnrollmentData);
Enrollment.delete("/deletingEnrollment/:id", EnrollmentController.deleteEnrollmentData);



module.exports = Enrollment



