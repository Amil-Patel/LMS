const { enrollment, Course_Master, UserMaster } = require("../../database/models/index");

const getEnrollmentData = async (req, res) => {
    try {
        const data = await enrollment.findAll({
            include: [
                {
                    model: Course_Master,
                    as: 'course_master_enrollment',
                    required: true
                },
                {
                    model: UserMaster,
                    as: 'user_enrollment',
                    required: true
                }
            ]
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

const addEnrollmentData = async (req, res) => {
    const data = {
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        enrollment_mode: req.body.enrollment_mode,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const courseCoupondate = await enrollment.create(data);
        res.staus(200).json(courseCoupondate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const deleteEnrollmentData = async (req, res) => {
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



module.exports = { getEnrollmentData, deleteEnrollmentData, addEnrollmentData }

