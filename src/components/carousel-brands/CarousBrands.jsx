import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from '../../api';

const CarousBrands = () => {
  const [banners, setBanners] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 200,
    slidesToShow: 4, // Количество отображаемых слайдов одновременно
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/banner-brands?populate=*');
        setBanners(response.data.data);
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className='mt-1'>
      <hr />
          <Slider {...settings}>

        {banners.map((banner) => (
          <div key={banner.id} className='pt-2 pb-2'>
                <img
                  src={banner.attributes?.image.data.attributes.url}
                  alt={banner.attributes?.image.data.attributes.name || `Banner ${banner.id}`}
                  className='w-[200px]'
                />
          </div>
        ))}
                  </Slider>
                  <hr />


    </div>
  );
};

export default CarousBrands;
