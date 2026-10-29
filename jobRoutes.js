import express from "express";

import {
  createJob,
  getJobs,
  getRecruiterJobs,
  getPublicJob,
  getSingleJob,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// CREATE
// =====================================================

router.post(
  "/create",
  protect,
  createJob
);

// =====================================================
// GET ALL PUBLIC JOBS
// =====================================================

router.get(
  "/",
  getJobs
);

// =====================================================
// GET RECRUITER'S OWN JOBS
// =====================================================

router.get(
  "/my",
  protect,
  getRecruiterJobs
);

// =====================================================
// GET PUBLIC SINGLE JOB
// =====================================================

router.get(
  "/:id",
  getPublicJob
);

// =====================================================
// UPDATE JOB
// =====================================================

router.put(
  "/:id",
  protect,
  updateJob
);

// =====================================================
// DELETE JOB
// =====================================================

router.delete(
  "/:id",
  protect,
  deleteJob
);

export default router;