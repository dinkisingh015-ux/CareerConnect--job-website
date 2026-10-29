import Application from "../models/Application.js";

// Apply Job
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const userId = req.user._id;

    const alreadyApplied = await Application.findOne({
      userId,
      jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      userId,
      jobId,
      status: "Pending",
    });

    res.status(201).json({
      message: "Applied Successfully",
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("userId", "name email resume")
      .populate("jobId", "title company location salary");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Candidate
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.user._id,
    }).populate(
      "jobId",
      "title company location salary"
    );

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Recruiter
export const getRecruiterApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("userId")
      .populate("jobId");

    const recruiterApplications = applications.filter(
      (app) =>
        app.jobId &&
        app.jobId.recruiterId &&
        app.jobId.recruiterId.toString() ===
          req.user._id.toString()
    );

    console.log(
      JSON.stringify(recruiterApplications, null, 2)
    );

    res.status(200).json(recruiterApplications);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Accept / Reject
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(
      req.params.id
    ).populate("jobId");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (
      application.jobId.recruiterId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      message: "Application Updated Successfully",
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};