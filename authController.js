import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Job from "../models/Job.js";
// ==============================
// Register User
// ==============================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      message: "User Registered Successfully",
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Login User
// ==============================
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      message: "Login Successful",
      token,
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Upload Resume
// ==============================
export const uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.resume = req.file.filename;

    await user.save();

    res.status(200).json({
      message: "Resume Uploaded Successfully",
      resume: user.resume,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Get Logged In User Profile
// ==============================
export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Update Profile
// ==============================
export const updateProfile = async (req, res) => {
  try {

    const {
      name,
      phone,
      skills,
      education,
      experience,
      bio,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update Basic Details
    user.name = name;
    user.phone = phone;
    user.skills = skills;
    user.education = education;
    user.experience = experience;
    user.bio = bio;

    // Update Profile Image (if uploaded)
    if (req.file) {
      user.profileImage = req.file.filename;
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      message: "Profile Updated Successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ==============================
// Save Job
// ==============================
export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({
        message: "Job already saved",
      });
    }

    user.savedJobs.push(jobId);

    await user.save();

    res.status(200).json({
      message: "Job saved successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Get Saved Jobs
// ==============================
export const getSavedJobs = async (req, res) => {
  try {

    const user = await User.findById(req.user._id)
      .populate("savedJobs");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user.savedJobs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// Remove Saved Job
// ==============================
export const removeSavedJob = async (req, res) => {
  try {

    const { jobId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.savedJobs = user.savedJobs.filter(
      (job) => job.toString() !== jobId
    );

    await user.save();

    res.status(200).json({
      message: "Job removed successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};