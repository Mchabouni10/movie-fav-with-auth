import React from 'react';
import './MovieDisplay.css'; 

const MovieDisplay = (props) => {
  const { currentMovie } = props;

  const loaded = () => (
    <div className='movies-display'>
      <div className='left-column'>
      <div className='movie-title'>{currentMovie.Title}</div>
        <img className='image-movie-cover' src={currentMovie.Poster} alt={currentMovie.Title} />
      </div>

      <div className='right-column'>
        
        <ul>
        <h2 className='Details-title'>Details:</h2>
          <li>
            <strong className='movie-details'>Title:</strong> {currentMovie.Title}
          </li>
          <li>
            <strong className='movie-details'>Year:</strong> {currentMovie.Year}
          </li>
          <li>
            <strong className='movie-details'>Rated:</strong> {currentMovie.Rated}
          </li>
          <li>
            <strong className='movie-details'>Released:</strong> {currentMovie.Released}
          </li>
          <li>
            <strong className='movie-details'>Runtime:</strong> {currentMovie.Runtime}
          </li>
          <li>
            <strong className='movie-details'>Genre:</strong> {currentMovie.Genre}
          </li>
          <li>
            <strong className='movie-details'>BoxOffice:</strong> {currentMovie.BoxOffice}
          </li>
        </ul>
      </div>
    </div>
  );

  const loading = () => <h1>Buffering...</h1>;

  return props.currentMovie ? loaded() : loading();
};

export default MovieDisplay;