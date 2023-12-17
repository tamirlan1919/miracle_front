import React, { useState, useEffect } from 'react';
import axios from '../../api.js';

const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/products?filters[slug][$contains]=${query}&populate=*`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <h2>Результаты поиска для "{query}":</h2>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
