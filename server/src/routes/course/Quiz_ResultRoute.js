const express = require("express");
const QuizResult = express.Router();
const Quiz_ResultController = require("../../controller/course/Quiz_Result");

QuizResult.post("/addingQuizResultData", Quiz_ResultController.addQuizResultData);
QuizResult.get("/gettingQuizResultDatWithquizId/:id", Quiz_ResultController.getQuizResultDatWithquizId);


module.exports = QuizResult