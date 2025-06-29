const express = require("express");
const router = express.Router();

const teamController = require("../controllers/team.controller");

const auth = require("../../../middleware/authMiddleware");
router.post("/:registration_id", auth, teamController.addMember);
router.delete("/:team_member_id", auth, teamController.deleteMember);

module.exports = router;
