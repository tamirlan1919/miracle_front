import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { getProductId} from '../../redux/slice/productSlice';
import { authMe, postProductInCart, postProductInFavorite } from "../../redux/slice/authSlice";
import axios from '../../api.js';
import  './ProductDeatils.css'; // Ensure the correct path
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductDetailsInfoDouble from './ProductDetailsInfoDouble';
import styles from './ProductDeatils.css'
import { PropagateLoader } from 'react-spinners';
const ProductDetails = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { products,status } = useSelector((state) => state.products);
  const { id } = useParams();
  const { data } = useSelector((state) => state.auth);
  const url = 'http:localhost:1377';

  useEffect(() => {
    console.log("RENDER");
    dispatch(getProductId(id));
    dispatch(authMe());
  }, [dispatch, id]);


  const navigate = useNavigate()
  const [selectedVolume, setSelectedVolume] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [all_products,SetAllProducts] = useState([])

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products?populate=*`);

        SetAllProducts(response.data.data); // Access the 'data' property in the response

      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData(); // Call the fetchData function

  }, []); // Empty dependency array to run once on mount

 


  const handleToggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  const toggleDescription = () => {
    setIsDescriptionOpen((prevIsOpen) => !prevIsOpen);
    setIsReviewsOpen(false);
  };

  const toggleReviews = () => {
    setIsReviewsOpen((prevIsOpen) => !prevIsOpen);
    setIsDescriptionOpen(false);
  };



  const calculateDiscountPercent = () => {
    if (products.attributes?.is_on_sale && products.attributes?.old_price !== null) {
      const discountPercent = ((products.attributes?.old_price - products.attributes?.price) / products.attributes?.old_price) * 100;
      return isNaN(discountPercent) ? 0 : discountPercent.toFixed(0);
    }
    return 0;
  };
  

  const [isFilled, setIsFilled] = useState(false);

  const changebg = () => {
    setIsFilled((prevIsFilled) => !prevIsFilled);
  };

  const handleVolumeChange = (volume) => {
    setSelectedVolume(volume);
  };

  const getPriceForSelectedVolume = () => {
    if (selectedVolume === 0) {
      return products.attributes?.price;
    }
    const selectedVolumeOption = products.volume_option.find((option) => option.volume_ml === selectedVolume);
    if (selectedVolumeOption) {
      return selectedVolumeOption.price;
    }
    return products.price;
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const isNewPrice = (products) => products.attributes?.is_on_sale && products.attributes?.old_price !== null;



  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isProductInFavorite, setIsProductInFavorite] = useState(false)
  const [maxStock, setMaxStock] = useState(0); // Add state for max stock
  useEffect(() => {
    // Check if the product is already in the cart when the component mounts
    const productInCart = Array.isArray(data?.cart) && data.cart.some((item) => Object.keys(item)[0] === id);
    setIsProductInCart(productInCart);
    const productInFavorite = Array.isArray(data?.favorite) && data.favorite.some((item) => Object.keys(item)[0] === id);
    setIsProductInFavorite(productInFavorite);
  
    // Set max stock when the component mounts
    setMaxStock(products?.attributes?.stock || 0);
  }, [data, id, products?.attributes?.stock]);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const handlePostCartWithQuantity = (productId, quantity) => {
    const existingCart = Array.isArray(data?.cart) ? data.cart : [];

    // Check if the product is already in the cart
    const productInCart = existingCart.some((item) => Object.keys(item)[0] === productId);
    if (productInCart) {
      // Remove the product from the cart
      const updatedCart = existingCart.filter((item) => Object.keys(item)[0] !== productId);
      const field = {
        cart: updatedCart,
      };

      dispatch(postProductInCart(field));
    } else {
      // Add the product to the cart
      const field = {
        cart: [...existingCart, { [productId]: quantity }],
      };

      dispatch(postProductInCart(field));
    }

    setIsProductInCart(!productInCart); // Update state based on whether the product is in the cart
  };

  const handlePostFavorite = (productId) => {
    const existingFavorites = Array.isArray(data?.favorite) ? data.favorite : [];

    // Check if the product is already in the favorites
    const productInFavorites = existingFavorites.some(
      (item) => Object.keys(item)[0] === String(productId)
    );

    if (productInFavorites) {
      // Remove the product from the favorites
      const updatedFavorites = existingFavorites.filter(
        (item) => Object.keys(item)[0] !== String(productId)
      );
      const field = {
        favorite: updatedFavorites,
      };
      dispatch(postProductInFavorite(field));
    } else {
      // Add the product to the favorites
      const updatedFavorites = [...existingFavorites, { [productId]: 1 }];
      const field = {
        favorite: updatedFavorites,
      };
      dispatch(postProductInFavorite(field));
    }

    setIsProductInFavorite(!productInFavorites); // Update state based on whether the product is in the favorites
  };
  
  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      setQuantity(1);
    }
  };




  const calculateDisplayPrice = (product) => {
    const isOilPerfume = product.attributes?.category?.data?.attributes?.name === 'Маслянные духи';
  
    if (isNewPrice(product)) {
      return (
        <>
          <span className="text-[20px] text-gray-800 mt-2 mr-2">
            {parseFloat(product.attributes?.price).toFixed(2)} ₽ 
            {isOilPerfume && ' за 1 мл'}
          </span>
          <span className="text-[18px] text-gray-400 mt-2">
            <s>{parseFloat(product.attributes?.old_price).toFixed(2)} ₽</s>
          </span>
        </>
      );
    } else {
      return (
        <span className="text-[20px] text-gray-800 mt-2 mr-2">
          {parseFloat(product.attributes?.price).toFixed(2)} ₽
          {isOilPerfume && ' за 1 мл'}
        </span>
      );
    }
  };

  useEffect(() => {
    if (products && products.attributes?.image && products.attributes?.image.data) {
      setMainImage(`${process.env.REACT_APP_UPLOAD_URL}`+`${products.attributes?.image.data.attributes.url}`);
    }
  }, [products]);
  if (status === "loading") {
    
    return (
      <div className={styles.loader}>
        <PropagateLoader color="#000" />
      </div>
    );
  }
  if (!products) {
    return (
      <div>
        <h2>Товар не найден</h2>
      </div>
    );
  }

  return (
    <>
    <div className="container">
      <div className="row">
        
        <div className="info">
          <a href="/" className="mr-3">
            Home
          </a>
          <a href="">{products.attributes?.name}</a>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 flex">
          <div className="cart-imgs self-center">
          {products.attributes?.image2.data && products.attributes?.image2.data.length > 0 && (
                products.attributes?.image2.data.map((image, index) => (
                  <img
                    key={index}
                    src={`${process.env.REACT_APP_UPLOAD_URL}`+`${image.attributes?.url}`}
                    width={'150px'}
                    alt={`Product ${index}`}
                    className="thumbnail mb-2 rounded-lg"
                    onMouseOver={() => setMainImage(`${image.attributes.url}`)}
                  />
                ))
              )}
          </div>
          <div className="ml-10 self-center img max-w-[444px]">
          <img
              id="main-image"
              src={mainImage}
              className="rounded-lg"
              alt=""
            />          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <div className="name-perfume">
            <h1>{products.attributes?.name}</h1>
          </div>
          <div className="price flex mt-[53px]">
            {products.attributes?.is_on_sale ? (
              <>
                <p className="new_price mr-[12px]">{getPriceForSelectedVolume()}₽</p>
                <p className="sale_price">
                  <s>{products.attributes?.old_price}₽</s>
                </p>
                <p className="procent_number">{calculateDiscountPercent()}%</p>
              </>
            ) : (
              <p className="normal_price">{getPriceForSelectedVolume()} ₽</p>
            )}
          </div>
          <hr />
          <div className="sclad">
            
          </div>
          <div className="descp">
            <p>{products.attributes?.description}</p>

          </div>
          <hr />
          <div className="volume-select mt-5 mb-5">
          <p>
  {products?.attributes?.category?.data?.attributes?.name === 'Маслянные духи'
    ? `На складе ${products.attributes?.stock} мл`
    : `Кол-во на складе ${products.attributes?.stock} штук`}
</p>            <p>ID {products.attributes?.sclad_id}</p>
          </div>
          <hr />
          <div className="quantity mt-5 flex flex-wrap">
            {data ? (
              <>
{isProductInCart ? (
  <>
    <div className="add">
      <button onClick={() => handlePostCartWithQuantity(id, quantity)} disabled={quantity <= 0 || quantity > maxStock}>
        {isProductInCart ? 'Убрать из корзины' : 'Добавить в корзину'}
      </button>
    </div>
    <div className="heartt">
      <button className={`text-black text-3xl py-3 px-4 ${isProductInFavorite ? 'filled' : ''}`} onClick={() => handlePostFavorite(products.id)}>
        {isProductInFavorite ? <BsHeartFill /> : <BsHeart />}
      </button>
    </div>
  </>
) : (
  <>
    <div className="colich flex">
      <button className="px-[16px] text-2xl mr-5" onClick={handleDecrement}>
        -
      </button>
      <p className="text-2xl">{products.attributes?.category?.data?.attributes?.name === 'Маслянные духи' ? `${quantity} мл` : quantity}</p>
      <button className="px-[16px] text-2xl ml-5" onClick={handleIncrement}>
        +
      </button>
    </div>
    <div className="add">
      <button onClick={() => handlePostCartWithQuantity(id, quantity)} disabled={quantity <= 0 || quantity > maxStock}>
        {isProductInCart ? 'Убрать из корзины' : 'Добавить в корзину'}
      </button>
    </div>
    <div className="heartt">
      <button className={`text-black text-3xl py-3 px-4 ${isProductInFavorite ? 'filled' : ''}`} onClick={() => handlePostFavorite(products.id)}>
        {isProductInFavorite ? <BsHeartFill /> : <BsHeart />}
      </button>
    </div>
  </>
)}

</>
            ):
            <>
            <div className="colich flex">
            <button className="px-[16px] text-2xl mr-5" onClick={handleDecrement}>
              -
            </button>
            <p className="text-2xl">{quantity}</p>
            <button className="px-[16px] text-2xl ml-5" onClick={handleIncrement}>
              +
            </button>
          </div>
          <div className="add">
            <button onClick={() => navigate('/login')}>
              {isProductInCart ? 'Убрать из корзины' : 'Добавить в корзину'}
            </button>
          </div>
          <div className="heartt">
            <button className={`text-black text-3xl py-3 px-4 ${isProductInFavorite ? 'filled' : ''}`} onClick={() => navigate('/login')}>
              {isProductInFavorite ? <BsHeartFill /> : <BsHeart />}
            </button>
          </div>
          </>
            }
       
      </div>


        </div>
      </div>

        <div className="row">
          <h1 className='text-2xl  text-center pt-10 mb-5'>Похожие товары</h1>
          {all_products.map((products) => (
              (products.id!=id ? 
          <div key={products.id} className="max-w-sm cart col-xl-3 col-lg-3 col-md-6 col-sm-12 rounded-lg overflow-hidden">
            <Link to={`/products/${products.id}`}>

              <img
                src={`${ process.env.REACT_APP_UPLOAD_URL+products.attributes.image.data.attributes.url}`}
                alt={products.attributes.name}
                className="w-full max-h-[170px] object-contain object-center"
              />
            </Link>

            <div className="p-4">
              <h2 className="text-2xl font-semibold font-bold text-gray-800">{products.attributes.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{products.attributes.brand ? products.attributes.brand.name : ''}</p>
              <div className="flex">{calculateDisplayPrice(products)}</div>

              <div className="mt-2">

              </div>
            </div>
          </div>
             :<p></p> )
        ))}

          </div>
    </div>
  </>
  );
};

export default ProductDetails;
