const { module_spent_time } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");

const getModuleTime = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;

    try {
        const moduleTime = await module_spent_time.findAll({});
        return res.json({ success: true, moduleTime });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getModuleTimeWithId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;

    try {
        const { id } = req.params;
        const moduleTime = await module_spent_time.findOne({ where: { module_id: id } });
        return res.json({ success: true, moduleTime });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const addModuleTime = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;

    try {
        const createdDate = DateToUnixNumber(new Date(), "America/Toronto");
        const { student_id, course_id, module_id, spent_time } = req.body;
        const data = {
            student_id: student_id,
            course_id: course_id,
            module_id: module_id,
            spent_time: spent_time,
            createdAt: createdDate,
            updatedAt: createdDate
        }
        const moduleTime = await module_spent_time.create(data);
        return res.json({ success: true, moduleTime });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getModuleTime, getModuleTimeWithId, addModuleTime };