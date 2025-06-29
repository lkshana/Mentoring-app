const express = require("express");
const router = express.Router();

const achievementRoutes = require("./achievement.routes");

router.use("/achievement", achievementRoutes);

module.exports = router;