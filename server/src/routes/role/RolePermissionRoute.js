const express = require("express");
const RolePermission = express.Router();
const RolePermissionController = require("../../controller/role/RolePermission");


RolePermission.get("/gettingRolePermissionData", RolePermissionController.getRolePermissionData);
RolePermission.get("/gettingRolePermissionDataForEdit", RolePermissionController.getRolePermissionDataForEdit);
RolePermission.post("/addingRolePermission", RolePermissionController.addRolePermissionData);
RolePermission.put("/editRolePermission/:name", RolePermissionController.editRolePermissionData);



module.exports = RolePermission

