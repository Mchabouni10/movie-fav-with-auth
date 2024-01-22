
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPenToSquare,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./FavoritePage.module.css";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/favorites");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const moviesData = await response.json();
      setFavorites(moviesData);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies. Please try again.");
    }
  };

  const handleEdit = (movieId) => {
    navigate(`/favorites/${movieId}/edit`);
  };

  const handleRemove = async (movieId) => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete movie. HTTP error ${response.status}`
        );
      }

      fetchFavorites();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sortOptions}>
      <h2 className={styles.title}>Favorites Movies</h2>

      {/* Sorting options */}
      
        <label htmlFor="sortBy">Sort By:</label>
        <select
          id="sortBy"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="">Select</option>
          <option value="title">Title</option>
          <option value="genre">Genre</option>
          <option value="boxOffice">BoxOffice</option>
          <option value="rated">Rated</option>
          <option value="released">Released</option>
          <option value="runtime">Runtime</option>
        </select>

        <label htmlFor="sortOrder">Order:</label>
        <select
          id="sortOrder"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Go back to Home link */}
      <Link to="/" className={styles.link}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.iconBackWay}
        />
        <span className={styles.text}>Go back to Home</span>
      </Link>

      {/* Movie list */}
      <ul className={styles.list}>
        {favorites && favorites.length > 0 ? (


          favorites
            .sort((a, b) => {
              // Sort logic based on the selected criteria and order
              if (sortBy === "title") {
                return sortOrder === "asc"
                  ? a.title.localeCompare(b.title)
                  : b.title.localeCompare(a.title);
              } else if (sortBy === "genre") {
                return sortOrder === "asc"
                  ? a.genre.localeCompare(b.genre)
                  : b.genre.localeCompare(a.genre);
              } else if (sortBy === "boxOffice") {
                return sortOrder === "asc"
                  ? parseInt(a.boxOffice) - parseInt(b.boxOffice)
                  : parseInt(b.boxOffice) - parseInt(a.boxOffice);
              } else if (sortBy === "rated") {
                return sortOrder === "asc"
                  ? a.rated.localeCompare(b.rated)
                  : b.rated.localeCompare(a.rated);
              } else if (sortBy === "released") {
                return sortOrder === "asc"
                  ? new Date(a.released) - new Date(b.released)
                  : new Date(b.released) - new Date(a.released);
              } else if (sortBy === "runtime") {
                return sortOrder === "asc"
                  ? parseInt(a.runtime) - parseInt(b.runtime)
                  : parseInt(b.runtime) - parseInt(a.runtime);
              }

              // Default: No sorting
              return 0;
            })
            .map((fav) => (
              <li key={fav._id} className={styles.listItem}>
                <div className={styles.FontAwesomeIcons2}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => handleEdit(fav._id)}
                    className={styles.editFontAwesome2}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => handleRemove(fav._id)}
                    className={styles.deleteFontAwesome2}
                  />
                </div>

                {fav.poster && (
                  <img
                    src={fav.poster}
                    alt={`${fav.title} Poster`}
                    className={styles.poster}
                  />
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


