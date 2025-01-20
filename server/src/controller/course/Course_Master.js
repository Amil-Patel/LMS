const { Course_Master,enrollment,Course_Lesson } = require("../../database/models/index");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const UnixNumberToDate = require("../../middleware/UnixNumberToDate");
const path = require("path");
const fs = require("fs");
const AuthMiddleware = require("../../auth/AuthMiddleware")

const getCourseMasterData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const courses = await Course_Master.findAll();

        // Fetch enrollment and lesson counts for each course
        const courseData = await Promise.all(
            courses.map(async (course) => {
                // Count enrollments for this course
                const enrollmentCount = await enrollment.count({
                    where: { course_id: course.id },
                });

                // Count lessons for this course
                const lessonCount = await Course_Lesson.count({
                    where: { course_id: course.id },
                });

                return {
                    ...course.toJSON(),
                    enrollmentCount,
                    lessonCount,
                };
            })
        );

        res.status(200).json(courseData);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getCourseMasterDataWithId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await Course_Master.findOne({
            where: {
                id: id
            }
        })
        // const publishdate = UnixNumberToDate(data.publish_date, 'America/Toronto');
        // data.dataValues.publish_date = publishdate;
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addCourseMasterData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const createddate = DateToUnixNumber(new Date(), 'America/Toronto');
    const publishDate = DateToUnixNumber(req.body.course_publish_date, 'America/Toronto');
    const data = {
        course_title: req.body.course_title,
        short_desc: req.body.short_desc,
        long_desc: req.body.long_desc,
        course_cate: req.body.course_cate,
        course_level: req.body.course_level,
        course_language: req.body.course_language,
        drip_content: req.body.drip_content == 'true' ? 1 : 0,
        course_status: req.body.course_status,
        upcoming_course_thumbnail: null,
        publish_date: req.body.course_status == 'upcoming' ? (publishDate || null) : null,
        is_top_course: req.body.is_top_course == 'true' ? 1 : 0,
        featured_course: req.body.featured_course == 'true' ? 1 : 0,
        course_faqs: JSON.stringify(req.body.course_faqs),
        course_requirenment: JSON.stringify(req.body.course_requirenment),
        course_topics: JSON.stringify(req.body.course_topics),
        course_price: req.body.course_price,
        course_discount: req.body.course_discount,
        is_tax: req.body.is_tax == 'true' ? 1 : 0,
        tax_name: req.body.tax_name || null,
        tax_rate: parseInt(req.body.tax_rate) || null,
        is_inclusive: req.body.is_inclusive || null,
        is_exclusive: req.body.is_exclusive || null,
        auther: JSON.stringify(req.body.auther),
        expiring_time: req.body.expiring_time,
        no_of_month: req.body.expiring_time == "limited_time" ? (req.body.no_of_month || null) : null,
        course_overview_link: req.body.course_overview_link,
        course_thumbnail: req?.file?.filename || null,
        meta_tag: JSON.stringify(req.body.meta_tag),
        meta_keyword: JSON.stringify(req.body.meta_keyword),
        meta_desc: req.body.meta_desc,
        canonical_url: req.body.canonical_url,
        title_tag: req.body.title_tag,
        created_by: req.body.created_by || 0,
        updated_by: req.body.updated_by || 0,
        createdAt: createddate,
        updatedAt: createddate,
    }
    try {
        const courseCatedate = await Course_Master.create(data);
        res.status(200).json(courseCatedate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
const updateCourseMasterData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const updateddate = DateToUnixNumber(new Date(), 'America/Toronto');
    const publishDate = DateToUnixNumber(req.body.publish_date, 'America/Toronto');
    const curentcoursemaster = await Course_Master.findOne({ where: { id } });
    if (!curentcoursemaster) {
        return res.status(404).json({ message: 'course not found' });
    }
    // if (curentcoursemaster && curentcoursemaster.upcoming_course_thumbnail) {
    //     const imagePath = path.join(__dirname, '../../../../client/public/upload', curentcoursemaster.upcoming_course_thumbnail);
    //     if (fs.existsSync(imagePath)) {
    //         fs.unlinkSync(imagePath);
    //     }
    // }
    if (req.file) {
        if (curentcoursemaster && curentcoursemaster.course_thumbnail) {
            const imagePath = path.join(__dirname, '../../../../client/public/upload', curentcoursemaster.course_thumbnail);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
    }
    const data = {
        course_title: req.body.course_title,
        short_desc: req.body.short_desc,
        long_desc: req.body.long_desc,
        course_cate: req.body.course_cate,
        course_level: req.body.course_level,
        course_language: req.body.course_language,
        drip_content: req.body.drip_content,
        course_status: req.body.course_status,
        upcoming_course_thumbnail: req.body.course_status == "upcoming" ? (req?.body?.upcoming_course_thumbnail || null) : null,
        publish_date: req.body.course_status == 'upcoming' ? (publishDate || null) : null,
        is_top_course: req.body.is_top_course,
        featured_course: req.body.featured_course,
        course_faqs: JSON.stringify(req.body.course_faqs),
        course_requirenment: JSON.stringify(req.body.course_requirenment),
        course_topics: JSON.stringify(req.body.course_topics),
        course_price: req.body.course_price,
        course_discount: req.body.course_discount,
        is_tax: req.body.is_tax,
        tax_name: req.body.tax_name,
        tax_rate: req.body.tax_rate,
        is_inclusive: req.body.is_inclusive,
        is_exclusive: req.body.is_exclusive,
        auther: req.body.auther,
        expiring_time: req.body.expiring_time,
        no_of_month: req.body.expiring_time == "limited_time" ? (req.body.no_of_month || null) : null,
        course_overview_link: req.body.course_overview_link,
        course_thumbnail: req.file ? req.file.filename : curentcoursemaster.course_thumbnail,
        meta_tag: JSON.stringify(req.body.meta_tag),
        meta_keyword: JSON.stringify(req.body.meta_keyword),
        meta_desc: req.body.meta_desc,
        canonical_url: req.body.canonical_url,
        title_tag: req.body.title_tag,
        updated_by: req.body.updated_by || 0,
        updatedAt: updateddate,
    }
    try {
        const courseMaserdate = await Course_Master.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(courseMaserdate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateCourseStatusData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const status = req.body.status;
    const newStatus = status === 1 ? 0 : 1;
    try {
        const data = await Course_Master.update({ status: newStatus }, {
            where: {
                id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteCourseMaster = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const curentcoursemaster = await Course_Master.findOne({ where: { id } });
    if (!curentcoursemaster) {
        return res.status(404).json({ message: 'course not found' });
    }
    if (curentcoursemaster && curentcoursemaster.upcoming_course_thumbnail) {
        const imagePath = path.join(__dirname, '../../client/public/upload', curentcoursemaster.upcoming_course_thumbnail);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
    if (curentcoursemaster && curentcoursemaster.course_thumbnail) {
        const imagePath = path.join(__dirname, '../../client/public/upload', curentcoursemaster.course_thumbnail);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
    try {
        const data = await Course_Master.destroy({
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
    getCourseMasterData,
    getCourseMasterDataWithId,
    addCourseMasterData,
    updateCourseMasterData,
    updateCourseStatusData,
    deleteCourseMaster
}
