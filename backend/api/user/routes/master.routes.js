const express = require("express");
const masterController = require("../controllers/master.controller");

const router = express.Router();

router.post("/register", masterController.masterRegister);
router.post("/login", masterController.masterLogin);
router.put("/update-password", masterController.masterUpdatePassword);

module.exports = router;
