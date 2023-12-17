import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const SelectPerfume = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories/');
        setCategories(response.data);
        
      } catch (error) {
        console.error('Errfdfdfor fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleShowCategory = () => {
    history.push(`/categories/${selectedCategory}`);
  };

  return (
    <div>
      <h1>Select Perfume</h1>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="" disabled>Select a category</option>
        {categories.map(category => (
          <option key={category.id} value={category.slug}>{category.name}</option>
        ))}
      </select>
      <button onClick={handleShowCategory}>Show Category</button>
    </div>
  );
};

export default SelectPerfume;
