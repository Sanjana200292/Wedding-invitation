const express = require("express");
const { addGuest, getGuests } = require("../controllers/guestController");

const router = express.Router();

router.post("/guest", addGuest);
router.get("/guests", getGuests);

module.exports = router;
