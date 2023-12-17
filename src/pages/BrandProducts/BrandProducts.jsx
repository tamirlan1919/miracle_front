// BrandProducts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const BrandProducts = () => {
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchBrandProducts = async () => {
      try {
        // Fetch brand-specific products
        const response = await axios.get(`http://127.0.0.1:8000/api/products/?brand=${slug}`);
        setProducts(response.data);

        // Fetch brand details
        const brandResponse = await axios.get(`http://127.0.0.1:8000/api/brands/${slug}/`);
        setBrand(brandResponse.data);
      } catch (error) {
        console.error('Error fetching brand products:', error);
      }
    };

    fetchBrandProducts();
  }, [slug]);

  return (
<>
</>
  );
};

export default BrandProducts;
