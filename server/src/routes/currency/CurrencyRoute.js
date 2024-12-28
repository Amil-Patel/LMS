const express = require("express");
const Currency = express.Router();
const CurrencyController = require("../../controller/currency/Currency");


Currency.get("/gettingCurrencyData", CurrencyController.getCurrencyData);
Currency.get("/gettingCurrencyDataWithId/:id", CurrencyController.getCurrencyDataWithid);
Currency.put("/updatingCurrencyData/:id", CurrencyController.updateCurrencyData);


module.exports = Currency