const express = require("express");
const router = express.Router();


const userRoutes = require("./user/routes/");

const portfolioRoutes = require("./portfolio/routes/");

const mentoringRoutes = require("./mentoring/routes/");

const competitionsRoutes = require("./competitions/routes/");


// Adding main routes for modules

router.use("/user", userRoutes);

router.use("/portfolio", portfolioRoutes);

router.use("/mentoring", mentoringRoutes);

router.use("/competitions", competitionsRoutes);



module.exports = router;

