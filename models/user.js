//models/user.js
// Define the user schema
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10; // Increased for better security

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Ensures a valid email format
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: /^\+?[1-9]\d{1,14}$/, // Ensures a valid phone number format (E.164 standard)
    },
    country: { type: String, trim: true },
    birthdate: { type: Date },
    profilePicture: { type: String },
    isProfileComplete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password; // Exclude password from the response
        return ret;
      },
    },
  }
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
