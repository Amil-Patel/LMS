const { smtp_setting } = require("../../database/models/index");


const getSmtpSettingData = async (req,res) => {
    try {
        const data = await smtp_setting.findAll();
        console.log(data)
        res.send(data[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateSmtpSettingData = async (req, res) => {
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
    getSmtpSettingData,
    updateSmtpSettingData
}