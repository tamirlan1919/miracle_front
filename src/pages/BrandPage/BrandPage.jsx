import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { getBrands } from '../../redux/slice/productSlice';
import styles from './BrandPage.css';

const BrandPage = () => {
  const { brands, status } = useSelector((state) => state.products);
  const { name } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const [initialLetters, setInitialLetters] = useState([]);

  useEffect(() => {
    if (brands && Array.isArray(brands)) {
      const letters = new Set();
      brands.forEach((brand) => {
        const firstLetter = brand.attributes?.name.charAt(0).toUpperCase();
        letters.add(firstLetter);
      });
      setInitialLetters(Array.from(letters).sort());
    }
  }, [brands]);

  const handleLetterClick = (letter) => {
    const section = document.getElementById(`letter-${letter}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#000" />
      </div>
    );
  }

  return (
    <div className="container mt-20">
      <h1 className='text-4xl text-left uppercase'>Бренды</h1>
      <div className="flex text-[#646464] mb-10 mt-20">
        {initialLetters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            onClick={() => handleLetterClick(letter)}
            className="mx-2 text-[#646464] font-bold no-underline cursor-pointer hover:text-black"
          >
            {letter}
          </a>
        ))}
      </div>
      <div className="row">
        {initialLetters.map((letter) => (
          <div key={letter} className={`col-xl-4 col-lg-3 col-md-6 col-sm-12 mb-20`} id={`letter-${letter}`}>
            <h2 className='uppercase text-2xl font-bold'>{letter}</h2>
            {brands
              .filter((brand) => brand.attributes?.name.charAt(0).toUpperCase() === letter)
              .map((brand) => (
                <div key={brand?.id} className="col mb-10">
                  <a href={`/brands/${brand.attributes?.name}`} className="text-black">
                    {brand.attributes?.name}
                  </a>
                </div>
              ))}
            <hr className="my-5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
