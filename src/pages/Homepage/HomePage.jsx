import React, { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieDisplay from "../../components/MovieDisplay/MovieDisplay";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./HomePage.module.css";
import * as usersService from "../../utilities/users-service"

function HomePage() {
  const apiKey = "666b0795";

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }

      const data = await response.json();
      setMovie(data);
      setError(null);
      console.log("Current Movie:", data);
    } catch (error) {
      setError("Error fetching movie");
      console.error("Error fetching movie:", error);
    }
  };

  useEffect(() => {
    getMovie("Avatar");
  }, []);



  const addToFavorites = async (movie) => {
    try {
      // Make a POST request to add the movie to MongoDB without authentication
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: movie?.Title,
          year: movie?.Year,
          boxOffice: movie?.BoxOffice,
          poster: movie?.Poster,
          imdbID: movie?.imdbID,
          rated: movie?.Rated,
          released: movie?.Released,
          runtime: movie?.Runtime,
          genre: movie?.Genre,
          userID: usersService.getUser()._id
        }),
      });

      // Check if the response status is not OK (non-200 status)
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      // Parse the response JSON
      const data = await response.json();

      // Log success message and alert to the user
      console.log("Movie added to favorites with ID:", data._id);
      alert("Movie added to your favorites!");
    } catch (error) {
      // Log error and alert to the user
      console.error("Error adding movie to favorites:", error);
      alert("Error adding movie. Please try again.");
    }
  };


  console.log(usersService.getUser()._id)

  return (
    <div>
      <div className={styles.HomePage}>
        <Form moviesearch={getMovie} />
        <div className={styles.AddFavoriteButton}>
        Click{" "}
        <FontAwesomeIcon
          icon={faPlus}
          onClick={() => addToFavorites(movie)}
          className={styles.PlusIcon}
        />
        {" "}to add to favorites
        </div>
        <MovieDisplay currentMovie={movie} />
      </div>
    </div>
  );
}

export default HomePage;
