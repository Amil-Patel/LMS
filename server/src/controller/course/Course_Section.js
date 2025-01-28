const { Course_Section, Course_Lesson, Course_Quize } = require("../../database/models/index");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const UnixNumberToDate = require("../../middleware/UnixNumberToDate");
const AuthMiddleware = require("../../auth/AuthMiddleware")

const getCourseSectionData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id
    try {
        const data = await Course_Section.findAll({
            where: {
                course_id: id,
                // status: 1
            },
            include: [
                {
                    model: Course_Lesson,
                    as: 'course_section_lesson',
                    required: false,
                    attributes: ['duration', 'is_count_time'],
                },
                {
                    model: Course_Quize,
                    as: 'course_section_quize',
                    required: false,
                    attributes: ['quize_duration', 'is_count_time'],
                }
            ]
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getCourseSectionDataWithId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await Course_Section.findOne({
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

const addCourseSectionData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const date = DateToUnixNumber(new Date(), "America/Toronto");
    const data = {
        title: req.body.title,
        time: req.body.time,
        course_id: parseInt(req.body.course_id),
        order: 0,
        status: req.body.status,
        createdAt: date,
        updatedAt: date,
    }
    try {
        const courseCoupondate = await Course_Section.create(data);
        res.status(200).json(courseCoupondate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateCourseSectionData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const date = DateToUnixNumber(new Date(), "America/Toronto");
    const data = {
        title: req.body.title,
        time: req.body.time,
        status: req.body.status,
        updatedAt: date,
    }
    try {
        const courseCoupondate = await Course_Section.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(courseCoupondate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCourseSectionOrderData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const courseId = req.params.id;
    const { items } = req.body;
    try {
        for (const item of items) {
            await Course_Section.update(
                { order: item.order },
                {
                    where: {
                        id: item.id,
                        course_id: courseId
                    }
                }
            );
        }
        res.status(200).send('Order updated successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating order');
    }
};


const deleteCourseSectionData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await Course_Section.destroy({
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
    getCourseSectionData,
    getCourseSectionDataWithId,
    addCourseSectionData,
    updateCourseSectionData,
    updateCourseSectionOrderData,
    deleteCourseSectionData
}

