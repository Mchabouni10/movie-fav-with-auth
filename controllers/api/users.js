//controllers/api/users
const User = require("../../models/user");

// Fetch the current user's profile
async function getUserProfile(req, res) {
  try {
    // Ensure req.user exists before proceeding
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const user = await User.findById(req.user._id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User profile retrieved successfully", user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to retrieve user profile", details: error.message });
  }
}

// Delete the current user's profile
async function deleteProfile(req, res) {
  try {
    // Ensure req.user exists before proceeding
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ error: "Failed to delete user profile", details: error.message });
  }
}

module.exports = {
  getUserProfile,
  deleteProfile,
};

