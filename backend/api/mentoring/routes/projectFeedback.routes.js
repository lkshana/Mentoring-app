const express = require("express");
const router = express.Router();

const projectFeedbackController = require("../controllers/projectFeedback.controller");
const {createFeedback,updateFeedback,deleteFeedback} = projectFeedbackController

const auth = require("../../../middleware/authMiddleware");

router.post("/:project_id", auth,projectFeedbackController.createFeedback);
router.put("/:feedback_id", auth,projectFeedbackController.updateFeedback);
router.delete("/:feedback_id", auth ,projectFeedbackController.deleteFeedback);

module.exports = router;
