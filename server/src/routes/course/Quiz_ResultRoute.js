const express = require("express");
const QuizResult = express.Router();
const Quiz_ResultController = require("../../controller/course/Quiz_Result");

QuizResult.post("/addingQuizResultData", Quiz_ResultController.addQuizResultData);
QuizResult.get("/gettingQuizResultDatWithquizId/:id/:stuId", Quiz_ResultController.getQuizResultDatWithquizId);
QuizResult.get("/gettingQuizResultDataForViewWithquizId/:id/:stuId", Quiz_ResultController.getQuizResultDataForViewWithquizId);


module.exports = QuizResult