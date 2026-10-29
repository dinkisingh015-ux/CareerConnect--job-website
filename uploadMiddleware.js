import multer from "multer";
import path from "path";

// ==============================
// Storage
// ==============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

// ==============================
// File Filter
// ==============================

const fileFilter = (req, file, cb) => {

  // Resume Upload
  if (file.fieldname === "resume") {

    if (file.mimetype === "application/pdf") {
      return cb(null, true);
    }

    return cb(
      new Error("Only PDF Resume Allowed"),
      false
    );
  }

  // Profile Image Upload
  if (file.fieldname === "profileImage") {

    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      return cb(null, true);
    }

    return cb(
      new Error("Only JPG PNG Images Allowed"),
      false
    );
  }

  cb(new Error("Invalid File"), false);
};

// ==============================
// Upload
// ==============================

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;