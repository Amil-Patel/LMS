const express = require("express");
const Inquiry = express.Router();
const InquiryController = require("../../controller/inquiry/Inquiry");

Inquiry.get("/gettingInquiry", InquiryController.getInquiryData);
Inquiry.post("/addingInquiry", InquiryController.addInquiryData);
Inquiry.put("/updateInquiryStatus/:id", InquiryController.updateInquiryStatus);
Inquiry.delete("/deleteInquiry/:id", InquiryController.deleteInquiryData);

module.exports = Inquiry
