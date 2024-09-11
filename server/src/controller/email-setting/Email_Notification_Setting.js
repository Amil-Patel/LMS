const { Email_Notifiacation_Setting } = require('../../database/models/index');

const getEmailNotificationSettingData = async (req, res) => {
    try {
        const data = await Email_Notifiacation_Setting.findAll();
        console.log(data)
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getEmailNotificationSettingDataWithId = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Email_Notifiacation_Setting.findeOne({
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

const updateEmailNotificationSettingData = async (req, res) => {
    const id = req.params.id;
    const data = {
        type: req.body.type,
        is_editable: req.body.is_editable,
        addon_identifier: req.body.addon_identifier || null,
        user_types: JSON.stringify(req.body.user_types),
        system_notification: JSON.stringify(req.body.system_notification),
        email_notification: JSON.stringify(req.body.email_notification),
        subject: JSON.stringify(req.body.subject),
        template: JSON.stringify(req.body.template),
        setting_title: req.body.setting_title,
        setting_sub_title: req.body.setting_sub_title,
        updatedAt: new Date(),
    }
    try {
        const userroledata = await Email_Notifiacation_Setting.update(data, {
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
    getEmailNotificationSettingData,
    getEmailNotificationSettingDataWithId,
    updateEmailNotificationSettingData
}
