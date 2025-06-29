const express = require("express");
const profileController = require("../controllers/profile.controller");
const auth = require("../../../middleware/authMiddleware");
const { isAdmin, isMaster } = require("../../../middleware/adminMiddleware");

const router = express.Router();

router.get("/student", auth, profileController.getStudentProfile);
router.get("/admin/student/:id",auth,isAdmin,profileController.getStudentProfileAdmin);
router.get("/admin/", auth, isAdmin, profileController.getAdminProfile);
router.get("/master/", auth, isMaster, profileController.getMasterProfile);
router.put("/student", auth, profileController.updateStudentProfile);
router.put("/admin", auth, isAdmin, profileController.updateAdminProfile);

module.exports = router;
