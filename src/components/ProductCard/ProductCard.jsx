import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import './ProductCard.css';
import { getProducts } from '../../redux/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { AiOutlineShopping } from 'react-icons/ai';
import { MdCheckCircle,MdClose } from 'react-icons/md';
import { authMe, postProductInCart, postProductInFavorite } from '../../redux/slice/authSlice';
import styles from './ProductCard.scss'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = () => {
  const { products, status } = useSelector((state) => state.products);
  const { data } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    dispatch(authMe());
    dispatch(getProducts());
  }, [dispatch]);

  const [maxStock, setMaxStock] = useState(0);
  useEffect(() => {
    setMaxStock(products?.attributes?.stock || 0);
  }, [products?.attributes?.stock]);


  const isProductInCart = (productId) => {
    return Array.isArray(data?.cart) && data.cart.some((item) => Object.keys(item)[0] === String(productId));
  };

  const isProductFavorite = (productId) => {
    return Array.isArray(data?.favorite) && data.favorite.some((item) => Object.keys(item)[0] === String(productId));
  };

  const isNewPrice = (product) => product.attributes?.is_on_sale && product.attributes?.old_price !== null;

  const [addedProduct, setAddedProduct] = useState(null);

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
      toast.error('Товар удален из корзины', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsOrderPlaced(true);

    } else {
      // Add the product to the cart
      const field = {
        cart: [...existingCart, { [productId]: 1 }],
      };

      dispatch(postProductInCart(field));

      toast.success(`Товар  успешно добавлен в корзину!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
  
      // Trigger the callback function provided by the parent component
      setIsOrderPlaced(true);

    }


  
  };

  const handleToggleFavorite = (productId) => {
    const existingFavorites = Array.isArray(data?.favorite) ? data.favorite : [];

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
  if (status === "loading") {
    return (
      <div className={styles.loader}>
        <PropagateLoader color="#000" />
      </div>
    );
  }
  if (!Array.isArray(products)) {
    return <div>No products available</div>;
  }
  const calculateDisplayPrice = (product) => {
    if (isNewPrice(product)) {
      return (
        <>
          <span className="text-[20px] text-gray-800 mt-2 mr-2">
            {parseFloat(product.attributes?.price).toFixed(2)}₽
          </span>
          <span className="text-[18px] text-gray-400 mt-2">
            <s>{parseFloat(product.attributes?.old_price).toFixed(2)}₽</s>
          </span>
        </>
      );
    } else {
      return (
        <span className="text-[20px] text-gray-800 mt-2 mr-2">
          {parseFloat(product.attributes?.price).toFixed(2)}₽
        </span>
      );
    }
  };

console.log(products)
  return (
    <div className='container mb-10'>
      <div className="row">
        {products?.map((product) => (
          <div key={product?.id} className="max-w-sm cart col-xl-3 col-lg-4 col-md-6 col-sm-12 rounded-lg overflow-hidden wrap">
            {data ?(
              <>
    {isProductFavorite(product.id) ? (
      <button
        onClick={() => handleToggleFavorite(product.id)}
        className="py-1 relative heart text-center float-right top-[30px] right-[30px] text-white rounded"
      >
        <FaHeart className="inline-block mr-1 text-2xl text-black hover:text-gray-300 transition-colors duration-300 " />
      </button>
    ) : (
      <button
        onClick={() => handleToggleFavorite(product.id)}
        className="py-1 relative heart text-center float-right top-[30px] right-[30px] text-white rounded"
      >
        <FaHeart className="inline-block mr-1 text-2xl text-gray-300 hover:text-black transition-colors duration-300 " />
      </button>
    )}
    </>
            ):
            <button
            onClick={() => navigate('/login')}
            className="py-1 relative heart text-center float-right top-[30px] right-[30px] text-white rounded"
          >
            <FaHeart className="inline-block mr-1 text-2xl text-gray-300 hover:text-black transition-colors duration-300 " />
          </button>
            }
        

            <Link to={`/products/${product.attributes?.slug}/${product?.id}`}>
              <img
                src={`${product.attributes?.image.data.attributes.url}`}
                alt={product.attributes?.name}
                className="w-full max-h-[170px] object-contain object-center"
              />
            </Link>

            <div className="p-4">
              <h2 className="text-2xl font-semibold font-bold text-gray-800">{product.attributes?.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{product.attributes?.brand ? product.attributes.brand?.name : ''}</p>
              <div className="flex">{calculateDisplayPrice(product)}</div>

              <div className="mt-2 basket">
              {data ? (
  <>
    {isProductInCart(product.id) ? (
      <button
        onClick={() => handleAddToCart(product.id)}
        className="bg-black basket float-right hover:bg-gray-300 transition-colors duration-300 relative top-[-10px] w-[50px] h-[50px] text-white rounded-[50%]"
      >
        <AiOutlineShopping className="text-2xl inline-block" />
      </button>
    ) : (
      <button
        onClick={() => handleAddToCart(product.id)}
        className="bg-gray-300 basket float-right hover:bg-black transition-colors duration-300 relative top-[-10px] w-[50px] h-[50px] text-white rounded-[50%]"
      >
        <AiOutlineShopping className="text-2xl inline-block" />
      </button>
    )}
  </>
) : (
  <button
    onClick={() => navigate('/login')}
    className="bg-gray-300 basket float-right hover:bg-black transition-colors duration-300 relative top-[-10px] w-[50px] h-[50px] text-white rounded-[50%]"
  >
    <AiOutlineShopping className="text-2xl inline-block" />
  </button>
)}


                {addedProduct === product.id && (
                  <div className="fixed top-0 right-0 p-2 bg-green-500 text-white rounded-md">
                    {/* Change the icon to a cross (close) when removing from the cart */}
                    {isProductInCart(product.id) ? (
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
      {isOrderPlaced && (
        <>
        <ToastContainer autoClose={3000} hideProgressBar />
        
        </>
      )}
    </div>
  );
};

export default ProductCard;
