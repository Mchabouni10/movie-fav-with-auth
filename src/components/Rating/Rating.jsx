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

  return (
    <div className="rating-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={rating >= star ? solidStar : regularStar}
          onClick={() => handleStarClick(star)}
          className="star-icon"
        />
      ))}
    </div>
  );
};

export default Rating;

