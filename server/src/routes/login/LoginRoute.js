const express = require("express");
const Login = express.Router();
const LoginController = require("../../controller/login/Login");


Login.post("/login", LoginController.getLogin);
Login.post("/studentlogin", LoginController.getStudentLogin);

module.exports = Login




