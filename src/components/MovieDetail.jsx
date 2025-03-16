import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../services/movieService';
import './MovieDetail.css';

const MovieDetail = ({ movieId, onClose, onToggleFavorite, isFavorite }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      const details = await getMovieDetails(movieId);
      setMovie(details);
      setLoading(false);
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (loading) {
    return (
      <div className="movie-detail-modal">
        <div className="movie-detail-content">
          <div className="movie-detail-loading">Loading movie details...</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-detail-modal">
        <div className="movie-detail-content">
          <div className="movie-detail-error">Failed to load movie details.</div>
          <button className="movie-detail-close" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail-modal">
      <div className="movie-detail-content">
        <button className="movie-detail-close" onClick={onClose}>&times;</button>
        
        <div className="movie-detail-header">
          <div className="movie-detail-poster">
            <img 
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster+Available'} 
              alt={movie.Title} 
            />
          </div>
          
          <div className="movie-detail-info">
            <h2>{movie.Title} <span className="movie-detail-year">({movie.Year})</span></h2>
            
            <div className="movie-detail-meta">
              <span>{movie.Rated}</span>
              <span>{movie.Runtime}</span>
              <span>{movie.Genre}</span>
              <span>{movie.Released}</span>
            </div>
            
            <div className="movie-detail-ratings">
              {movie.Ratings && movie.Ratings.map((rating, index) => (
                <div key={index} className="movie-detail-rating">
                  <span className="rating-source">{rating.Source}:</span>
                  <span className="rating-value">{rating.Value}</span>
                </div>
              ))}
            </div>
            
            <button 
              className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
              onClick={() => onToggleFavorite(movie)}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
        
        <div className="movie-detail-body">
          <div className="movie-detail-plot">
            <h3>Plot</h3>
            <p>{movie.Plot}</p>
          </div>
          
          <div className="movie-detail-crew">
            <div className="crew-item">
              <h4>Director</h4>
              <p>{movie.Director}</p>
            </div>
            
            <div className="crew-item">
              <h4>Writers</h4>
              <p>{movie.Writer}</p>
            </div>
            
            <div className="crew-item">
              <h4>Actors</h4>
              <p>{movie.Actors}</p>
            </div>
          </div>
          
          {movie.Awards !== 'N/A' && (
            <div className="movie-detail-awards">
              <h3>Awards</h3>
              <p>{movie.Awards}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 