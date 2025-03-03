import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditMovie.css';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    boxOffice: '',
    poster: '',
    rated: '',
    released: '',
    runtime: '',
    genre: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/movies/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`, // Ensure token is sent if protected
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch movie details: ${response.status}`);
        }
        const movieData = await response.json();
        console.log("Fetched movie data:", movieData);

        // Normalize data to match state structure
        setMovie({
          title: movieData.title || '',
          year: movieData.year || '',
          boxOffice: movieData.boxOffice || '',
          poster: movieData.poster || '',
          rated: movieData.rated || '',
          released: movieData.released || '',
          runtime: movieData.runtime || '',
          genre: movieData.genre || '',
        });
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleUpdateMovie = async () => {
    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`, // Ensure token is sent
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        throw new Error(`Failed to update movie. HTTP error ${response.status}`);
      }

      navigate('/favorites');
    } catch (error) {
      console.error('Error updating movie:', error);
      setError(error.message);
    }
  };

  if (loading) return <p className="loading-message">Loading movie details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="edit-movie-container">
      <h2 className="form-heading">Edit Movie</h2>
      <form className="edit-movie-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={movie.title} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Year:</label>
          <input type="text" name="year" value={movie.year} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Box Office Gross:</label>
          <input type="text" name="boxOffice" value={movie.boxOffice} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Poster URL:</label>
          <input type="text" name="poster" value={movie.poster} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Rated:</label>
          <input type="text" name="rated" value={movie.rated} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Released:</label>
          <input type="text" name="released" value={movie.released} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Runtime:</label>
          <input type="text" name="runtime" value={movie.runtime} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Genre:</label>
          <input type="text" name="genre" value={movie.genre} onChange={handleInputChange} />
        </div>
        <button type="button" className="submit-button" onClick={handleUpdateMovie}>
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
