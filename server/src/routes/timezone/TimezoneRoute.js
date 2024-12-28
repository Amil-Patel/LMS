const express=require("express");
const Timezone = express.Router();
const TimezoneController = require("../../controller/timezone/Timezone");


Timezone.get("/gettingTimezoneData", TimezoneController.getTimezoneData);
Timezone.get("/gettingTimezoneDataWithId", TimezoneController.getTimezoneDataWithId);
Timezone.put("/updatingTimezone", TimezoneController.updateTimezoneData);


module.exports = Timezone
