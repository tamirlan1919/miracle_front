import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../../redux/slice/productSlice';
import ProductCategoryCard from '../../components/ProductCategoryCard/ProductCategoryCard';

const CategoryPage = () => {
  const { categorySlug } = useParams();
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
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const applyFilters = () => {
    let filteredProducts = [...originalProducts];

    // Apply filters based on Redux state
    if (filters.name) {
      filteredProducts = filteredProducts.filter((product) =>
        product.attributes.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.attributes.price >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.attributes.price <= parseFloat(filters.maxPrice)
      );
    }

    // Apply sorting based on Redux state
    switch (sortType) {
      case 'name':
        filteredProducts.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
        break;
      case 'price':
        filteredProducts.sort((a, b) => a.attributes.price - b.attributes.price);
        break;
      case 'date':
        filteredProducts.sort((a, b) => new Date(b.attributes.created_at) - new Date(a.attributes.created_at));
        break;
      default:
        break;
    }

    // Apply sorting order
    if (sortDirection === 'desc') {
      filteredProducts.reverse();
    }

    // Set the filtered and sorted products in the component state
    setProducts(filteredProducts);
  };

  useEffect(() => {
    // Dispatch the getProducts action to fetch products when the component mounts
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setProducts(originalProducts);
  }, [originalProducts]);

  useEffect(() => {
    if (isFilterApplied) {
      applyFilters();
      setIsFilterApplied(false);
    }
  }, [isFilterApplied, applyFilters]);

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

  const resetFilters = () => {
    setFilters({
      name: '',
      minPrice: '',
      maxPrice: '',
    });
    setIsFilterApplied(true);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Products for {categorySlug}</h1>

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
            <button className="btn bg-[#028103] text-white" onClick={applyFilters}>
              Применить
            </button>
            <button className="btn ml-2 text-white bg-[black]" onClick={resetFilters}>
              Сбросить
            </button>
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
              <div key={product.id} className="col-md-4 mb-3">
                <ProductCategoryCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
