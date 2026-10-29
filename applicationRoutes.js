
import express from "express";
import {
  applyJob,
  getApplications,
  getUserApplications,
  getRecruiterApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Candidate Apply
router.post("/apply", protect, applyJob);

// Admin
router.get("/", getApplications);

// Candidate Dashboard
router.get("/my", protect, getUserApplications);

// Recruiter Dashboard
router.get("/recruiter", protect, getRecruiterApplications);

// Accept / Reject Application
router.put(
  "/:id",
  protect,
  updateApplicationStatus
);

export default router;
