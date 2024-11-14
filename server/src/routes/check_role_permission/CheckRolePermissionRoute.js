const express = require("express");
const CheckRolePermission = express.Router();
const CheckRolePermissionController = require("../../controller/check_role_permission/CheckRolePermission");


CheckRolePermission.get("/checkingUserPermission", CheckRolePermissionController.getRolePermissionData);
CheckRolePermission.get("/checkRolePermission", CheckRolePermissionController.checkRolePermissionData);



module.exports = CheckRolePermission