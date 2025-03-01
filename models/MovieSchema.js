//models/MovieSchema.js
// Define the movie schema

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  boxOffice: { type: String, default: "N/A" }, // Default value added
  poster: { type: String, required: true },
  imdbID: { type: String, required: true, unique: false }, // Unique set to false
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rated: { type: String, default: "N/A" }, // Default value added
  released: { type: String, default: "N/A" }, // Default value added
  runtime: { type: String, default: "N/A" }, // Default value added
  genre: { type: String, default: "N/A" }, // Default value added
  rating: { type: Number, default: 0 }, // Default value added
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;