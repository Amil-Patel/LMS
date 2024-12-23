const { UserMaster } = require("../../database/models/index");
const EncryptPassword = require("../../middleware/EncryptPassword");
const DecryptPassword = require("../../middleware/DecryptPassword");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const UnixNumberToDate = require("../../middleware/UnixNumberToDate");
const path = require("path");
const fs = require("fs");
const AuthMiddleware = require("../../auth/AuthMiddleware")

const getUserMasterData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const data = await UserMaster.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserMasterDataWithId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await UserMaster.findOne({
            where: {
                id: id
            }
        });
        const decryptedPassword = DecryptPassword(data.password)
        data.dataValues.password = decryptedPassword;
        const dobdate = UnixNumberToDate(data.dob, "America/Toronto");
        data.dataValues.dob = dobdate;
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
const getAllStudentData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    console.log("object")
    try {
        const data = await UserMaster.findAll({
            where: {
                role_id: "student"
            }
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
const addUserMasterData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const dobdate = DateToUnixNumber(req.body.dob, "America/Toronto");
    const createdDate = DateToUnixNumber(new Date(), "America/Toronto");
    const encryptedPassword = EncryptPassword(req.body.password)
    const data = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        description: req.body.description,
        gender: req.body.gender,
        dob: dobdate || null,
        address: req.body.address,
        profile: req?.file?.filename || null,
        contact: parseInt(req.body.contact),
        whatsapp_number: parseInt(req.body.whatsapp_number),
        country: req.body.country,
        email: req.body.email,
        password: encryptedPassword,
        facebook: req.body.facebook || null,
        linkedin: req.body.linkedin || null,
        role_id: req.body.role_id,
        status: req.body.status,
        created_by: req.body.created_by || 0,
        updated_by: req.body.updated_by || 0,
        createdAt: createdDate,
        updatedAt: createdDate,
    };
    try {
        const usermasterdata = await UserMaster.create(data);
        res.status(200).json(usermasterdata);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
const addStudentMasterData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const createdDate = DateToUnixNumber(new Date(), "America/Toronto");
    const encryptedPassword = EncryptPassword(req.body.password)
    const data = {
        first_name: req.body.first_name,
        middle_name: null,
        last_name: req.body.last_name,
        description: null,
        gender: req.body.gender,
        dob: null,
        address: null,
        profile: req?.file?.filename || null,
        contact: parseInt(req.body.contact),
        whatsapp_number: parseInt(req.body.contact),
        country: null,
        email: req.body.email,
        password: encryptedPassword,
        facebook: req.body.facebook || null,
        linkedin: req.body.linkedin || null,
        role_id: req.body.role_id,
        status: 1,
        created_by: req.body.created_by || 0,
        updated_by: req.body.updated_by || 0,
        createdAt: createdDate,
        updatedAt: createdDate,
    };
    try {
        const usermasterdata = await UserMaster.create(data);
        res.status(200).json(usermasterdata);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
const updateUserMasterData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const currentUser = await UserMaster.findOne({ where: { id } });
    if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (req.file) {
        if (currentUser && currentUser.profile) {
            const imagePath = path.join(__dirname, '../../../../client/public/upload', currentUser.profile);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
    }
    const dobdate = DateToUnixNumber(req.body.dob, "America/Toronto");
    const updateddate = DateToUnixNumber(new Date(), "America/Toronto");
    const encryptedPassword = EncryptPassword(req.body.password)
    const data = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        description: req.body.description,
        gender: req.body.gender,
        dob: dobdate || null,
        address: req.body.address,
        profile: req.file ? req.file.filename : currentUser.profile,
        contact: parseInt(req.body.contact),
        whatsapp_number: parseInt(req.body.whatsapp_number),
        country: req.body.country,
        email: req.body.email,
        password: encryptedPassword,
        facebook: req.body.facebook || null,
        linkedin: req.body.linkedin || null,
        role_id: req.body.role_id,
        status: req.body.status,
        updated_by: req.body.updated_by || 0,
        updatedAt: updateddate,
    };
    try {
        const usermasterdata = await UserMaster.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(usermasterdata);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUserMaster = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const currentUser = await UserMaster.findOne({ where: { id } });
    if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (currentUser && currentUser.profile) {
        const imagePath = path.join(__dirname, '../../../../client/public/upload', currentUser.profile);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
    try {
        const data = await UserMaster.destroy({
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
    getUserMasterData,
    getUserMasterDataWithId,
    addUserMasterData,
    updateUserMasterData,
    deleteUserMaster,
    addStudentMasterData,
    getAllStudentData,
}
