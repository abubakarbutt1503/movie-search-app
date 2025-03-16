import React from 'react';
import { useFavorites } from '../context/FavoritesContext.jsx';
import '../styles/components/MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster+Available';
  const isMovieFavorite = isFavorite(movie.imdbID);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    toggleFavorite(movie);
  };

  return (
    <div className="movie-card" onClick={() => onClick(movie.imdbID)}>
      <div className="favorite-icon" onClick={handleFavoriteClick}>
        <i className={`fa ${isMovieFavorite ? 'fa-heart' : 'fa-heart-o'}`}></i>
      </div>
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.Title} />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
        <span className="movie-type">{movie.Type}</span>
      </div>
    </div>
  );
};

export default MovieCard; 