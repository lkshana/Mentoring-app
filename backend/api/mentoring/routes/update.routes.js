const express = require("express");
const router = express.Router();

const auth = require("../../../middleware/authMiddleware");
const updateController = require("../controllers/update.controller");

router.post("/:project_id",auth, updateController.createProjectUpdate);
router.put("/:update_id",auth, updateController.updateProjectUpdate);
router.delete("/:id",auth, updateController.deleteProjectUpdate);
router.put("/:update_id/review",auth, updateController.createReview);


module.exports = router;