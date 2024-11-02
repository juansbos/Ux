import React from 'react';
import '../styles/SearchBar.css'

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;