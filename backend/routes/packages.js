import express from "express";
import {
  getPackages,
  createPackage,
  deletePackage
} from "../controllers/packageController.js";

import authMiddleware from "../middleware/auth.js";
import roleMiddleware from "../middleware/role.js";

const router = express.Router();

// public
router.get("/", getPackages);

// admin only
router.post("/", authMiddleware, roleMiddleware, createPackage);
router.delete("/:id", authMiddleware, roleMiddleware, deletePackage);

export default router;