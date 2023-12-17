import React, { useEffect, useState } from 'react';
import axios from '../../api';
import './AllCategory.css'
import { Link } from 'react-router-dom';
const AllCategory = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('/categories?populate=*');
        const data = response.data.data; // Access the 'data' array
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className=''>
      <div className="container main">
              <h1>Выбери свою категорию</h1>
        <div className="row">

           {brands.map((brand) => (
            <div key={brand.id} className="col-xl-4 col-lg-3 col-md-6 col-sm-12 justify-around mb-8">
                <Link to = {`/categories/${brand.attributes?.slug}`}>
              <img src={process.env.REACT_APP_UPLOAD_URL + brand.attributes?.image.data.attributes.url}  className='rounded-[20px] max-h-[500px]' />
              <p className='text-2xl mt-3'>{brand.attributes?.name}</p>
              </Link>
            </div>
          ))}
          <div className='text-center'>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
