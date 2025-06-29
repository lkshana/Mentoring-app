const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');

const auth = require("../../../middleware/authMiddleware");

router.post('/projects/:project_id/reports', auth, reportController.createReport);
router.put('/reports/:report_id', auth, reportController.updateReport);
router.delete('/reports/:report_id', auth, reportController.deleteReport);

module.exports = router;

