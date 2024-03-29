// controllers/movies.js
const Movie = require('../../models/MovieSchema');

// Get all movies
async function index(req, res) {
  try {
    const userID = req.query.userID;
    const movies = await Movie.find({ userID: userID });
    res.status(200).json(movies);
  } catch (error) {
    console.log('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

  
  async function show(req, res) {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.status(200).json(movie);
    } catch (error) {
      console.log('Error fetching movie by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }



  const addMovie = async (req, res) => {
    try {
      console.log('Received POST request to /api/movies');
      console.log('Request Body:', req.body);
  
      // Extract relevant movie information from the request body
      const { title, year, boxOffice, poster, imdbID, rated, released, runtime, genre, userID } = req.body;
      console.log('Movie Data:', { title, year, boxOffice, poster, imdbID, rated, released, runtime, genre });
  
      // Check if the movie already exists in the database for the current user
      const existingMovie = await Movie.findOne({ imdbID, userID });
  
      if (existingMovie) {
        console.log('Movie already exists for the current user');
        return res.status(400).json({ error: 'Movie already exists for the current user' });
      }
  
      // Create a new Movie instance with the extracted information
      const newMovie = new Movie({ title, year, boxOffice, poster, imdbID, rated, released, runtime, genre, userID });
  
      // Save the new movie to the database
      const savedMovie = await newMovie.save();
      console.log('Movie added successfully:', savedMovie);
  
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



const updateMovieRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const movieId = req.params.id;

    // Validate rating (example: between 1 and 5)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }

    // Find the movie by ID
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Update the rating field
    movie.rating = rating;

    // Save the updated movie
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