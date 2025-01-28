const { quize_result, Course_Quize_Question } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");

const addQuizResultData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const transformedCorrectAnswers = Object.fromEntries(
        Object.entries(req.body.correct_answers).map(([key, value]) => [
            key,
            Array.isArray(value) ? value : JSON.parse(value),
        ])
    );
    const data = {
        quize_id: req.body.quiz_id,
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        user_answers: JSON.stringify(req.body.user_answers),
        correct_answers: JSON.stringify(transformedCorrectAnswers),
        result: req.body.result,
        createdAt: DateToUnixNumber(new Date(), "America/Toronto"),
        updatedAt: DateToUnixNumber(new Date(), "America/Toronto"),
    };
    try {
        const result = await quize_result.create(data);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


const getQuizResultDatWithquizId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const result = await quize_result.findAll({ where: { quize_id: id, student_id: req.params.stuId } });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
const getQuizResultDataForViewWithquizId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;

    const quizId = req.params.id; // Quiz ID
    const studentId = req.params.stuId; // Student ID
    try {
        // Fetch quiz result
        const quizResult = await quize_result.findAll({
            where: { quize_id: quizId, student_id: studentId },
        });

        const quizQuestions = await Course_Quize_Question.findAll({
            where: { quize_id: quizId },
        });
        const response = {
            quizResult: quizResult,
            quizQuestions: quizQuestions.map((question) => question.dataValues),
        };
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { addQuizResultData, getQuizResultDatWithquizId, getQuizResultDataForViewWithquizId };