import React, { useEffect, useState } from 'react';
import axios from '../../api';
import './AllCategory.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/slice/productSlice';
import { PropagateLoader } from 'react-spinners';
import styles from './AllCategory.module.scss'
const AllCategory = () => {
  const { categories, status } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className={styles.loader}>
        <PropagateLoader color="#000" />
      </div>
    );
  }
  console.log(categories)
  return (
    <div className=''>
       <h1 className='container text-2xl text-center mb-5 mt-5'>Выбери свою категорию</h1>
      <div className="container main">
             
        <div className="row">

           {categories?.map((brand) => (
            <div key={brand.id} className="col-xl-4 col-lg-3 col-md-6 col-sm-12 justify-around mb-8">
                <Link to = {`/categories/${brand.attributes?.name}`}>
              <img src={process.env.REACT_APP_UPLOAD_URL+brand.attributes?.image?.data?.attributes?.url}  className='rounded-[20px] max-h-[500px]' />
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
