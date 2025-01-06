const { Course_Lesson, Course_Quize } = require("../../database/models/index");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const UnixNumberToDate = require("../../middleware/UnixNumberToDate");
const path = require("path")
const AuthMiddleware = require("../../auth/AuthMiddleware");
const fs = require("fs");

const getCourseLessonDataWithSectionId = async (req, res) => {

    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
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
                    attributes: ['id', 'title', 'instruction', 'quize_duration', 'status'],
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

const getCourseLessonDataWithCourseId = async (req, res) => {

    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await Course_Lesson.findAll({
            where: {
                course_id: id
            },
            include: [
                {
                    model: Course_Quize,
                    as: 'course_quize_lesson',
                    attributes: ['id', 'title', 'instruction', 'quize_duration', 'status'],
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
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
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
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
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
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;

    const currentLesson = await Course_Lesson.findOne({ where: { id } });
    if (!currentLesson) {
        return res.status(404).json({ message: 'Course Lesson not found' });
    }

    const date = DateToUnixNumber(new Date(), "America/Toronto");

    var ThumnailImg = currentLesson.thumbnail_preview_image_url;
    if (req.files.thumbnail_preview_image_url != undefined) {
        ThumnailImg = req.files.thumbnail_preview_image_url[0].filename;

        if (currentLesson.thumbnail_preview_image_url) {
            const oldThumbnailPath = path.join(__dirname, '../../../../client/public/upload', currentLesson.thumbnail_preview_image_url);
            if (fs.existsSync(oldThumbnailPath)) {
                fs.unlinkSync(oldThumbnailPath);
            }
        }
    }

    var attachment = currentLesson.attachment;
    if (req.files.attachment != undefined) {
        attachment = req.files.attachment[0].filename;

        if (currentLesson.attachment) {
            const oldAttachmentPath = path.join(__dirname, '../../../../client/public/upload', currentLesson.attachment);
            if (fs.existsSync(oldAttachmentPath)) {
                fs.unlinkSync(oldAttachmentPath);
            }
        }
    }

    const data = {
        title: req.body.title,
        duration: req.body.duration,
        course_id: req.body.course_id,
        section_id: req.body.section_id,
        lesson_type: req.body.lesson_type,
        url: req.body.url,
        attachment: attachment || currentLesson.attachment,
        thumbnail_preview_image_url: ThumnailImg || currentLesson.thumbnail_preview_image_url,
        text_content: req.body.text_content,
        is_preview: req.body.is_preview,
        status: req.body.status,
        quize_id: req.body.quize_id,
        is_count_time: req.body.is_count_time,
        description: req.body.description,
        minimum_duration: null,
        drip_content: null,
        order: 0,
        updatedAt: date,
    };

    try {
        const updatedLesson = await Course_Lesson.update(data, {
            where: { id }
        });
        res.status(200).json(updatedLesson);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateCourseLessonStatus = async (req, res) => {
    const id = req.params.id;
    const date = DateToUnixNumber(new Date(), "America/Toronto");
    const data = {
        status: req.body.status === 1 ? 0 : 1,
        updatedAt: date
    };
    try {
        const updatedCourse = await Course_Lesson.update(data, {
            where: { id: id }
        });
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const updateCourseLessonOrderData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const sectionId = req.params.id;
    const { items } = req.body;
    try {
        for (const item of items) {
            await Course_Lesson.update(
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


const deleteCourseLessonData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const currentcourselesson = await Course_Lesson.findOne({ where: { id } });
    if (!currentcourselesson) {
        return res.status(404).json({ message: 'Course_Lesson not found' });
    }
    if (currentcourselesson && currentcourselesson.attachment) {
        const imagePath = path.join(__dirname, '../../../../client/public/upload', currentcourselesson.attachment);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
    if (currentcourselesson && currentcourselesson.thumbnail_preview_image_url) {
        const imagePath = path.join(__dirname, '../../../../client/public/upload', currentcourselesson.thumbnail_preview_image_url);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
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
    updateCourseLessonStatus,
    updateCourseLessonOrderData,
    deleteCourseLessonData,
    getCourseLessonDataWithCourseId
}