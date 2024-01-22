import React from 'react';
import styles from './MovieDisplay.module.css'; 

const MovieDisplay = (props) => {
  const { currentMovie } = props;

  const loaded = () => (
    <div className={styles.Display}>
      <div className={styles.leftColumn}>
      <div className={styles.titleMovie}>{currentMovie.Title}</div>
        <img className={styles.imageCover} src={currentMovie.Poster} alt={currentMovie.Title} />
      </div>

      <div className={styles.rightColumn}>
        <h2>Details:</h2>
        <ul>
          <li>
            <strong className={styles.detailsMovie}>Title:</strong> {currentMovie.Title}
          </li>
          <li>
            <strong className={styles.detailsMovie}>Year:</strong> {currentMovie.Year}
          </li>
          <li>
            <strong className={styles.detailsMovie}>Rated:</strong> {currentMovie.Rated}
          </li>
          <li>
            <strong className={styles.detailsMovie}>Released:</strong> {currentMovie.Released}
          </li>
          <li>
            <strong className={styles.detailsMovie}>Runtime:</strong> {currentMovie.Runtime}
          </li>
          <li>
            <strong className={styles.detailsMovie}>Genre:</strong> {currentMovie.Genre}
          </li>
          <li>
            <strong className={styles.detailsMovie}>BoxOffice:</strong> {currentMovie.BoxOffice}
          </li>
        </ul>
      </div>
    </div>
  );

  const loading = () => <h1>Buffering...</h1>;

  return props.currentMovie ? loaded() : loading();
};

export default MovieDisplay;