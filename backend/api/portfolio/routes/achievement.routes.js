const express = require("express");
const achievementController = require("../controllers/achievement.controller");

const auth = require("../../../middleware/authMiddleware");
const {
  isAdmin,
  isMaster,
  sameDept,
  isAdminOrOwner,
} = require("../../../middleware/adminMiddleware");
const log = require("../../../middleware/log");

const router = express.Router();

router.post("/create", auth, achievementController.createAchievement);
router.put(
  "/update/:id",
  auth,
  isAdminOrOwner,
  achievementController.updateAchievement
);

router.delete(
  "/delete/:id",
  auth,
  isAdminOrOwner,
  achievementController.deleteAchievement
);
router.patch(
  "/approve/:id",
  auth,
  isAdmin,
  achievementController.approveAchievement
);

router.patch(
  "/reject/:id",
  auth,
  isAdmin,
  achievementController.rejectAchievement
);
router.get(
  "/get/:id",
  auth,
  isAdminOrOwner,
  achievementController.getAcheivementById
);
router.get(
  "/get/student/:student_id",
  auth,
  isAdmin,
  achievementController.getAcheivementByStudentId
);
router.get(
  "/get/department/:department",
  auth,
  isAdmin,
  achievementController.getAchievementsByDepartment
);
router.get(
  "/get/students/:department",
  auth,
  isAdmin,
  achievementController.getStudentsByDepartment
);

router.get(
  "/get/year/:year",
  auth,
  isMaster,
  achievementController.getAchievementsByYear
);
router.get(
  "/get/class/:department/:year",
  auth,
  isMaster,
  achievementController.getAchievementsByClass
);
router.get("/getAll", auth, isMaster, achievementController.getAllAchievements);

router.get(
  "/get/all/students",
  auth,
  isMaster,
  achievementController.getAllStudents
);

module.exports = router;
