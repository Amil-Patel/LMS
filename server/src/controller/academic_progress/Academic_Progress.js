const { academic_progress, enrollment, Course_Lesson, UserMaster, Course_Quize, quize_result } = require("../../database/models/index");

const getAcademicProgressData = async (req, res) => {
    try {
        // Fetch academic progress data for student_id 1
        const academicData = await academic_progress.findAll({
            where: { student_id: 1 },
            include: [
                {
                    model: UserMaster,
                    as: 'user_master_academic_progress',
                    required: true,
                    attributes: ['first_name', 'last_name']
                }
            ]
        });

        const enrollmentData = await enrollment.findAll({
            attributes: ['student_id', 'updatedAt']
        });

        const combinedData = await Promise.all(
            academicData.map(async (academic) => {
                const enrollment = enrollmentData.find(enroll => enroll.student_id === academic.student_id);

                const lessonCount = await Course_Lesson.count({
                    where: { course_id: academic.course_id }
                });

                const quizeCount = await Course_Quize.count({
                    where: { course_id: academic.course_id }
                });

                return {
                    ...academic.dataValues,
                    enrollment: enrollment ? { updatedAt: enrollment.updatedAt } : null,
                    lessonCount,
                    quizeCount
                };
            })
        );

        res.send(combinedData);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports = { getAcademicProgressData }
