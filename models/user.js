//models/user.js
// Define the user schema
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: /^\+?\d{1,15}$/, // Relaxed: allows optional +, any digits up to 15
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
        delete ret.password;
        return ret;
      },
    },
  }
);

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
