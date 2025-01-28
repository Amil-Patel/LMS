const { smtp_setting } = require("../../database/models/index");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const AuthMiddleware = require("../../auth/AuthMiddleware")

const addSmtpSettingData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const createddate = DateToUnixNumber(new Date(), 'America/Toronto');
    const data = {
        protocol: req.body.protocol,
        smtp_crypto: req.body.smtp_crypto,
        smtp_host: req.body.smtp_host,
        smtp_port: req.body.smtp_port,
        smtp_from_email: req.body.smtp_from_email,
        smtp_username: req.body.smtp_username,
        smtp_password: req.body.smtp_password,
        createdAt: createddate,
        updatedAt: createddate,
    }
    try {
        const userroledata = await smtp_setting.create(data);
        res.status(200).json(userroledata);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getSmtpSettingData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const data = await smtp_setting.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateSmtpSettingData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const data = {
        protocol: req.body.protocol,
        smtp_crypto: req.body.smtp_crypto,
        smtp_host: req.body.smtp_host,
        smtp_port: req.body.smtp_port,
        smtp_from_email: req.body.smtp_from_email,
        smtp_username: req.body.smtp_username,
        smtp_password: req.body.smtp_password,
        updatedAt: new Date(),
    }
    try {
        const userroledata = await smtp_setting.update(data, {
            where: {
                id: id
            }
        })
        res.status(200).json(userroledata);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


module.exports = {
    addSmtpSettingData,
    getSmtpSettingData,
    updateSmtpSettingData
}