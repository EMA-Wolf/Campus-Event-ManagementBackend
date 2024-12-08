const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents, confirmRsvp, getUserEvents, cancelRsvp } = require("../controllers/eventsControllers");
const { authenticate, userAuthenticate } = require("../middleware/authMiddleware");

router.post("/create",authenticate, createEvent);
router.get("/allevents", getAllEvents);
router.post("/rsvp/confirm", userAuthenticate, confirmRsvp);
router.get("/user/events/:userId", userAuthenticate, getUserEvents);
router.delete("/rsvp/cancel/:eventId", userAuthenticate, cancelRsvp);
module.exports = router;