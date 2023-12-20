import React, { useState, useEffect } from 'react';
import axios from '../../api.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '../../redux/slice/productSlice';
import ProductCategoryCard from '../../components/ProductCategoryCard/ProductCategoryCard.jsx';
import style from './SearchResults.module.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [sortBy, setSortBy] = useState('price'); // Default sorting by price
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
  const { query } = useParams();
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const productResponse = await axios.get(`/products?filters[slug][$contains]=${query.toLowerCase()}&populate=*`);

        // Combine product and brand data into a single array
        const combinedResults = [...productResponse.data.data];

        // Set the combined results in the component state
        setResults(combinedResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]); // Set empty results array on error
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setResults([]);
    }

    fetchCategories();
  }, [query]);

  const dispatch = useDispatch();
  const { products: originalProducts, status } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
  });

  const [sortType, setSortType] = useState('default');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    if (results.length > 0) {
      let filteredResults = [...results];

      // Apply filters based on Redux state
      if (filters.name) {
        filteredResults = filteredResults.filter((result) =>
          result.attributes.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }
      if (filters.minPrice) {
        filteredResults = filteredResults.filter(
          (result) => result.attributes.price >= parseFloat(filters.minPrice)
        );
      }
      if (filters.maxPrice) {
        filteredResults = filteredResults.filter(
          (result) => result.attributes.price <= parseFloat(filters.maxPrice)
        );
      }

      // Apply category filter
      if (selectedCategory) {
        filteredResults = filteredResults.filter((result) =>
          result.attributes.category?.data.attributes.name.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }

      // Apply sorting based on Redux state
      switch (sortType) {
        case 'name':
          filteredResults.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
          break;
        case 'price':
          filteredResults.sort((a, b) => a.attributes.price - b.attributes.price);
          break;
        case 'date':
          filteredResults.sort((a, b) => new Date(b.attributes.created_at) - new Date(a.attributes.created_at));
          break;
        default:
          break;
      }

      // Apply sorting order
      if (sortDirection === 'desc') {
        filteredResults.reverse();
      }

      // Set the filtered and sorted products in the component state
      setProducts(filteredResults);
    }
  }, [results, filters, sortType, sortDirection, selectedCategory]);

  const applyFilters = () => {
    setIsFilterApplied(true);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  const handleSortChange = (type) => {
    setSortType(type);
    setSortDirection((prevDirection) => (type === sortType ? (prevDirection === 'asc' ? 'desc' : 'asc') : 'asc'));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (isFilterApplied) {
      applyFilters();
      setIsFilterApplied(false);
    }
  }, [isFilterApplied, applyFilters]);

  const resetFilters = () => {
    setFilters({
      name: '',
      minPrice: '',
      maxPrice: '',
    });
    setSelectedCategory('');
    setIsFilterApplied(true);
  };

  useEffect(() => {
    // Dispatch the getProducts action to fetch products when the component mounts
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setProducts(originalProducts);
  }, [originalProducts]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (results.length === 0) {
    return (
      <>
        <div className="container">
          <div className="row">
            <h1 className={style.h1}>К сожалению, по вашему запросу ничего не найдено</h1>
            <Link to={'/'}>
              <button className={style.btn}>Перейти на главную</button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Products for {query}</h1>

      <div className="row">
        <div className="col-md-3">
          <h2 className="mb-3">Фильтры</h2>
          <label className="mb-2">
            <input
              type="text"
              className="form-control"
              value={filters.name}
              placeholder="Бренд"
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </label>
          <br />
          <label className="mb-2">
            <input
              type="number"
              placeholder="Мин цена"
              className="form-control"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              type="number"
              placeholder="Макс цена"
              className="form-control"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </label>
          <br />
          <div className="mt-2">
            <label className="form-label">Категория</label>
            <select
              className="form-select w-auto"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category.id} value={category.attributes.name}>
                  {category.attributes.name}
                </option>
              ))}
            </select>
          </div>

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
            {products.map((product) => (
              <div key={product.id} className="col-xl-4 col-md-6 col-lg-4 col-sm-12 mb-3">
                <ProductCategoryCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
