import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import MovieGrid from './components/MovieGrid.jsx';
import { searchMovies } from './services/movieService';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

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
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Search App</h1>
        <p>Search for your favorite movies using the OMDB API</p>
      </header>
      <main className="app-main">
        <SearchBar onSearch={handleSearch} />
        <MovieGrid movies={movies} loading={loading} />
      </main>
      <footer className="app-footer">
        <p>Powered by <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDB API</a></p>
      </footer>
    </div>
  );
}

export default App; 