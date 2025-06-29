const express = require("express");
const router = express.Router();

const auth = require("../../../middleware/authMiddleware");
const approvalController = require("../controllers/approval.controller");

    
router.post("/department/approve/:registration_id", auth, approvalController.approveDepartment);
router.post("/department/reject/:registration_id", auth, approvalController.rejectDepartment);
router.post("/master/accept/:registration_id", auth, approvalController.approveMaster);
router.post("/master/reject/:registration_id", auth, approvalController.rejectMaster);

module.exports = router;
