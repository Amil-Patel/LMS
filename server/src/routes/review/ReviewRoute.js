const express = require("express");
const Review = express.Router();
const ReviewController = require("../../controller/review/Review");


Review.get("/gettingReviewWithCourseId/:id", ReviewController.gettingReviewWithCourseId);
Review.get("/gettingReviewWithStudentId/:id", ReviewController.gettingReviewWithStudentId);
Review.post("/addingReview", ReviewController.addingReview);
Review.put("/updatingReview/:id", ReviewController.updatingReview);



module.exports = Review