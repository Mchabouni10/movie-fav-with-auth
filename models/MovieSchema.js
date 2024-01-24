const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  boxOffice: String,
  poster: String,
  imdbID: { type: String, unique: false }, 
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
rated: String, 
released: String, 
runtime: String, 
genre: String,
rating: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;