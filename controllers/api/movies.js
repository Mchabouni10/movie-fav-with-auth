const Movie = require('../../models/MovieSchema');

// Get all movies for a user
async function index(req, res) {
  try {
    const userID = req.query.userID;
    if (!userID) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const movies = await Movie.find({ userID: userID });
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

// Get a single movie by ID
async function show(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Add a new movie
const addMovie = async (req, res) => {
  try {
    const { title, year, boxOffice, poster, imdbID, rated, released, runtime, genre, userID } = req.body;

    // Check if the movie already exists for the user
    const existingMovie = await Movie.findOne({ imdbID, userID });
    if (existingMovie) {
      return res.status(400).json({ error: 'Movie already exists for the current user' });
    }

    // Create and save the new movie
    const newMovie = new Movie({ title, year, boxOffice, poster, imdbID, rated, released, runtime, genre, userID });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a movie by ID
const updateMovieById = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(updatedMovie);
  } catch (error) {
    console.error('Error updating movie by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a movie by ID
const deleteMovieById = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a movie's rating
const updateMovieRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const movieId = req.params.id;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }

    // Find and update the movie
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    movie.rating = rating;
    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (error) {
    console.error('Error updating movie rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  index,
  show,
  addMovie,
  updateMovieById,
  deleteMovieById,
  updateMovieRating,
};