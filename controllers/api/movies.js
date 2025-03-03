const Movie = require('../../models/MovieSchema');

// Get all movies for a user
async function index(req, res) {
  try {
    const userID = req.query.userID;
    if (!userID) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    if (userID !== req.user._id) {
      return res.status(403).json({ error: 'Unauthorized: Cannot access another user\'s movies' });
    }
    const movies = await Movie.find({ userID });
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
    if (movie.userID.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Unauthorized: Not your movie' });
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
    console.log("Adding movie for user:", userID, "Data:", req.body);
    if (userID !== req.user._id) {
      return res.status(403).json({ error: 'Unauthorized: Cannot add movie for another user' });
    }

    const existingMovie = await Movie.findOne({ imdbID, userID });
    if (existingMovie) {
      console.log("Movie already exists:", imdbID);
      return res.status(400).json({ error: 'Movie already exists in your favorites' });
    }

    const newMovie = new Movie({ title, year, boxOffice, poster, imdbID, rated, released, runtime, genre, userID });
    const savedMovie = await newMovie.save();
    console.log("Movie saved:", savedMovie._id);
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a movie by ID
const updateMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    if (movie.userID.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Unauthorized: Not your movie' });
    }
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMovie);
  } catch (error) {
    console.error('Error updating movie by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a movie by ID
const deleteMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    if (movie.userID.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Unauthorized: Not your movie' });
    }
    await Movie.findByIdAndDelete(req.params.id);
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

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating value (1-5)' });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    if (movie.userID.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Unauthorized: Not your movie' });
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