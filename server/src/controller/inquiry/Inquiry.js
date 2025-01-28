const { inquiry } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");

const addInquiryData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const createdDate = DateToUnixNumber(new Date(), "America/Toronto");
        const data = {
            name: req.body.name,
            email: req.body.email,
            mobile_number: req.body.mobile_number,
            whatsapp_number: req.body.mobile_number,
            country: req.body.country || null,
            message: req.body.message,
            summery: req.body.address || null,
            status: 'pending',
            createdAt: createdDate,
            updatedAt: createdDate
        }
        const inquirydata = await inquiry.create(data);
        return res.status(200).json({
            status: 200,
            data: inquirydata,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getInquiryData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const data = await inquiry.findAll();
        return res.send(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const updateInquiryStatus = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const newstatus = req.body.status;
    try {
        const data = await inquiry.update({ status: newstatus }, {
            where: {
                id: id
            }
        });
        return res.send(data);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteInquiryData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await inquiry.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = { addInquiryData, getInquiryData, updateInquiryStatus, deleteInquiryData };