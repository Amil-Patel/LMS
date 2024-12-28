const { quize_result } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");

const addQuizResultData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const data = {
        quize_id: req.body.quiz_id,
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        user_answers: JSON.stringify(req.body.user_answers),
        correct_answers: JSON.stringify(req.body.correct_answers),
        createdAt: DateToUnixNumber(new Date(), "America/Toronto"),
        updatedAt: DateToUnixNumber(new Date(), "America/Toronto"),
    };
    console.log(data)
    try {
        // const result = await Quiz_Result.create(data);
        const result = await quize_result.create(data);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { addQuizResultData };