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
        const response = await axios.get(`/products?name=${query}&populate=*`);
        console.log(response.data.data)
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

  const handleSelect = (type, slug, productId, brandSlug) => {
    if (type === 'product') {
      navigate(`/products/${slug}/${productId}`);
    } else if (type === 'brand') {
      navigate(`/brands/${slug}`);
    }

    setQuery('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full  rounded-lg'
        id="outlined-basic"
        label="Поиск 🔎"
        variant="outlined"
      />

      {query && (
        <button
          className="absolute inset-y-1.5 h-[70%] rounded-lg right-2 px-4 bg-[#028103] text-white"
          onClick={() => {
            // Примените поиск или любое другое действие
            console.log('Apply button clicked!');
          }}
        >
          Найти
        </button>
      )}

      <ul className="absolute  overflow-y-scroll bg-white z-1 left-0 right-0 rounded-md">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            className="pt-2 px-3 mb-2 flex items-center cursor-pointer"
            onClick={() =>
              handleSelect(suggestion.type, suggestion.attributes.slug, suggestion.id, suggestion.attributes.brand?.slug)
            }
          >
            <img
              src={`http://localhost:1337${suggestion.attributes?.image.data.attributes.url}`}
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
