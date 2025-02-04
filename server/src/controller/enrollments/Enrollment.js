const { enrollment, Course_Master, UserMaster, academic_progress, Course_Quize, Course_Lesson } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");

const getEnrollmentData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        // Fetch enrollment data with related course and user data
        const data = await enrollment.findAll({
            attributes: ['id', 'student_id', 'course_id', 'enrollment_mode', 'status'], // Attributes from enrollment table
            include: [
                {
                    model: Course_Master,
                    as: 'course_master_enrollment',
                    attributes: ['course_title', 'expiring_time', 'no_of_month'], // Columns from course_master table
                    required: true
                },
                {
                    model: UserMaster,
                    as: 'user_enrollment',
                    attributes: ['first_name', 'last_name', 'email', 'profile'], // Columns from user_master table
                    required: true
                }
            ]
        });
        res.send(data); // Send the result back to the client
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal server error
    }
}

const deleteEnrollmentData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await enrollment.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getEnrollAndCourseData = async () => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const enrollments = await enrollment.findAll({
        attributes: ['id', 'student_id', 'course_id', 'enrollment_mode', 'status'], // Columns from enrollments table
        include: [
            {
                model: Course_Master,
                attributes: ['title', 'expiring_time'], // Columns from course_master table
            },
            {
                model: UserMaster,
                attributes: ['fname', 'lname', 'email', 'image'], // Columns from user_master table
            }
        ]
    });
}
const getEnrollWithStuId = async (req, res) => {
    try {
        const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
        if (!isAuthenticated) return;

        const studentId = req.params.id;
        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        }

        const enrollments = await enrollment.findAll({
            attributes: ['id', 'student_id', 'course_id', 'enrollment_mode', 'status'], // Attributes from enrollment table
            include: [
                {
                    model: Course_Master,
                    as: 'course_master_enrollment',
                    attributes: ['course_title', 'course_thumbnail', 'auther', 'course_level', 'course_language'], // Columns from course_master table
                    required: true
                },
            ],
            where: {
                student_id: studentId,
                status: 1
            }
        });

        if (!enrollments || enrollments.length === 0) {
            return res.status(404).json({ message: 'No enrollments found for the student' });
        }

        const enrichedEnrollments = await Promise.all(
            enrollments.map(async (enrollment) => {
                const totalLesson = await Course_Lesson.count({
                    where: { course_id: enrollment.course_id },
                });
                const allLessonData = await Course_Lesson.findAll({
                    where: { course_id: enrollment.course_id },
                    include: [
                        {
                            model: Course_Quize,
                            as: 'course_quize_lesson',
                            attributes: ['id', 'title', 'instruction', 'quize_duration', 'status'],
                            required: false
                        }
                    ]
                })
                const progress = await academic_progress.findOne({
                    where: { course_id: enrollment.course_id, student_id: studentId },
                });
                const completedLessons = progress?.completed_lesson_id
                    ? Array.isArray(JSON.parse(progress.completed_lesson_id.replace(/^"(.*)"$/, '$1')))  // Strip out the extra quotes
                        ? JSON.parse(progress.completed_lesson_id.replace(/^"(.*)"$/, '$1')).length
                        : 0
                    : 0;
                const progressPercentage = totalLesson
                    ? Math.round((completedLessons / totalLesson) * 100)
                    : 0;
                const totalEnroll = await enrollment.constructor.count({
                    where: { course_id: enrollment.course_id },
                })
                return {
                    ...enrollment.toJSON(),
                    allLessonData,
                    totalLesson, // Add lesson count to the enrollment object
                    totalEnroll,
                    progressPercentage,
                };
            })
        );

        res.status(200).json(enrichedEnrollments);
    } catch (error) {
        console.error('Error fetching enrollments:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const updateEnrollStatus = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const status = req.body.status;
    const newStatus = status === 1 ? 0 : 1;
    try {
        const data = await enrollment.update({ status: newStatus }, {
            where: {
                id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getEnrollDataWithId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await enrollment.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getEnrollWithCourseId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await enrollment.findAll({
            where: {
                course_id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateEnrollData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const data = {
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        enrollment_mode: req.body.enrollment_mode,
        status: req.body.status,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
    }
    try {
        const courseCoupondate = await enrollment.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(courseCoupondate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
module.exports = { getEnrollmentData, deleteEnrollmentData, getEnrollWithCourseId, getEnrollAndCourseData, getEnrollWithStuId, updateEnrollStatus, getEnrollDataWithId, updateEnrollData }
