const express=require("express");
const Timezone = express.Router();
const TimezoneController = require("../../controller/timezone/Timezone");


Timezone.get("/gettingTimezoneData", TimezoneController.getTimezoneData);


module.exports = Timezone
