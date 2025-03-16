import React from 'react';
import { useFavorites } from '../context/FavoritesContext.js';
import MovieCard from './MovieCard.jsx';
import './Favorites.css';

const Favorites = ({ onMovieClick }) => {
  const { getFavorites } = useFavorites();
  const favorites = getFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h3>No Favorite Movies</h3>
        <p>Click the heart icon on any movie to add it to your favorites.</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Your Favorite Movies</h2>
      <div className="favorites-grid">
        {favorites.map(movie => (
          <div className="favorites-grid-item" key={movie.imdbID}>
            <MovieCard movie={movie} onClick={onMovieClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites; 