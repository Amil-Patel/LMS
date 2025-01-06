const express = require("express");
const Currency = express.Router();
const CurrencyController = require("../../controller/currency/Currency");


Currency.get("/gettingCurrencyData", CurrencyController.getCurrencyData);
Currency.get("/gettingCurrencyDataWithId", CurrencyController.getCurrencyDataWithid);
Currency.put("/updatingCurrencyData/:id", CurrencyController.updateCurrencyData);


module.exports = Currency