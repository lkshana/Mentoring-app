const express = require("express");
const router = express.Router();

const studentRoutes = require("./student.routes");
const adminRoutes = require("./admin.routes");
const masterRoutes = require("./master.routes");
const profileRoutes = require("./profile.routes");
const mentorRoutes = require("./mentor.routes");

router.use("/student", studentRoutes);
router.use("/admin", adminRoutes);
router.use("/master", masterRoutes);
router.use("/profile", profileRoutes);
router.use("/mentor", mentorRoutes);

module.exports = router;