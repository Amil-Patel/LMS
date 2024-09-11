const express = require("express");
const paymentGetway = express.Router();
const paymentGetwayController = require("../../controller/payment-getways/PaymentGetways");


paymentGetway.get("/gettingPaymentGetwayData", paymentGetwayController.getPaymentGetwayData);
paymentGetway.put("/updatingPaymentGetway/:id", paymentGetwayController.updatePaymentGetwayData);




module.exports = paymentGetway



