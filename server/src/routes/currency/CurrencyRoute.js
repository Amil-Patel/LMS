const express = require("express");
const Currency = express.Router();
const CurrencyController = require("../../controller/currency/Currency");


Currency.get("/gettingCurrencyData", CurrencyController.getCurrencyData);


module.exports = Currency