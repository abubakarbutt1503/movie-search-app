import React from 'react';
import MovieCard from './MovieCard.jsx';
import '../styles/components/MovieGrid.css';

const MovieGrid = ({ movies, loading, onMovieClick }) => {
  if (loading) {
    return <div className="loading">
      <div className="loading-spinner"></div>
      <p>Searching for movies...</p>
    </div>;
  }

  if (movies.length === 0) {
    return <div className="no-results">
      <i className="fa fa-film no-results-icon"></i>
      <p>No movies found. Try a different search term.</p>
    </div>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <div 
          className="movie-grid-item" 
          key={movie.imdbID}
          style={{ '--animation-order': index }}
        >
          <MovieCard movie={movie} onClick={onMovieClick} />
        </div>
      ))}
    </div>
  );
};

export default MovieGrid; 