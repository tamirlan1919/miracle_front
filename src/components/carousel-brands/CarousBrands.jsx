import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const CarousBrands = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        speed: 200,
        slidesToShow: 4, // Количество отображаемых слайдов одновременно
        slidesToScroll: 1,
      };
    
      return (
        
        <div className='pl-4'>
            <hr className='pb-3' />
          <Slider {...settings}>
            <div>
              <img src= "mr6.png" className='w-[200px]' alt="Бренд 1" />
            </div>
            <div>
              <img src="mr2.png" alt="Бренд 2" />
            </div>
            <div>
              <img src="mr3.png" alt="Бренд 3" />
            </div>
            <div>
              <img src="mr4.png" alt="Бренд 3" />
            </div>

            <div>
              <img src="mr4.png" alt="Бренд 3" />
            </div>

            {/* Добавьте дополнительные слайды, если необходимо */}
          </Slider>
          <hr  className='pt-3'/>
        </div>
      );

    
}

export default CarousBrands
