const { Course_Quize } = require("../../database/models/index");

const getCourseQuizeData = async (req, res) => {
    try {
        const data = await Course_Quize.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getCourseQuizeDataWithId = async (req, res) => {
    const id = req.params.id;
    try {
        const data = Course_Quize.findeOne({
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

const addCourseQuizeData = async (req, res) => {
    const data = {
        title: req.body.title,
        section_id: req.body.section_id,
        course_id: req.body.course_id,
        quize_duration: req.body.quize_duration,
        total_marks: req.body.total_marks,
        passing__marks: req.body.passing__marks,
        drip_content: req.body.drip_content,
        no_of_q_retakes: req.body.no_of_q_retakes,
        instruction: req.body.instruction,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const courseCoupondate = await Course_Quize.create(data);
        res.staus(200).json(courseCoupondate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateCourseQuizeData = async (req, res) => {
    const id = req.params.id;
    const data = {
        title: req.body.title,
        section_id: req.body.section_id,
        course_id: req.body.course_id,
        quize_duration: req.body.quize_duration,
        total_marks: req.body.total_marks,
        passing__marks: req.body.passing__marks,
        drip_content: req.body.drip_content,
        no_of_q_retakes: req.body.no_of_q_retakes,
        instruction: req.body.instruction,
        updatedAt: new Date(),
    }
    try {
        const courseCoupondate = await Course_Quize.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(courseCoupondate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCourseQuizeData = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Course_Quize.destroy({
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
    getCourseQuizeData,
    getCourseQuizeDataWithId,
    addCourseQuizeData,
    updateCourseQuizeData,
    deleteCourseQuizeData
}