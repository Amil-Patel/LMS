const { Course_Quize_Question } = require('../../database/models/index');
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require('../../middleware/DateToUnixNumber');

const getCourseQuizeQuestionData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id
    try {
        const data = await Course_Quize_Question.findAll({
            where: {
                quize_id: id
            }
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getCourseQuizeQuestionDataWithId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await Course_Quize_Question.findOne({
            where: {
                id: id
            }
        })
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addCourseQuizeQuestionData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const quizId = req.params.id;
    const date = DateToUnixNumber(new Date(), "America/Toronto");

    const getdata = await Course_Quize_Question.findAll({
        where: {
            quize_id: quizId,
            section_id: req.body.section_id,
        }
    })
    const data = {
        title: req.body.title,
        question_type: null,
        no_of_option: null,
        options: JSON.stringify(req.body.options),
        correct_answer: JSON.stringify(req.body.correct_answer),
        order: getdata.length + 1,
        quize_id: quizId,
        section_id: req.body.section_id,
        course_id: req.body.course_id,
        createdAt: date,
        updatedAt: date,
    }
    try {
        const courseCoupondate = await Course_Quize_Question.create(data);
        res.status(200).json(courseCoupondate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateCourseQuizeQuestionData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const questionId = req.params.questionId;
    const date = DateToUnixNumber(new Date(), "America/Toronto");
    const data = {
        title: req.body.title,
        question_type: null,
        no_of_option: null,
        options: JSON.stringify(req.body.options),
        correct_answer: JSON.stringify(req.body.correct_answer),
        order: 0,
        quize_id: id,
        section_id: req.body.section_id,
        course_id: req.body.course_id,
        createdAt: date,
        updatedAt: date,
    }
    try {
        const courseCoupondate = await Course_Quize_Question.update(data, {
            where: {
                id: questionId
            }
        });
        res.status(200).json(courseCoupondate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCourseQuizeQuestionOrderData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const sectionId = req.params.id;
    const { items } = req.body;
    try {
        for (const item of items) {
            await Course_Quize_Question.update(
                { order: item.order },
                {
                    where: {
                        id: item.id,
                        section_id: sectionId
                    }
                }
            );
        }
        res.status(200).send('Order updated successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating order');
    }
}

const deleteCourseQuizeQuestionData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await Course_Quize_Question.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getCourseQuizeQuestionData,
    getCourseQuizeQuestionDataWithId,
    addCourseQuizeQuestionData,
    updateCourseQuizeQuestionData,
    updateCourseQuizeQuestionOrderData,
    deleteCourseQuizeQuestionData
}



