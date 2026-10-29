import express from "express";
import {
  registerUser,
  loginUser,
  uploadResume,
  getProfile,
  updateProfile,
  saveJob,
  getSavedJobs,
  removeSavedJob,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ==========================
// Register
// ==========================
router.post("/register", registerUser);

// ==========================
// Login
// ==========================
router.post("/login", loginUser);

// ==========================
// Upload Resume
// ==========================
router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);

// ==========================
// Get Profile
// ==========================
router.get(
  "/profile",
  protect,
  getProfile
);

// ==========================
// Update Profile
// ==========================
router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);

// ==========================
// Saved Jobs
// ==========================

// Save Job
router.post(
  "/save-job/:jobId",
  protect,
  saveJob
);

// Get Saved Jobs
router.get(
  "/saved-jobs",
  protect,
  getSavedJobs
);

// Remove Saved Job
router.delete(
  "/saved-jobs/:jobId",
  protect,
  removeSavedJob
);

export default router;