const express = require("express");
const SystemSetting = express.Router();
const SystemSettingController = require("../../controller/system-setting/System_Setting");

SystemSetting.get("/gettingSystemSettingWithId", SystemSettingController.getSystemSettingDataWithId);
SystemSetting.post("/addingSystemSetting", SystemSettingController.addSystemSettingData);
SystemSetting.put("/updatingSystemSetting", SystemSettingController.updateSystemSettingData);


module.exports = SystemSetting