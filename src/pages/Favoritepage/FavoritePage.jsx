import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./FavoritePage.module.css";
import * as usersService from "../../utilities/users-service";
import Rating from "./../../components/Rating/Rating";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [numberOfMovies, setNumberOfMovies] = useState(0); 
  const navigate = useNavigate();


 


  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const user = usersService.getUser();

      if (!user) {
        // Handle the case where the user is not authenticated
        return;
      }

      const userID = user._id;
      console.log("User ID:", userID);

      const response = await fetch(`/api/favorites?userID=${userID}`);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const moviesData = await response.json();
      console.log("Movies Data:", moviesData);
      setFavorites(moviesData);

      // Update the number of movies
      setNumberOfMovies(moviesData.length);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies. Please try again.");
    }
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

      // Fetch favorites again to update the list and the number of movies
      fetchFavorites();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleEdit = (movieId) => {
    navigate(`/favorites/${movieId}/edit`);
  
  };

  const removeNonNumericCharacters = (value) => {
    return parseFloat(value.replace(/[^0-9.]/g, ""));
  };




  const [loading, setLoading] = useState(false);
  const handleRatingChange = async (movieId, newRating) => {
    try {
      const response = await fetch(`/api/movies/${movieId}/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: newRating }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
  
      // Handle success, update UI or state as needed
      console.log("Rating updated successfully");
      // You can update the state or provide UI feedback here
    } catch (error) {
      console.error("Error updating movie rating:", error);
      // Handle error and provide feedback if needed
    }
  };




  

  return (
    <div className={styles.container}>
      <div className={styles.sortOptions}>
      <h2 className={styles.title}>
      Favorites Movies (
      <span style={{ color: '#4caf50', fontSize: '22px' }}>
        {numberOfMovies}
      </span>)
    </h2>

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
                  ? removeNonNumericCharacters(a.boxOffice) - removeNonNumericCharacters(b.boxOffice)
                  : removeNonNumericCharacters(b.boxOffice) - removeNonNumericCharacters(a.boxOffice);
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
                    icon={faTrash}
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
                <div className={styles.ratingContainer}>
                  <Rating
                    initialRating={fav.rating || 0} // Use the movie's existing rating, default to 0
                    onChange={(newRating) => handleRatingChange(fav._id, newRating)}
                  />
                  {loading && <div>Loading...</div>}
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



