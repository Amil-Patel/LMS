const { where } = require("sequelize");
const AuthMiddleware = require("../../auth/AuthMiddleware")
const { academic_progress, enrollment, Course_Lesson, UserMaster, Course_Quize, quize_result, Course_Master } = require("../../database/models/index");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");

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
const getAcademicProgressDataForManageCourse = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;

    const course_id = req.params.course_id;

    try {
        // Fetch enrollment data
        const enrollData = await enrollment.findAll({
            attributes: ['id', 'student_id', 'course_id', 'enrollment_mode', 'status', 'createdAt', 'updatedAt'],
            where: {
                course_id: course_id
            }
        });

        // Fetch lesson and quiz data (common for all enrollments in the same course)
        const lessonData = await Course_Lesson.findAll({
            attributes: ['id', 'title'],
            where: {
                course_id: course_id,
                quiz_id: null
            }
        });

        const quizeData = await Course_Quize.findAll({
            attributes: ['id', 'title'],
            where: {
                course_id: course_id
            }
        });

        // Initialize grouped data
        const mainData = {
            enroll: [],
            userMaster: [],
            academicData: [],
            lessonData,
            quizeData
        };

        // Use a Set to keep track of processed student IDs
        const processedStudents = new Set();

        // Map through enrollment data to populate the grouped arrays
        for (const enroll of enrollData) {
            mainData.enroll.push(enroll);

            // Check if the student ID has already been processed
            if (!processedStudents.has(enroll.student_id)) {
                const userMaster = await UserMaster.findOne({
                    attributes: ['id', 'first_name', 'last_name'],
                    where: {
                        id: enroll.student_id
                    }
                });

                if (userMaster) {
                    mainData.userMaster.push(userMaster);
                    processedStudents.add(enroll.student_id); // Mark this student ID as processed
                }
            }

            const academicData = await academic_progress.findAll({
                attributes: ['id', 'completed_lesson_id', 'course_progress', 'watching_duration', 'current_watching_lesson', 'completed_date', 'createdAt', 'updatedAt'],
                where: {
                    student_id: enroll.student_id,
                    course_id: course_id
                }
            });

            mainData.academicData.push(...academicData); // Spread academic data for each student
        }

        // Wrap mainData in an array to match the desired format
        res.send([mainData]);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while fetching academic progress data." });
    }
};
const getAcademicProgressDataForManageCourseQuizDisplay = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const course_id = req.params.course_id;
    const stu_id = req.params.stu_id;
    console.log(course_id, stu_id)
    try {
        const userMaster = await UserMaster.findOne({
            attributes: ['id', 'first_name', 'last_name'],
            where: {
                id: stu_id
            }
        });
        const courseMaster = await Course_Master.findOne({
            attributes: ['id', 'course_title'],
            where: {
                id: course_id
            }
        })
        const academicData = await academic_progress.findAll({
            attributes: ['id', 'completed_lesson_id', 'course_progress', 'watching_duration', 'current_watching_lesson', 'completed_date', 'createdAt', 'updatedAt'],
            where: {
                student_id: stu_id,
                course_id: course_id
            }
        });
        // const quizeData = await Course_Quize.findAll({
        //     attributes: ['id', 'title', 'total_marks', 'passing__marks', 'no_of_q_retakes', 'createdAt', 'updatedAt'],
        //     where: {
        //         course_id: course_id
        //     }
        // })
        const quizResultData = await quize_result.findAll({
            attributes: ['id', 'quize_id', 'user_answers', 'correct_answers', 'result', 'createdAt', 'updatedAt'],
            where: {
                student_id: stu_id,
                course_id: course_id  // Use the first quiz id if available
            }
        });
        // Extracting quiz IDs from quizResultData
        const quizIds = quizResultData.map(result => result.quiz_id);

        // Fetching quiz data where quiz IDs match
        let quizData = [];
        if (quizIds.length > 0) {
            quizData = await Course_Quize.findAll({
                attributes: ['id', 'title', 'total_marks', 'passing_marks', 'no_of_q_retakes', 'createdAt', 'updatedAt'],
                where: {
                    id: quizIds // Matching with extracted quiz IDs
                }
            });
        }
        const data = { userMaster, courseMaster, academicData, quizData, quizResultData };
        console.log(data)
        res.send(data);
    } catch (error) {
        console.log(error);
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
    const completeDate = DateToUnixNumber(new Date(), 'America/Toronto');
    const data = {
        completed_lesson_id: JSON.stringify(req.body.completed_lesson_id),
        current_watching_lesson: req.body.current_watching_lesson,
        completed_date: completeDate,
    }
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
    const completedDate = DateToUnixNumber(new Date(), "America/Toronto");
    const createdDate = DateToUnixNumber(new Date(), "America/Toronto");
    const data = {
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        course_progress: 0,
        watching_duration: 0,
        current_watching_lesson: req.body.current_watching_lesson,
        completed_date: new Date(),
        createdAt: createdDate,
        updatedAt: createdDate,
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
const updateWatchingDuration = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const data = {
        watching_duration: req.body.watchingDuration,
    }
    try {
        const userroledata = await academic_progress.update(data, {
            where: {
                id: id,
            }
        });
        res.status(200).json(userroledata);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
module.exports = { getAcademicProgressData, addAcedemicProgressData, getAcademicProgressDataWithCourseId, UpdateAcademicProgressDataForViewed, updateWatchingDuration, getAcademicProgressDataForManageCourse, getAcademicProgressDataForManageCourseQuizDisplay }
