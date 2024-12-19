const { enrollment, Course_Master, UserMaster } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const { where } = require("sequelize");

const getEnrollmentData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        // Fetch enrollment data with related course and user data
        const data = await enrollment.findAll({
            attributes: ['id', 'student_id', 'course_id', 'enrollment_mode', 'status'], // Attributes from `enrollment` table
            include: [
                {
                    model: Course_Master,
                    as: 'course_master_enrollment',
                    attributes: ['course_title', 'expiring_time', 'no_of_month'], // Columns from `course_master` table
                    required: true
                },
                {
                    model: UserMaster,
                    as: 'user_enrollment',
                    attributes: ['first_name', 'last_name', 'email', 'profile'], // Columns from `user_master` table
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


const addEnrollmentData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const createdate = DateToUnixNumber(new Date(), 'America/Toronto');
    const expiredate = DateToUnixNumber(new Date(), 'America/Toronto');
    const data = {
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        enrollment_mode: req.body.enrollment_mode,
        status: 1,
        createdAt: createdate,
        updatedAt: expiredate,
    }
    try {
        const courseCoupondate = await enrollment.create(data);
        res.status(200).json(courseCoupondate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
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
        attributes: ['id', 'student_id', 'course_id', 'enrollment_mode', 'status'], // Columns from `enrollments` table
        include: [
            {
                model: Course_Master,
                attributes: ['title', 'expiring_time'], // Columns from `course_master` table
            },
            {
                model: UserMaster,
                attributes: ['fname', 'lname', 'email', 'image'], // Columns from `user_master` table
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
            attributes: ['id', 'student_id', 'course_id', 'enrollment_mode', 'status'], // Attributes from `enrollment` table
            include: [
                {
                    model: Course_Master,
                    as: 'course_master_enrollment',
                    attributes: ['course_title', 'course_thumbnail', 'auther', 'course_level', 'course_language'], // Columns from `course_master` table
                    required: true
                },
            ],
            where: {
                student_id: studentId
            }
        });

        if (!enrollments || enrollments.length === 0) {
            return res.status(404).json({ message: 'No enrollments found for the student' });
        }

        res.status(200).json(enrollments);
    } catch (error) {
        console.error('Error fetching enrollments:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};




module.exports = { getEnrollmentData, deleteEnrollmentData, addEnrollmentData, getEnrollAndCourseData, getEnrollWithStuId }

