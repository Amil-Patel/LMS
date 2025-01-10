const AuthMiddleware = require("../../auth/AuthMiddleware")
const { academic_progress, enrollment, Course_Lesson, UserMaster, Course_Quize, quize_result } = require("../../database/models/index");

const getAcademicProgressData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
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
const getAcademicProgressDataWithCourseId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const stuId = req.params.stuId;
    try {
        const data = await academic_progress.findAll({
            where: {
                course_id: id,
                student_id: stuId
            }
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
const UpdateAcademicProgressDataForViewed = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const stuId = req.params.stuId;
    const data = {
        completed_lesson_id: JSON.stringify(req.body.completed_lesson_id),
        current_watching_lesson: req.body.current_watching_lesson,
        completed_date: new Date(),
    }
    console.log(id, stuId)
    console.log(data)
    try {
        const userroledata = await academic_progress.update(data, {
            where: {
                id: id,
                student_id: stuId
            }
        });
        res.status(200).json(userroledata);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
const addAcedemicProgressData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const data = {
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        course_progress: 0,
        current_watching_lesson: req.body.current_watching_lesson,
        watching_duration: 0,
        completed_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const userroledata = await academic_progress.create(data);
        res.status(200).json(userroledata);
    } catch (error) {
        console.log(error);
        console.log(res.message + " ll");
        res.sendStatus(500);
    }
}

module.exports = { getAcademicProgressData, addAcedemicProgressData, getAcademicProgressDataWithCourseId, UpdateAcademicProgressDataForViewed }
