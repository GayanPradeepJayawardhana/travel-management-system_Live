import Booking from "../models/Booking.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking({
      user: req.user.id,
      package: req.body.packageId
    });

    await newBooking.save();
    res.json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL BOOKINGS (ADMIN)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("package");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER BOOKINGS
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ 
      user: req.user.id,
      status: "booked"  // Only return active bookings
    })
      .populate("package");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};