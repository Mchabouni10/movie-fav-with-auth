const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  getUserProfile,
};

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.status(200).json(token);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.status(200).json(createJWT(user));
  } catch (e) {
    res.status(400).json({ msg: e.message, reason: 'Bad Credentials' });
  }
}

async function getUserProfile(req, res) {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ msg: e.message, reason: 'Internal Server Error' });
  }
}

function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

