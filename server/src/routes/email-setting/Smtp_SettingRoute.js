const express = require("express");
const smtpSetting = express.Router();
const smtpSettingController = require("../../controller/email-setting/Smtp_Setting");


smtpSetting.get("/gettingSmtpSettingData", smtpSettingController.getSmtpSettingData);
smtpSetting.put("/updatingSmtpSettingData/:id", smtpSettingController.updateSmtpSettingData);


module.exports = smtpSetting    


