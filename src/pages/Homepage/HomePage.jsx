import React, { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieDisplay from "../../components/MovieDisplay/MovieDisplay";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import * as usersService from "../../utilities/users-service";

function HomePage() {
  const apiKey = "666b0795";
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

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
      console.log("Fetched Movie:", data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  useEffect(() => {
    getMovie("Avatar");
  }, []);

  const addToFavorites = async (movie) => {
    console.log("addToFavorites clicked, movie:", movie); // Confirm click
    const user = usersService.getUser();
    const token = usersService.getToken();
    if (!user || !token) {
      console.log("No user or token, redirecting to /login");
      navigate("/login");
      return;
    }

    console.log("User:", user, "Token:", token);
    try {
      const movieData = {
        title: movie?.Title,
        year: movie?.Year,
        boxOffice: movie?.BoxOffice || "N/A",
        poster: movie?.Poster,
        imdbID: movie?.imdbID,
        rated: movie?.Rated || "N/A",
        released: movie?.Released || "N/A",
        runtime: movie?.Runtime || "N/A",
        genre: movie?.Genre || "N/A",
        userID: user._id,
      };
      console.log("Sending movie data:", movieData);

      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(movieData),
      });

      const responseText = await response.text();
      console.log(`POST /api/movies response: ${response.status} - ${responseText}`);

      if (!response.ok) {
        throw new Error(`Failed to add movie: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log("Movie added successfully:", data);
      alert("Movie added to your favorites!");
      navigate("/favorites");
    } catch (error) {
      console.error("Error adding movie:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="home-page">
        <Form moviesearch={getMovie} />
        <div className="add-to-favorite-button">
          Click{" "}
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => addToFavorites(movie)}
            className="add-movie-icon"
          />
          {" "}to add to favorites
        </div>
        <MovieDisplay currentMovie={movie} />
      </div>
    </div>
  );
}

export default HomePage;