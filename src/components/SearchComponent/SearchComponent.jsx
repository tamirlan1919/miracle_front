import React, { useState, useEffect } from 'react';
import axios from '../../api.js';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`/products?filters[slug][$contains]=${query}&populate=*`);
        console.log(response.data.data);
        setSuggestions(response.data.data);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    };

    if (query) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (slug, productId) => {
    navigate(`/products/${slug}/${productId}`);
    setQuery('');
  };

  const handleSearch = () => {
    // Perform any additional search-related actions if needed
    // For now, just navigate to the search results page
    navigate(`/search-results/${query}`);
    setQuery('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full rounded-lg'
        id="outlined-basic"
        label="Поиск 🔎"
        variant="outlined"
      />

      {query && (
        <button
          className="absolute inset-y-1.5 h-[70%] rounded-lg right-2 px-4 bg-[#028103] text-white"
          onClick={handleSearch}
        >
          Найти
        </button>
      )}

      <ul className="absolute overflow-y-scroll bg-white z-1 left-0 right-0 rounded-md">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            className="pt-2 px-3 mb-2 flex items-center cursor-pointer"
            onClick={() => handleSelect(suggestion.attributes.slug, suggestion.id)}
          >
            <img
              src={`${suggestion.attributes?.image.data.attributes.url}`}
              alt={suggestion.attributes.name}
              className="w-9 h-12 mr-2"
            />
            {suggestion.attributes.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
