const express = require("express");
const ModuleTime = express.Router();
const ModuleTimeController = require("../../controller/module_time/ModuleTime");


ModuleTime.get("/gettingModuleTime", ModuleTimeController.getModuleTime);
ModuleTime.get("/gettingModuleTimeWithId/:id", ModuleTimeController.getModuleTimeWithId);
ModuleTime.post("/addingmoduletimestampdata", ModuleTimeController.addModuleTime);

module.exports = ModuleTime;