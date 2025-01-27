const { user_document, UserMaster, Course_Master } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const path = require("path");
const fs = require("fs");

const addUserDocument = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const createdDate = DateToUnixNumber(new Date(), "America/Toronto");
    const data = {
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        attachment: req?.file?.filename,
        status: "pending",
        createdAt: createdDate,
        updatedAt: createdDate
    }
    try {
        const result = await user_document.create(data);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
const getUSerWIthStuId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    console.log(id)
    try {
        const data = await user_document.findAll({
            where: {
                student_id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
const getUSerWIthStuIdAndCourseId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const { stuId, course_id } = req.params;
    try {

        const userMaster = await UserMaster.findOne({
            attributes: ["id", "first_name", "last_name"],
            where: { id: stuId },
        });
        const courseMaster = await Course_Master.findOne({
            attributes: ["id", "course_title"],
            where: { id: course_id },
        });
        const document = await user_document.findAll({
            where: {
                student_id: stuId,
                course_id: course_id
            }
        });
        res.status(200).json({ userMaster, courseMaster, document });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
const updateCourseDocumentStatus = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const { id } = req.params;
    const { status, message } = req.body;
    try {
        const result = await user_document.update({ status: status, message: message }, { where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
const deleteUserDocument = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const { id } = req.params;
    const documentData = await user_document.findOne({ where: { id: id } });
    if (!documentData) {
        return res.status(404).json({ message: 'document not found' });
    }
    if (documentData && documentData.attachment) {
        const imagePath = path.join(__dirname, '../../../../client/public/upload', documentData.attachment);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
    try {
        const result = await user_document.destroy({ where: { id: id } });
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
module.exports = { addUserDocument, getUSerWIthStuId, getUSerWIthStuIdAndCourseId, updateCourseDocumentStatus, deleteUserDocument }