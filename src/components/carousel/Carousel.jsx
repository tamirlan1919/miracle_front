import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from '../../api';

const MyCarousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/banners?populate=*');
        setBanners(response.data.data);
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className='mt-1'>

        {banners.map((banner) => (
          <div key={banner.id}>
                            <Carousel autoPlay={true} interval={2000} infiniteLoop={true}>

            {banner.attributes?.image?.data.map((imageData) => (
              <img
                key={imageData.id}
                src={`${process.env.REACT_APP_UPLOAD_URL}`+`${imageData.attributes.url}`}
                alt={imageData.attributes.name || `Banner ${banner.id}`}
              />
            ))}
                      </Carousel>

          </div>
        ))}

    </div>
  );
};

export default MyCarousel;
