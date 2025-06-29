const express = require("express");
const router = express.Router();

const registrationRoutes = require("./registration.routes");
const teamRoutes = require("./team.routes");
const approvalRoutes = require("./approval.routes");
const eventRoutes = require("./event.routes");

router.use("/registration", registrationRoutes);
router.use("/team", teamRoutes);
router.use("/approval", approvalRoutes);
router.use("/event", eventRoutes);

module.exports = router;