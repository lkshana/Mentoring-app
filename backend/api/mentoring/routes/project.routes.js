const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project.controller");
const auth = require("../../../middleware/authMiddleware");

router.get(
  "/student/:created_by",
  auth,
  projectController.getProjectByStudentId
);
router.post("/", auth, projectController.createProject);
router.get("/recent", auth, projectController.getRecentProjects);
router.put("/:id", auth, projectController.updateProject);
router.delete("/:id", auth, projectController.deleteProject);
router.get("/", auth, projectController.getAllProjects);
router.get("/:id", auth, projectController.getProjectById);
router.get("/mentor/my", auth, projectController.getMentorProjects);
router.get("/mentor/:mentor_id", auth, projectController.getProjectsByMentorId);


module.exports = router;
