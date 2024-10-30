const { resource } = require("../../database/models/index");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const UnixNumberToDate = require("../../middleware/UnixNumberToDate");
const AuthMiddleware = require("../../auth/AuthMiddleware");

const getCourseResourceData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const moduleId = req.params.moduleId;
        const lessonId = req.params.lessonId
        const result = await resource.findAll({
            where: {
                module_id: moduleId,
                lesson_id: lessonId
            }
        })
        return res.status(200).json({
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const getCourseResourceDataWithId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id
    try {
        const result = await resource.findOne({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const addCourseResourceData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const date = DateToUnixNumber(new Date(), "America/Toronto");
    console.log(req.body)
    try {
        const result = await resource.create({
            module_id: req.body.module_id,
            lesson_id: req.body.lesson_id,
            title: req.body.title,
            link: req.body.link,
            status: req.body.status,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            createdAt: date,
            updatedAt: date
        })
        return res.status(200).json({
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const updateCourseResourceData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const date = DateToUnixNumber(new Date(), "America/Toronto");
    const data = {
        module_id: req.body.module_id,
        lesson_id: req.body.lesson_id,
        title: req.body.title,
        link: req.body.link,
        updatedAt: date
    }
    try {
        const result = await resource.update(data, {
            where: {
                id: id
            }
        })
        return res.status(200).json({
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
const updateCourseResourceStatusData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const status = req.body.status;
    const newStatus = status === 1 ? 0 : 1;
    try {
        const result = await resource.update({ status: newStatus }, {
            where: {
                id: id
            }
        })
        return res.status(200).json({
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
const deleteCourseResourceData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const result = await resource.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { getCourseResourceData, getCourseResourceDataWithId, addCourseResourceData, updateCourseResourceData, updateCourseResourceStatusData, deleteCourseResourceData }