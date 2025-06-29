const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/event.controller");

const auth = require("../../../middleware/authMiddleware");
const {
  isMaster,
} = require("../../../middleware/adminMiddleware");

router.post("/", auth, isMaster, eventsController.createEvent);
router.get("/", auth, eventsController.getAllEvents);
router.get("/:id",auth,  eventsController.getEventById);
router.put("/:id",auth,isMaster, eventsController.updateEvent);
router.delete("/:id",auth, isMaster,  eventsController.deleteEvent);
router.get("/admin",auth, isMaster, eventsController.getAllEventsMaster);
router.get("/registrations/:id",auth, isMaster, eventsController.getRegistrations);

module.exports = router;
