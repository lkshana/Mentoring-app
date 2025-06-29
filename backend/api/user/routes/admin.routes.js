const express = require("express");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.post("/register", adminController.adminRegister);
router.post("/login", adminController.adminLogin);
router.put("/update-password", adminController.adminUpdatePassword);

module.exports = router;
