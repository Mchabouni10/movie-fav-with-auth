//controllers/api/updateUser.js
const User = require("../../models/user");

async function updateProfile(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID in request" });
    }
    if (req.params.id !== userId) {
      return res.status(403).json({ error: "Unauthorized: Cannot update another user's profile" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Updating profile for user:", userId, "Current profilePicture length:", user.profilePicture?.length || 0);

    // Update user fields
    if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
    if (req.body.country) user.country = req.body.country;
    if (req.body.birthdate) user.birthdate = new Date(req.body.birthdate);

    // Handle base64 image upload
    if (req.body.profilePicture) {
      // Expecting base64 string (e.g., "data:image/jpeg;base64,/9j/...")
      console.log("Received profile picture base64 length:", req.body.profilePicture.length, "for user:", userId);
      user.profilePicture = req.body.profilePicture;
    }

    // Mark profile as complete if all required fields are present
    user.isProfileComplete = !!(
      user.phoneNumber &&
      user.country &&
      user.birthdate &&
      user.profilePicture
    );
    console.log("Setting isProfileComplete to:", user.isProfileComplete, "for user:", userId);

    const updatedUser = await user.save();
    console.log("Profile updated successfully for user:", userId, "New profilePicture length:", updatedUser.profilePicture?.length || 0, "isProfileComplete:", updatedUser.isProfileComplete);

    const userWithoutPassword = { ...updatedUser.toObject(), password: undefined };
    res.json({ message: "Profile updated successfully", user: userWithoutPassword });
  } catch (error) {
    console.error("Error updating profile for user:", req.user?._id, "Details:", error);
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      return res.status(400).json({ error: "Validation failed", details: message });
    }
    res.status(500).json({ error: "Failed to update profile", details: error.message });
  }
}

module.exports = { updateProfile };