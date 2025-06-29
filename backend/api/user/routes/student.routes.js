const express = require("express");
const studentController = require("../controllers/student.controller");

const router = express.Router();

router.post("/register", studentController.studentRegister);
router.post("/bulk-register", studentController.studentBulkCreate);
router.post("/login", studentController.studentLogin);
router.put("/update-password", studentController.studentUpdatePassword);

module.exports = router;
