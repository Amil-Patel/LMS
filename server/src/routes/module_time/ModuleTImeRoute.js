const express = require("express");
const ModuleTime = express.Router();
const ModuleTimeController = require("../../controller/module_time/ModuleTime");

ModuleTime.post("/gettingModuleTimeData", ModuleTimeController.gettingModuleTimeData);
ModuleTime.put("/updatingmoduletimestampdata", ModuleTimeController.updateModuleTime);

module.exports = ModuleTime;