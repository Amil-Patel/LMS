const { Course_Lesson } = require("../../database/models/index");

const getCourseLessonDataWithSectionId = async (req, res) => {
    try {
        const data = await Course_Lesson.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getCourseLessonDataWithId = async (req, res) => {
    const id = req.params.id;
    try {
        const data = Course_Lesson.findeOne({
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
        status: 1,
        quize_id: req.body.quize_id,
        is_count_time: req.body.is_count_time,
        description: req.body.description,
        minimum_duration: null,
        drip_content: null,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const courseCoupondate = await Course_Lesson.create(data);
        res.staus(200).json(courseCoupondate);
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