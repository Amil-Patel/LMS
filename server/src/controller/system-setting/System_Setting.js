const { System_Setting } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware")

const getSystemSettingDataWithId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await System_Setting.findAll();
        res.status(200).json(data[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


const addSystemSettingData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const data = {
        timezone: req.body.timezone,
        currency: req.body.currency,
        position: req.body.position,
        email_verification: req.body.email_verification,
        max_authorized_device: req.body.max_authorized_device,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const userroledata = await System_Setting.create(data);
        res.staus(200).json(userroledata);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


const updateSystemSettingData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const data = {
        timezone: req.body.timezone,
        currency: req.body.currency,
        position: req.body.position,
        email_verification: req.body.email_verification,
        max_authorized_device: req.body.max_authorized_device,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const systemsettingdata = await System_Setting.update(data, {
            where: {
                id: id
            }
        })
        res.status(200).json(systemsettingdata);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


module.exports = {
    getSystemSettingDataWithId,
    addSystemSettingData,
    updateSystemSettingData
}