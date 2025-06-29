const express = require("express");
const router = express.Router();

const memberController = require("../controllers/member.controller");


const auth= require("../../../middleware/authMiddleware");

router.post("/:project_id",auth , memberController.addmember);

router.get("/:project_id",auth , memberController.getProjectMembers);

router.delete("/:project_member_id", auth ,memberController.deletemember);

module.exports = router;
