import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add or remove a movie from favorites
  const toggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.imdbID === movie.imdbID);
      
      if (isAlreadyFavorite) {
        // Remove from favorites
        return prevFavorites.filter(fav => fav.imdbID !== movie.imdbID);
      } else {
        // Add to favorites
        return [...prevFavorites, movie];
      }
    });
  };

  // Check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.imdbID === movieId);
  };

  // Get all favorites
  const getFavorites = () => {
    return favorites;
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext; 