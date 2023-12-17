// Favorite.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { getProducts } from '../../redux/slice/productSlice';
import { authMe, deleteProductInFavorite, postProductInCart, postProductInFavorite } from '../../redux/slice/authSlice';
import styles from './favorite.module.scss';
import image from './image.png';
import { Link } from 'react-router-dom';
import { MdCheckCircle, MdClose } from 'react-icons/md';
import { AiOutlineShopping } from 'react-icons/ai';

const Favorite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, status } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);

  const [addedProduct, setAddedProduct] = useState(null);

  useEffect(() => {
    dispatch(authMe());
    dispatch(getProducts());
  }, [dispatch]);

  const url = 'http://localhost:1337';

  if (status === 'loading') {
    return (
      <div className={styles.loader}>
        <PropagateLoader color="#000" />
      </div>
    );
  }

  const isProductInCart = (productId) => {
    return Array.isArray(data?.cart) && data.cart.some((item) => Object.keys(item)[0] === String(productId));
  };

  const handleAddToCart = (productId) => {
    const existingCart = Array.isArray(data?.cart) ? data.cart : [];

    // Check if the product is already in the cart
    const productInCart = existingCart.some((item) => Object.keys(item)[0] === String(productId));
    if (productInCart) {
      // Remove the product from the cart
      const updatedCart = existingCart.filter((item) => Object.keys(item)[0] !== String(productId));
      const field = {
        cart: updatedCart,
      };

      dispatch(postProductInCart(field));
    } else {
      // Add the product to the cart
      const field = {
        cart: [...existingCart, { [productId]: 1 }],
      };

      dispatch(postProductInCart(field));
    }

    setAddedProduct(productId);

    setTimeout(() => {
      setAddedProduct(null);
    }, 3000);
  };

  if (!data || !data.favorite) {
    return <div>No favorite products available</div>;
  }

  const favorite =
    Array.isArray(products) &&
    data.favorite &&
    products?.filter((product) =>
      data.favorite.some((favoriteId) => Object.keys(favoriteId)[0] === String(product.id))
    );

  const deleteFav = (productId) => {
    if (!data.favorite) {
      return;
    }

    const field = {
      favorite: [...data.favorite.filter((fav) => fav.productId !== productId.toString())],
    };
    dispatch(deleteProductInFavorite(field));
  };
  const handleToggleFavorite = (productId) => {
    const existingFavorites = Array.isArray(data?.favorite) ? data.favorite : [];
    console.log(existingFavorites,productId)
    const productInFavorites = existingFavorites.some((item) => Object.keys(item)[0] === String(productId));

    if (productInFavorites) {
      const updatedFavorites = existingFavorites.filter((item) => Object.keys(item)[0] !== String(productId));
      const field = {
        favorite: updatedFavorites,
      };
      dispatch(postProductInFavorite(field));
    } else {
      const updatedFavorites = [...existingFavorites, { [productId]: 1 }];
      const field = {
        favorite: updatedFavorites,
      };
      dispatch(postProductInFavorite(field));
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>ИЗБРАННОЕ</h1>
      <div className="container">
        {favorite.length > 0 ? (
          <div className="row">
            {Array.isArray(favorite) &&
              favorite?.map(({ attributes, id }) => (
                <div
                  key={id}
                  className="max-w-sm cart col-xl-3 col-lg-4 col-md-6 col-sm-12 rounded-lg overflow-hidden"
                >
              <button
                onClick={() => handleToggleFavorite(id)}
                className="py-1 relative heart text-center float-right top-[30px] right-[30px] text-white rounded"
              >
                <FaHeart className="inline-block mr-1 text-2xl text-black hover:text-gray-300 transition-colors duration-300 " />
              </button>
                  <Link to={`http://127.0.0.1:3000/products/${attributes?.slug}/${id}`}>
                    <img
                      src={`${process.env.REACT_APP_UPLOAD_URL}${attributes?.image.data.attributes.url}`}
                      alt={attributes?.name}
                      className="w-full max-h-[170px] object-contain object-center"
                    />
                  </Link>

                  <div className="p-4">
                    <h2 className="text-2xl font-semibold font-bold text-gray-800">{attributes?.name}</h2>
                    <p className="text-sm text-gray-600 mt-2">{attributes?.brand ? attributes.brand?.name : ''}</p>

                    <div className="mt-2 basket">
                      {isProductInCart(id) ? (
                        <button
                          onClick={() => handleAddToCart(id)}
                          className="bg-black float-right hover:bg-gray-300 transition-colors duration-300 relative top-[-10px] w-[50px] h-[50px] text-white rounded-[50%]"
                        >
                          <AiOutlineShopping className="text-2xl inline-block" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(id)}
                          className="bg-gray-300 float-right hover:bg-black transition-colors duration-300 relative top-[-10px] w-[50px] h-[50px] text-white rounded-[50%]"
                        >
                          <AiOutlineShopping className="text-2xl inline-block" />
                        </button>
                      )}

                      {addedProduct === id && (
                        <div className="fixed top-0 right-0 p-2 bg-green-500 text-white rounded-md">
                          {/* Change the icon to a cross (close) when removing from the cart */}
                          {isProductInCart(id) ? (
                            <MdCheckCircle className="text-2xl cursor-pointer" onClick={() => setAddedProduct(null)} />
                          ) : (
                            <MdClose className="text-2xl cursor-pointer" onClick={() => setAddedProduct(null)} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className={styles.empty_cart}>
            <img src={image} alt="" />
            <div className={styles.empty_title}>
              <span>Тут ничего нет</span>
              <button onClick={() => navigate('/')}>ПЕРЕЙТИ К ПОКУПКАМ</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
