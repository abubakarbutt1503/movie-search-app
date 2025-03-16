// You need to get your own API key from http://www.omdbapi.com/
const API_KEY = 'ac5f5eaf';
const API_URL = 'https://www.omdbapi.com/';

// Popular movie titles for random display when no search term is provided
const popularMovies = [
  'Avengers',
  'Batman',
  'Star Wars',
  'Jurassic Park',
  'Harry Potter',
  'Matrix',
  'Inception',
  'Titanic',
  'Interstellar',
  'Godfather'
];

// Get a random movie title from the list
export const getRandomMovieTitle = () => {
  const randomIndex = Math.floor(Math.random() * popularMovies.length);
  return popularMovies[randomIndex];
};

// Search for movies by title
export const searchMovies = async (searchTerm) => {
  try {
    // If no search term is provided, use a random popular movie
    const term = searchTerm.trim() || getRandomMovieTitle();
    
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${term}&type=movie`);
    const data = await response.json();
    
    if (data.Response === 'True') {
      return data.Search || [];
    } else {
      console.error('Error fetching movies:', data.Error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// Get detailed information about a specific movie by ID
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    const data = await response.json();
    
    if (data.Response === 'True') {
      return data;
    } else {
      console.error('Error fetching movie details:', data.Error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}; 