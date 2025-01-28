const express = require("express");
const StudentCart = express.Router();
const StudentCartController = require("../../controller/student_cart/Student_Cart");

StudentCart.get("/gettingStudentCart/:id", StudentCartController.getStudentCartData);
StudentCart.post("/addingStudentCart", StudentCartController.addStudentCartData);
StudentCart.delete("/removeStudentCart", StudentCartController.removeStudentCartData);


module.exports = StudentCart