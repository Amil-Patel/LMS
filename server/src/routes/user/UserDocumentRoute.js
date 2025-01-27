const express = require("express");
const UserDocument = express.Router();
const UserDocumentController = require("../../controller/user/UserDocument");
const upload = require("../../middleware/upload");

UserDocument.post("/addingUserDocument", upload.single('attachment'), UserDocumentController.addUserDocument);
UserDocument.get("/gettingUserDocumentWithStuId/:id", UserDocumentController.getUSerWIthStuId);
UserDocument.get("/gettingUserDocumentWithStuIdAndCourseId/:stuId/:course_id", UserDocumentController.getUSerWIthStuIdAndCourseId);
UserDocument.put("/updatingCourseDocumentStatus/:id", UserDocumentController.updateCourseDocumentStatus);
UserDocument.delete("/deletingUserDocument/:id", UserDocumentController.deleteUserDocument);
module.exports = UserDocument