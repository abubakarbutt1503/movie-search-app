import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import MovieGrid from './components/MovieGrid.jsx';
import MovieDetail from './components/MovieDetail.jsx';
import Favorites from './components/Favorites.jsx';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext.js';
import { searchMovies } from './services/movieService';
import './App.css';

function AppContent() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Debounce search term to avoid making too many API calls
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Fetch movies when debounced search term changes
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const results = await searchMovies(debouncedSearchTerm);
      setMovies(results);
      setLoading(false);
    };

    fetchMovies();
  }, [debouncedSearchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setShowFavorites(false);
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseMovieDetail = () => {
    setSelectedMovieId(null);
  };

  const handleToggleFavorite = (movie) => {
    toggleFavorite(movie);
  };

  const handleToggleFavoritesView = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Search App</h1>
        <p>Search for your favorite movies using the OMDB API</p>
      </header>
      
      <div className="app-controls">
        <SearchBar onSearch={handleSearch} />
        <button 
          className={`favorites-toggle ${showFavorites ? 'active' : ''}`}
          onClick={handleToggleFavoritesView}
        >
          {showFavorites ? 'Show Search Results' : 'Show Favorites'}
        </button>
      </div>
      
      <main className="app-main">
        {showFavorites ? (
          <Favorites onMovieClick={handleMovieClick} />
        ) : (
          <MovieGrid 
            movies={movies} 
            loading={loading} 
            onMovieClick={handleMovieClick} 
          />
        )}
      </main>
      
      {selectedMovieId && (
        <MovieDetail 
          movieId={selectedMovieId}
          onClose={handleCloseMovieDetail}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite(selectedMovieId)}
        />
      )}
      
      <footer className="app-footer">
        <p>Powered by <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDB API</a></p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <AppContent />
    </FavoritesProvider>
  );
}

export default App; 