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

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`/api/movies/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const movieData = await response.json();
      setMovie(movieData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

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
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        throw new Error(`Failed to update movie. HTTP error ${response.status}`);
      }

      navigate('/favorites'); 
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <div className='edit-container'>
      <h2>Edit Movie</h2>
      <form className='edit-form'>
        <label className='edit-label'>Title:</label>
        <input type="text" name="title" value={movie.title} onChange={handleInputChange} />

        <label className='edit-label'>Year:</label>
        <input type="text" name="year" value={movie.year} onChange={handleInputChange} />

        <label className='edit-label'>Box Office Gross:</label>
        <input type="text" name="boxOffice" value={movie.boxOffice} onChange={handleInputChange} />

        <label className='edit-label'>Poster URL:</label>
        <input type="text" name="poster" value={movie.poster} onChange={handleInputChange} />

       
        <label className='edit-label'>Rated:</label>
        <input type="text" name="rated" value={movie.rated} onChange={handleInputChange} />

        <label className='edit-label'>Released:</label>
        <input type="text" name="released" value={movie.released} onChange={handleInputChange} />

        <label className='edit-label'>Runtime:</label>
        <input type="text" name="runtime" value={movie.runtime} onChange={handleInputChange} />

        <label className='edit-label'>Genre:</label>
        <input type="text" name="genre" value={movie.genre} onChange={handleInputChange} />
    

        <button type="button" className='edit-button' onClick={handleUpdateMovie}>
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;

