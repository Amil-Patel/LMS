const express = require("express");
const UserMaster = express.Router();
const UserMasterController = require("../../controller/user/UserMaster");
const upload = require("../../middleware/upload");


UserMaster.get("/gettingUserMasterData", UserMasterController.getUserMasterData);
UserMaster.get("/gettingUserMasterDataWithId/:id", UserMasterController.getUserMasterDataWithId);
UserMaster.post("/addingUserMaster", upload.single('profile'), UserMasterController.addUserMasterData);
UserMaster.put("/updatingUserMaster", upload.single('profile'), UserMasterController.updateUserMasterData);
UserMaster.delete("/deletingUserMaster", UserMasterController.deleteUserMaster);

module.exports = UserMaster




