// FavoritePage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import styles from './FavoritePage.module.css';

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/favorites');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const moviesData = await response.json();
      setFavorites(moviesData);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies. Please try again.');
    }
  };

  const handleEdit = (movieId) => {
    // Navigate to the edit page for the specific movie ID
    navigate(`/favorites/${movieId}/edit`);
  };

  const handleRemove = async (movieId) => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete movie. HTTP error ${response.status}`);
      }

      // Fetch the updated list of favorites after deletion
      fetchFavorites();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Favorites Movies</h2>
      <Link to="/" className={styles.link}>
        Go back to Home
      </Link>
      <ul className={styles.list}>
        {favorites && favorites.length > 0 ? (
          favorites.map((fav) => (
            <li key={fav._id} className={styles.listItem}>



              <div className={styles.buttons}>
              <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => handleEdit(fav._id)}
                  className={styles.editButton}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => handleRemove(fav._id)}
                  className={styles.deleteButton}
                />
              </div>

              
              {fav.poster && (
                <img src={fav.poster} alt={`${fav.title} Poster`} className={styles.poster} />
              )}
              <div className={styles.info}>
                <strong>Title:</strong> {fav.title} <br />
                <strong>Year:</strong> {fav.year} <br />
                <strong>BoxOffice:</strong> {fav.boxOffice} <br />
                <strong>Rated:</strong> {fav.rated} <br />
                <strong>Released:</strong> {fav.released} <br />
                <strong>Runtime:</strong> {fav.runtime} <br />
                <strong>Genre:</strong> {fav.genre}
              </div>
            </li>
          ))
        ) : (
          <p className={styles.listItem}>No favorites yet.</p>
        )}
      </ul>
    </div>
  );
};

export default FavoritePage;








