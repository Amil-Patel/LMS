const express = require("express");
const Payments = express.Router();
const PaymentsController = require("../../controller/payments/Payments");


Payments.post("/addingPayment", PaymentsController.addPaymentData);



module.exports = Payments