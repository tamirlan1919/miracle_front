import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authMe, postProductInCart, postProductInFavorite, deleteProductInCart } from "../../redux/slice/authSlice";
import { getProducts } from "../../redux/slice/productSlice";
import { PropagateLoader } from "react-spinners";
import { FaHeart } from 'react-icons/fa';
import { MdOutlineDelete } from "react-icons/md";
import styles from './cart.module.scss'
import image from './free-icon-perfume-1271436.png';
import { useNavigate } from "react-router-dom";
import { userData } from "../../helper";

const Cart = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const {jwt} = userData()
  React.useEffect(() => {
    dispatch(authMe());
    dispatch(getProducts());
  }, []);

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <PropagateLoader color="#000" />
      </div>
    );
  }

  const cart =
    Array.isArray(products) &&
    products?.filter((product) =>
      data?.cart?.some((cartItem) => Object.keys(cartItem)[0] === String(product.id))
    );

    console.log(data)
  const totalPrice =
    Array.isArray(cart) &&
    cart?.reduce(function (sum, current) {
      return sum + current.attributes.price;
    }, 0);

  const isProductInFavorites = (productId) => {
    return Array.isArray(data?.favorite) && data.favorite.some((item) => Object.keys(item)[0] === String(productId));
  };

  const handleToggleFavorite = (productId) => {
    const existingFavorites = Array.isArray(data?.favorite) ? data.favorite : [];

    const productInFavorites = isProductInFavorites(productId);

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

  const deleteProductCart = (productId) => {
    const field = {
      cart: [...data?.cart.filter((cart) => cart.productId !== productId)],
    };
    dispatch(deleteProductInCart(field));
  };

  const setProductQuantity = (productId, newQuantity) => {
    const updatedCart = data?.cart.map((cartItem) => {
      const itemId = Object.keys(cartItem)[0];
      if (itemId === String(productId)) {
        return { [itemId]: newQuantity };
      }
      return cartItem;
    });

    const field = {
      cart: updatedCart,
    };

    dispatch(postProductInCart(field));
  };
  const getProductQuantity = (productId) => {
    const cartItem = data?.cart.find((item) => Object.keys(item)[0] === String(productId));
    return cartItem ? cartItem[productId] : 0;
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



  };
  return (
    <div className="container mt-5">
      <div className="mb-4"><h1>КОРЗИНА</h1></div>
      {cart?.length > 0 ? (
        <div className="row">
          <div className="col-md-8">
            {cart?.map(({ attributes, id }) => (
              <div key={id} className="mb-3 card">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_UPLOAD_URL + attributes?.image.data.attributes.formats.thumbnail.url}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="card-title">{attributes.name}</div>
                      <div className="mb-1">$ {attributes.price}</div>
                      <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                          <button
                            className="btn btn-outline-secondary me-2"
                            onClick={() => setProductQuantity(id, Math.max(getProductQuantity(id) - 1, 1))}
                          >
                            -
                          </button>
                          <p className="mb-0 text-2xl ">{getProductQuantity(id)}</p>
                          <button
                            className="btn btn-outline-secondary ms-2"
                            onClick={() => setProductQuantity(id, getProductQuantity(id) + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button className="text-3xl px-3" onClick={() => handleAddToCart(id)}>
                          <MdOutlineDelete className="hover:text-black"/>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Итог</div>
                <div className="mb-1">Стоимость заказа: $ {Math.floor(totalPrice)}</div>
                <div className="mb-1">Доставка: БЕСПЛАТНО</div>
                <hr />
                <div className="fw-bold">ИТОГО: {Math.floor(totalPrice)} ₽</div>
                <button className="bg-black text-white px-5 py-1  mt-3 hover:bg-gray-500">
                  ПРОДОЛЖИТЬ ОФОРМЛЕНИЕ ЗАКАЗА
                </button>
              </div>
            </div>
            {!jwt && (
              <div className="mt-4 text-center">
                <p>Войдите в систему, чтобы оформить заказ!</p>
                <button className="btn btn-outline-dark" onClick={() => navigate("/")}>
                  ВОЙТИ
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.empty_cart}>
        <img src={image} alt="" className="max-w-[200px]" />
        <div className={styles.empty_title}>
          <span>Корзина пуста</span>
          <button onClick={() => navigate('/')}>ПЕРЕЙТИ К ПОКУПКАМ</button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Cart;
