const User = require('../../models/user');

async function updateProfile(req, res) {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Handle file upload for profile picture
    if (req.file) {
      updates.profilePicture = req.file.path; // Save the file path to the database
    }

    // Update the user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile', details: error.message });
  }
}

module.exports = { updateProfile };