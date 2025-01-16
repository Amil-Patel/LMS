const { Course_Quize, Course_Lesson } = require("../../database/models/index");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const UnixNumberToDate = require("../../middleware/UnixNumberToDate");
const { sequelize } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware")

const getCourseQuizeData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id
    try {
        const data = await Course_Quize.findAll({
            where: {
                section_id: id
            }
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getCourseQuizeDataWithId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await Course_Quize.findOne({
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

const addCourseQuizeData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const sectionId = req.params.id;
    const date = DateToUnixNumber(new Date(), "America/Toronto");

    const data = {
        title: req.body.title,
        section_id: sectionId,
        course_id: req.body.course_id,
        quize_duration: req.body.quize_duration,
        expire_time: req.body.expire_time,
        total_marks: req.body.total_marks,
        passing__marks: req.body.passing__marks,
        drip_content: req.body.drip_content || null,
        no_of_q_retakes: req.body.no_of_q_retakes,
        total_showing_questions: req.body.total_showing_questions,
        random_questions: req.body.random_questions,
        status: req.body.status,
        is_count_time: req.body.is_count_time,
        is_skipable: req.body.is_skipable,
        instruction: req.body.instruction,
        createdAt: date,
        updatedAt: date,
    };

    const t = await sequelize.transaction();
    const getdata = await Course_Lesson.findAll({
        where: {
            course_id: req.body.course_id,
            section_id: sectionId
        }
    });
    try {
        const courseQuiz = await Course_Quize.create(data, { transaction: t });
        const quizeId = courseQuiz.id;
        const courseId = req.body.course_id;

        const lessonData = {
            section_id: sectionId,
            course_id: courseId,
            quiz_id: quizeId,
            order: getdata.length + 1,
        };

        await Course_Lesson.create(lessonData, { transaction: t });

        await t.commit();

        res.status(200).json(courseQuiz);

    } catch (error) {
        await t.rollback();
        console.log(error);
        res.sendStatus(500);
    }
};


const updateCourseQuizeData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const updatedate = DateToUnixNumber(new Date(), "America/Toronto");
    const id = req.params.id;
    const data = {
        title: req.body.title,
        section_id: req.body.section_id,
        course_id: req.body.course_id,
        quize_duration: req.body.quize_duration,
        expire_time: req.body.expire_time,
        total_marks: req.body.total_marks,
        passing__marks: req.body.passing__marks,
        drip_content: req.body.drip_content || null,
        no_of_q_retakes: req.body.no_of_q_retakes,
        total_showing_questions: req.body.total_showing_questions,
        random_questions: req.body.random_questions,
        status: req.body.status,
        is_count_time: req.body.is_count_time,
        is_skipable: req.body.is_skipable,
        instruction: req.body.instruction,
        updatedAt: updatedate,
    };
    try {
        const courseCoupondate = await Course_Quize.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(courseCoupondate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCourseQuizStatusData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const date = DateToUnixNumber(new Date(), "America/Toronto");
    const id = req.params.id;
    const data = {
        status: req.body.status === 1 ? 0 : 1,
        updatedAt: date
    };
    try {
        const courseCoupondate = await Course_Quize.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(courseCoupondate);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const deleteCourseQuizeData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;

    const t = await sequelize.transaction();

    try {
        await Course_Lesson.destroy({
            where: {
                quiz_id: id
            }
        }, { transaction: t });

        const data = await Course_Quize.destroy({
            where: {
                id: id
            }
        }, { transaction: t });

        await t.commit();

        res.status(200).json(data);

    } catch (error) {
        await t.rollback();
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getCourseQuizeData,
    getCourseQuizeDataWithId,
    addCourseQuizeData,
    updateCourseQuizeData,
    updateCourseQuizStatusData,
    deleteCourseQuizeData
}