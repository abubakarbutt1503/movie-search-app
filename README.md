# Movie Search App

A React application that allows users to search for movies using the OMDB API. The app displays movie information in a clean, responsive grid layout.

## Features

- Search for movies by title
- Dynamic search results as you type
- Display random popular movies when no search term is provided
- Responsive design that works on desktop and mobile devices
- Clean and modern UI

## Prerequisites

Before running this application, you need to:

1. Get an API key from [OMDB API](http://www.omdbapi.com/)
2. Have Node.js and npm installed on your machine

## Setup

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Open `src/services/movieService.js` and replace `YOUR_OMDB_API_KEY` with your actual OMDB API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```
5. Start the development server with API key check:
   ```
   npm run start-with-key-check
   ```
   Or use the standard start command:
   ```
   npm start
   ```
6. Open your browser and navigate to `http://localhost:3000`

## How to Use

1. Type a movie title in the search bar
2. Results will appear automatically as you type
3. If you clear the search bar, random popular movies will be displayed

## Technologies Used

- React.js with JSX
- CSS Grid and Flexbox for layout
- OMDB API for movie data

## Project Structure

- `src/components/` - React components
  - `SearchBar.jsx` - Handles user input for searching
  - `MovieGrid.jsx` - Displays the grid of movie cards
  - `MovieCard.jsx` - Individual movie card component
- `src/services/` - API and data handling
  - `movieService.js` - Handles API calls to OMDB

## Using JSX Files

This project uses `.jsx` file extensions for React components to better distinguish them from regular JavaScript files. This provides several benefits:

1. Better syntax highlighting in code editors
2. Clearer indication of which files contain JSX syntax
3. Improved code organization

If you need to convert existing `.js` files to `.jsx`, you can use the included migration script:

```
npm run migrate-to-jsx
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [OMDB API](http://www.omdbapi.com/) for providing the movie data
- [Create React App](https://create-react-app.dev/) for the project setup
