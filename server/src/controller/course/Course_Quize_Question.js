const { Course_Quize_Question } = require('../../database/models/index');
const DateToUnixNumber = require('../../middleware/DateToUnixNumber');

const getCourseQuizeQuestionData = async (req, res) => {
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
    const id = req.params.id;
    try {
        const data = Course_Quize_Question.findeOne({
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
    const quizId = req.params.id;
    const date = DateToUnixNumber(new Date(), "America/Toronto");
    const data = {
        title: req.body.title,
        question_type: null,
        no_of_option: null,
        options: JSON.stringify(req.body.options),
        correct_answer: JSON.stringify(req.body.correct_answer),
        order: 0,
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
    const id = req.params.id;
    const data = {
        title: req.body.title,
        question_type: req.body.question_type,
        no_of_option: req.body.no_of_option,
        options: JSON.stringify(req.body.options),
        correct_answer: JSON.stringify(req.body.correct_answer),
        quize_id: req.body.quize_id,
        section_id: req.body.section_id,
        course_id: req.body.course_id,
        updatedAt: new Date(),
    }
    try {
        const courseCoupondate = await Course_Quize_Question.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(courseCoupondate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCourseQuizeQuestionData = async (req, res) => {
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
    deleteCourseQuizeQuestionData
}



