import React, { useEffect, useState } from 'react';
import axios from '../../api';
import './Brand.css'
import { Link } from 'react-router-dom';
const Brands = () => {
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
              <h1 className='bra'>Выбери свою категорию</h1>
        <div className="row">


          {brands.slice(0, 3).map((brand) => (

  <div key={brand.id} className="col-xl-4 col-lg-3 col-md-6 col-sm-12 justify-around mb-8">
<Link to = {`/categories/${brand.attributes?.slug}`}>

      <img src={brand.attributes?.media.data.attributes.url}  className='rounded-[20px] max-h-[500px]' />
      <p className='text-2xl mt-3'>{brand.attributes?.name}</p>
      </Link>

    </div>
  ))}

          <div className='text-center'>
         <a href="/category"><button className='btnn mt-5 mb-5  text-white uppercase text-2xl px-6 py-2 w-auto justify-center  rounded-lg '>Посмотреть все</button></a> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
