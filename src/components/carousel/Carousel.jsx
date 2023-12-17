import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MyCarousel = () => {
  return (
    <div className='mt-1'>
      <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>
        <div>
          <img src="1.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src="2.jpg" alt="Slide 2" />
        </div>
        <div>
          <img src="3.jpg" alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default MyCarousel;
