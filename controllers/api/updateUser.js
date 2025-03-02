//controllers/api/updateUser.js
const User = require("../../models/user");

async function updateProfile(req, res) {
  try {
    const userId = req.params.id;
    let updates = req.body;

    // Ensure updates do not contain restricted fields like password
    const restrictedFields = ["password", "_id", "createdAt", "updatedAt"];
    restrictedFields.forEach((field) => delete updates[field]);

    // Handle file upload for profile picture
    if (req.file) {
      updates.profilePicture = req.file.path;
    }

    // Validate if user exists before updating
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Failed to update user profile", details: error.message });
  }
}

module.exports = { updateProfile };
