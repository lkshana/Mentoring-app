const express = require("express")

const router = express.Router();

const memberRoutes = require("./member.routes");
const projectRoutes = require("./project.routes");
const projectFeedbackRoutes = require("./projectFeedback.routes");
const reportRoutes = require("./report.routes");
const updateRoutes = require("./update.routes");



router.use("/member", memberRoutes);
router.use("/project", projectRoutes);
router.use("/projectFeedback", projectFeedbackRoutes);
router.use("/report", reportRoutes);
router.use("/update", updateRoutes);



module.exports = router;