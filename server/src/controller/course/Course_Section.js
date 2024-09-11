const { Course_Section } = require("../../database/models/index");



const getCourseSectionData = async (req, res) => {
    try {
        const data = await Course_Section.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getCourseSectionDataWithId = async (req, res) => {
    const id = req.params.id;
    try {
        const data = Course_Section.findeOne({
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

const addCourseSectionData = async (req, res) => {
    const data = {
        title: req.body.title,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const courseCoupondate = await Course_Section.create(data);
        res.staus(200).json(courseCoupondate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateCourseSectionData = async (req, res) => {
    const id = req.params.id;
    const data = {
        title: req.body.title,
        status: req.body.status,
        updatedAt: new Date(),
    }
    try {
        const courseCoupondate = await Course_Section.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(courseCoupondate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCourseSectionData = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Course_Section.destroy({
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
    getCourseSectionData,
    getCourseSectionDataWithId,
    addCourseSectionData,
    updateCourseSectionData,
    deleteCourseSectionData
}

