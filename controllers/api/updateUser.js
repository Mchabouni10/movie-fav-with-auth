const User = require('../../models/user');

async function updateProfile(req, res) {
  try {
    const userId = req.params.id;
    const { name, email, birthdate, country, profilePicture } = req.body;

    // Modified for partial updates
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          email,
          birthdate,
          country,
          profilePicture,
        },
      },
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