const express = require("express");
const UserMaster = express.Router();
const UserMasterController = require("../../controller/user/UserMaster");
const upload = require("../../middleware/upload");


UserMaster.get("/gettingUserMasterData", UserMasterController.getUserMasterData);
UserMaster.get("/gettingAllStudentData", UserMasterController.getAllStudentData);
UserMaster.get("/gettingUserMasterDataWithId/:id", UserMasterController.getUserMasterDataWithId);
UserMaster.post("/addingUserMaster", upload.single('profile'), UserMasterController.addUserMasterData);
UserMaster.post("/addingStudentMaster", UserMasterController.addStudentMasterData);
UserMaster.put("/updatingUserMaster/:id", upload.single('profile'), UserMasterController.updateUserMasterData);
UserMaster.put("/updatingUserMasterStatus/:id", UserMasterController.updateUserMasterStatusData);
UserMaster.delete("/deletingUserMaster/:id", UserMasterController.deleteUserMaster);

module.exports = UserMaster







