import React, { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieDisplay from "../../components/MovieDisplay/MovieDisplay";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
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
      console.log("Current Movie:", data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  useEffect(() => {
    getMovie("Avatar");
  }, []);

  const addToFavorites = async (movie) => {
    const user = usersService.getUser();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
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
          userID: user._id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      console.log("Movie added to favorites with ID:", data._id);
      alert("Movie added to your favorites!");
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
      alert("Error adding movie. Please try again.");
    }
  };

  return (
    <div>
      <div className='home-page'>
        <Form moviesearch={getMovie} />
        <div className='add-to-favorite-button'>
          Click{" "}
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => addToFavorites(movie)}
            className='add-movie-icon'
          />
          {" "}to add to favorites
        </div>
        <MovieDisplay currentMovie={movie} />
      </div>
    </div>
  );
}

export default HomePage;

