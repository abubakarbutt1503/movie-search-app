import React from 'react';
import MovieCard from './MovieCard.jsx';
import './MovieGrid.css';

const MovieGrid = ({ movies, loading, onMovieClick }) => {
  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (movies.length === 0) {
    return <div className="no-results">No movies found. Try a different search term.</div>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div className="movie-grid-item" key={movie.imdbID}>
          <MovieCard movie={movie} onClick={onMovieClick} />
        </div>
      ))}
    </div>
  );
};

export default MovieGrid; 