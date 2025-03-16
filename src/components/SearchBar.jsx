import React, { useState } from 'react';
import '../styles/components/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="search-icon">
        <i className="fa fa-search"></i>
      </div>
    </div>
  );
};

export default SearchBar; 