const { Course_Lesson, Course_Quize } = require("../../database/models/index");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const UnixNumberToDate = require("../../middleware/UnixNumberToDate");

const getCourseLessonDataWithSectionId = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Course_Lesson.findAll({
            where: {
                section_id: id
            },
            include: [
                {
                    model: Course_Quize,
                    as: 'course_quize_lesson',
                    attributes: ['id', 'title', 'instruction', 'quize_duration'],
                    required: false
                }
            ]
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};


const getCourseLessonDataWithId = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Course_Lesson.findOne({
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

const addCourseLessonData = async (req, res) => {
    const sectionId = req.params.id;
    const date = DateToUnixNumber(new Date(), "America/Toronto");

    var ThumnailImg = "";
    if (req.files.thumbnail_preview_image_url != undefined) {
        ThumnailImg = req.files.thumbnail_preview_image_url[0].filename;
    }

    var attachment = "";
    if (req.files.attachment != undefined) {
        attachment = req.files.attachment[0].filename;
    }
    const data = {
        title: req.body.title,
        duration: req.body.duration,
        course_id: req.body.course_id,
        section_id: sectionId,
        lesson_type: req.body.lesson_type,
        url: req.body.url,
        attachment: attachment,
        thumbnail_preview_image_url: ThumnailImg || null,
        text_content: req.body.text_content,
        is_preview: req.body.is_preview,
        status: req.body.status,
        quize_id: req.body.quize_id || null,
        is_count_time: req.body.is_count_time,
        description: req.body.description,
        minimum_duration: null,
        drip_content: null,
        order: 0,
        createdAt: date,
        updatedAt: date,
    }
    try {
        const courseCoupondate = await Course_Lesson.create(data);
        res.status(200).json(courseCoupondate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateCourseLessonData = async (req, res) => {
    const id = req.params.id;
    const data = {
        title: req.body.title,
        duration: req.body.duration,
        course_id: req.body.course_id,
        section_id: req.body.section_id,
        lesson_type: req.body.lesson_type,
        url: req.body.url,
        attachment: req.body.attachment,
        thumbnail_preview_image_url: req.body.thumbnail_preview_image_url,
        text_content: req.body.text_content,
        is_preview: req.body.is_preview,
        status: req.body.status,
        quize_id: req.body.quize_id,
        is_count_time: req.body.is_count_time,
        description: req.body.description,
        minimum_duration: null,
        drip_content: null,
        order: 0,
        updatedAt: new Date(),
    }
    try {
        const courseCoupondate = await Course_Lesson.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(courseCoupondate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCourseLessonData = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Course_Lesson.destroy({
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
    getCourseLessonDataWithSectionId,
    getCourseLessonDataWithId,
    addCourseLessonData,
    updateCourseLessonData,
    deleteCourseLessonData
}