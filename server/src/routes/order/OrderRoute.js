const express = require("express");
const Order = express.Router();
const OrderController = require("../../controller/order/Order");

Order.post("/addingOrderData", OrderController.addOrderData);
Order.post("/addingOrderDetailItem", OrderController.addingOrderDetailItems);


module.exports = Order