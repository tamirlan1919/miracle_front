import React, { useState, useEffect, useRef } from 'react';
import axios from '../../api.js';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`/products?filters[name][$contains]=${query}&populate=*`);
        setSuggestions(response.data.data);
        setShowSuggestions(true); // Show suggestions when there are results
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    };

    if (query) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowSuggestions(false); // Hide suggestions when the query is empty
    }
  }, [query]);

  const handleSelect = (name, productId) => {
    navigate(`/products/${productId}`);
    setQuery('');
    setShowSuggestions(false); // Hide suggestions after selecting an item
  };

  const handleSearch = () => {
    navigate(`/search-results/${query}`);
    setQuery('');
    setShowSuggestions(false); // Hide suggestions after performing a search
  };

  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setShowSuggestions(false); // Hide suggestions when clicking outside the component
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={suggestionsRef}>
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

      {showSuggestions && (
        <ul className="absolute overflow-y-scroll max-h-20 bg-white z-1 left-0 right-0 rounded-md">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="pt-2 px-3 mb-2 flex items-center cursor-pointer"
              onClick={() => handleSelect(suggestion.attributes.name, suggestion.id)}
            >
              <img
                src={`${process.env.REACT_APP_UPLOAD_URL}`+`${suggestion.attributes?.image.data.attributes.url}`}
                alt={suggestion.attributes.name}
                className="w-9 h-12 mr-2"
              />
              {suggestion.attributes.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
