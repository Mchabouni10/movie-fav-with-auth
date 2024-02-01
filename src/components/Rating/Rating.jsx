
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "./Rating.css";


const Rating = ({ initialRating, onChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
    onChange(clickedRating);
  };


  const handleRatingChange = async (newRating, movieId) => {
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
    } catch (error) {
      console.error("Error updating movie rating:", error);
    }
  };

  return (
    <div className='rating-container'>
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={rating >= star ? solidStar : regularStar}
          onClick={() => handleStarClick(star)}
          className='stars-icons'
        />
      ))}
    </div>
  );
};

export default Rating;
