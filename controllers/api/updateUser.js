const User = require('./users');

async function updateProfile(req, res) {
  try {
    const userId = req.params.id;
    const { name, email, bio, profilePicture } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, bio, profilePicture },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {updateProfile};