//routes/api/users.js
const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const checkToken = require("../../config/checkToken");
const updateUserCtrl = require("../../controllers/api/updateUser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the uploads directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and GIF files are allowed"), false);
    }
    cb(null, true);
  },
});

// POST /api/users/register (Register a new user)
router.post("/", usersCtrl.create);

// POST /api/users/login (Authenticate user)
router.post("/login", usersCtrl.login);

// PUT /api/users/update-profile/:id (Update user profile)
router.put(
  "/update-profile/:id",
  checkToken,
  upload.single("profilePicture"),
  updateUserCtrl.updateProfile
);

// GET /api/users/profile (Fetch current user profile)
router.get("/profile", checkToken, usersCtrl.getUserProfile);

// DELETE /api/users/profile (Delete user profile)
router.delete("/profile", checkToken, usersCtrl.deleteProfile);

module.exports = router;
