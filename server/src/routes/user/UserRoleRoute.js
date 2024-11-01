const express = require("express");
const UserROle = express.Router();
const UserROleController = require("../../controller/user/UserRole");


UserROle.get("/gettingUserROleData", UserROleController.getUserRoleData);
UserROle.get("/gettingUserROleDataWithId/:id", UserROleController.getUserRoleDataWithId);
UserROle.post("/addingUserROle", UserROleController.addUserRoleData);
UserROle.put("/updatingUserRole", UserROleController.updateUserROleData);
UserROle.delete("/deletingUserROle", UserROleController.deleteUserRoleData);

module.exports = UserROle

