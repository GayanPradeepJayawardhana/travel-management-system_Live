import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/auth.js";
import roleMiddleware from "../middleware/role.js";

const router = express.Router();

// Get all bookings (admin only)
router.get("/", authMiddleware, roleMiddleware, getAllBookings);

// user routes
router.post("/", authMiddleware, createBooking);
router.get("/user", authMiddleware, getMyBookings);
router.put("/:id/cancel", authMiddleware, cancelBooking);

export default router;