const { Course_Category } = require("../../database/models/index");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const path = require("path");
const fs = require("fs");

const getNullCourseCategoryData = async (req, res) => {
    try {
        const data = await Course_Category.findAll({
            where: {
                cate_parent_id: null
            }
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
const getNotNullCourseCategory = async (req, res) => {
    try {
        const data = await Course_Category.findAll({
            where: {
                cate_parent_id: !null
            }
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
const getNullCourseCategoryWithId = async (req, res) => {
    const id = req.params.id
    try {
        const data = await Course_Category.findOne({
            where: {
                id: id
            }
        });
        const subcoursecount = await Course_Category.count({
            where: { cate_parent_id: id }
        });
        const combinedData = {
            data,
            subcoursecount
        }
        res.send(combinedData);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
const getCourseCategoryWithParentId = async (req, res) => {
    const id = req.params.id
    try {
        const data = await Course_Category.findAll({
            where: {
                cate_parent_id: id
            }
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getCourseCategoryWithId = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Course_Category.findOne({
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

const addCourseCategoryData = async (req, res) => {
    const createddate = DateToUnixNumber(new Date(), 'America/Toronto');
    const data = {
        cate_title: req.body.cate_title,
        cate_parent_id: req.body.cate_parent_id === 'null' || !req.body.cate_parent_id ? null : parseInt(req.body.cate_parent_id),
        cate_thumbnail: req?.file?.filename || null,
        status: 1,
        created_by: req.body.created_by || 0,
        updated_by: req.body.updated_by || 0,
        createdAt: createddate,
        updatedAt: createddate,
    }
    try {
        const courseCatedate = await Course_Category.create(data);
        res.status(200).json(courseCatedate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


const updateCourseCategoryData = async (req, res) => {
    const updateddate = DateToUnixNumber(new Date(), 'America/Toronto');
    const id = req.params.id;

    const curentcoursecate = await Course_Category.findOne({ where: { id } });
    if (!curentcoursecate) {
        return res.status(404).json({ message: 'Course_Category not found' });
    }

    if (req.file) {
        if (curentcoursecate.cate_thumbnail) {
            const imagePath = path.join(__dirname, '../../../../client/public/upload', curentcoursecate.cate_thumbnail);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
    }

    // Prepare the data for updating the course category
    const data = {
        cate_title: req.body.cate_title,
        cate_parent_id: req.body.cate_parent_id === 'null' || !req.body.cate_parent_id ? null : parseInt(req.body.cate_parent_id),
        cate_thumbnail: req.file ? req.file.filename : curentcoursecate.cate_thumbnail,
        status: 1,
        updated_by: req.body.updated_by || 0,
        updatedAt: updateddate,
    };

    try {
        const courseCatedate = await Course_Category.update(data, {
            where: { id: id }
        });
        res.status(200).json(courseCatedate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCourseCategoryStatusData = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const newStatus = status === 1 ? 0 : 1;
    try {
        const data = await Course_Category.update({ status: newStatus }, {
            where: {
                id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteCourseCategoryData = async (req, res) => {
    const id = req.params.id;
    const curentcoursecate = await Course_Category.findOne({ where: { id } });
    if (!curentcoursecate) {
        return res.status(404).json({ message: 'Course_Category not found' });
    }
    if (curentcoursecate && curentcoursecate.cate_thumbnail) {
        const imagePath = path.join(__dirname, '../../../../client/public/upload', curentcoursecate.cate_thumbnail);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
    try {
        const data = await Course_Category.destroy({
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
    getNullCourseCategoryData,
    getNotNullCourseCategory,
    getNullCourseCategoryWithId,
    getCourseCategoryWithParentId,
    getCourseCategoryWithId,
    addCourseCategoryData,
    updateCourseCategoryData,
    updateCourseCategoryStatusData,
    deleteCourseCategoryData
}