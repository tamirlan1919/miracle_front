import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts, getBrands } from '../../redux/slice/productSlice';
import { PropagateLoader } from 'react-spinners';
import ProductCategoryCard from '../../components/ProductCategoryCard/ProductCategoryCard';
import styles from './BrandProducts.css';

const BrandProducts = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { products: originalProducts, status: productsStatus } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
  });
  const [sortType, setSortType] = useState('default');
  const [sortDirection, setSortDirection] = useState('asc');
  useEffect(() => {
    // Dispatch the necessary actions to fetch products and brands when the component mounts
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setProducts(originalProducts);
  }, [originalProducts]);
  useEffect(() => {
    if (originalProducts) {
      // Filter products based on the brand slug from the URL
      const filteredProducts = originalProducts.filter(
        (product) => product?.attributes.brand.data.attributes.name === name
      );
      setProducts(filteredProducts);
    
    }
   
  }, [originalProducts, name]);

  const sortedProducts = useMemo(() => {
    // Implement your sorting logic here based on the Redux state
    let sorted = [...products];

    switch (sortType) {
      case 'name':
        sorted.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
        break;
      case 'price':
        sorted.sort((a, b) => a.attributes.price - b.attributes.price);
        break;
      case 'date':
        sorted.sort((a, b) => new Date(b.attributes.created_at) - new Date(a.attributes.created_at));
        break;
      default:
        break;
    }

    if (sortDirection === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [products, sortType, sortDirection]);

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });

    // Apply filters based on Redux state
    let filteredProducts = [...originalProducts];

    if (value) {
      switch (filterName) {
        case 'name':
          filteredProducts = filteredProducts.filter((product) =>
            product.attributes.name.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'minPrice':
          filteredProducts = filteredProducts.filter(
            (product) => product.attributes.price >= parseFloat(value)
          );
          break;
        case 'maxPrice':
          filteredProducts = filteredProducts.filter(
            (product) => product.attributes.price <= parseFloat(value)
          );
          break;
        default:
          break;
      }
    }

    // Set the filtered and sorted products in the component state
    setProducts(filteredProducts);
  };

  const handleSortChange = (type) => {
    setSortType(type);
    setSortDirection((prevDirection) => (type === sortType ? (prevDirection === 'asc' ? 'desc' : 'asc') : 'asc'));
  };

  if (productsStatus === 'loading' ) {
    return (
      <div className={styles.loader}>
        <PropagateLoader color="#000" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Products for {name}</h1>

      <div className="row">
        <div className="col-md-3">
          <h2 className='mb-3'>Фильтры</h2>
          <label className='mb-2'>
            <input
              type="text"
              className="form-control"
              value={filters.name}
              placeholder='Модель'
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </label>
          <br />
          <label className='mb-2'>
            <input
              type="number"
              placeholder='Мин цена'
              className="form-control"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="number"
              placeholder='Макс цена'
              className="form-control"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </label>
        </div>

        <div className="col-md-9">
          <div className="mb-3">
            <h2>Сортировка</h2>
            <div className="dropdown">
              <button
                className="btn btn-secondary mb-3 text-black dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Выбрать сортировку
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" onClick={() => handleSortChange('default')}>
                  По умолчанию
                </button>
                <button className="dropdown-item" onClick={() => handleSortChange('name')}>
                  По названию
                </button>
                <button className="dropdown-item" onClick={() => handleSortChange('price')}>
                  По цене
                </button>
                <button className="dropdown-item" onClick={() => handleSortChange('date')}>
                  По дате загрузки
                </button>
              </div>
            </div>
            <div className="form-check form-check-inline mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="sortDirection"
                id="asc"
                value="asc"
                checked={sortDirection === 'asc'}
                onChange={() => setSortDirection('asc')}
              />
              <label className="form-check-label" htmlFor="asc">
                По возрастанию
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="sortDirection"
                id="desc"
                value="desc"
                checked={sortDirection === 'desc'}
                onChange={() => setSortDirection('desc')}
              />
              <label className="form-check-label" htmlFor="desc">
                По убыванию
              </label>
            </div>
          </div>

          <div className="row">
            {sortedProducts.map((product) => (
                        product.attributes?.available && (

              <div key={product.id} className="col-md-6 col-lg-4 mb-3">
                <ProductCategoryCard product={product} />
              </div>
                        )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandProducts;
