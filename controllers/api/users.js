// controllers/api/users.js
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function create(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const userWithoutPassword = { ...user.toObject(), password: undefined };
    res.status(201).json({ message: "User registered successfully", token, user: userWithoutPassword });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user", details: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const userWithoutPassword = { ...user.toObject(), password: undefined };
    res.json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to log in", details: error.message });
  }
}

async function getUserProfile(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized: No user data" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile", details: error.message });
  }
}

async function deleteProfile(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized: No user data" });

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ error: "Failed to delete user profile" });
  }
}

module.exports = {
  create,
  login,
  getUserProfile,
  deleteProfile,
};