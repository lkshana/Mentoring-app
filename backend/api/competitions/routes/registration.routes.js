const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/authMiddleware");

const registrationController = require("../controllers/registration.controller");


router.post("/:event_id", auth, registrationController.registerEvent);
router.put("/:id", auth, registrationController.updateRegistration);
router.get("/admin", auth, registrationController.getRegistrationsAdmin);
router.delete("/:id", auth, registrationController.deleteRegistration);

module.exports = router;
