const Guest = require("../models/Guest");

exports.addGuest = async (req, res) => {
  try {
    // Check if a guest with the same phone number already exists
    const existingGuest = await Guest.findOne({ phone: req.body.phone });

    if (existingGuest) {
      return res.status(400).json({ message: "A guest with this phone number already exists" });
    }

    // If the phone number is unique, create a new guest
    const guest = new Guest(req.body);
    await guest.save();

    res.status(201).json({ message: "Guest added successfully", guest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.status(200).json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
