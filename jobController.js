import Application from "../models/Application.js";
import Job from "../models/Job.js";

// =====================================================
// CREATE JOB
// =====================================================

export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      description,
      jobType,
    } = req.body;

    const job = await Job.create({
      recruiterId: req.user._id,
      title,
      company,
      location,
      salary,
      description,
      jobType,
    });

    res.status(201).json({
      message: "Job Created Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL JOBS
// =====================================================

export const getJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      jobType,
    } = req.query;

    let query = {};

    if (keyword) {
      query.$or = [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          company: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (jobType && jobType !== "All") {
      query.jobType = jobType;
    }

    const jobs = await Job.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// GET RECRUITER JOBS
// =====================================================

export const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiterId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// GET PUBLIC SINGLE JOB
// =====================================================

export const getPublicJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// GET SINGLE JOB FOR AUTHENTICATED USER
// =====================================================

export const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      job.recruiterId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE JOB
// =====================================================

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      job.recruiterId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const {
      title,
      company,
      location,
      salary,
      description,
      jobType,
    } = req.body;

    job.title = title;
    job.company = company;
    job.location = location;
    job.salary = salary;
    job.description = description;
    job.jobType = jobType;

    await job.save();

    res.status(200).json({
      message: "Job Updated Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// DELETE JOB
// =====================================================

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      job.recruiterId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await Application.deleteMany({
      jobId: req.params.id,
    });

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};