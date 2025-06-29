const express = require("express");
const mentorController = require("../controllers/mentor.controller");

const router = express.Router();

router.post("/register", mentorController.mentorRegister);
router.post("/login", mentorController.mentorLogin);
router.put("/update-password", mentorController.mentorUpdatePassword);
router.get("/list-mentors", mentorController.getAllMentors);
module.exports = router;