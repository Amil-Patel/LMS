const express = require("express");
const EmailNotificationSetting = express.Router();
const EmailNotificationSettingController = require("../../controller/email-setting/Email_Notification_Setting");


EmailNotificationSetting.get("/gettingEmailNotificationSettingData", EmailNotificationSettingController.getEmailNotificationSettingData);
EmailNotificationSetting.get("/gettingEmailNotificationSettingDataWithId/:id", EmailNotificationSettingController.getEmailNotificationSettingDataWithId);
EmailNotificationSetting.put("/updatingEmailNotificationSettingData/:id", EmailNotificationSettingController.updateEmailNotificationSettingData);



module.exports = EmailNotificationSetting


