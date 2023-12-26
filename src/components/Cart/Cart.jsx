import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authMe, postProductInCart, postProductInFavorite, deleteProductInCart, postOrder } from "../../redux/slice/authSlice";
import { getProducts } from "../../redux/slice/productSlice";
import { PropagateLoader } from "react-spinners";
import { FaHeart } from 'react-icons/fa';
import { MdOutlineDelete } from "react-icons/md";
import styles from './cart.module.scss'
import image from './free-icon-perfume-1271436.png';
import { useNavigate } from "react-router-dom";
import { userData } from "../../helper";
import { IoIosClose } from "react-icons/io";
import { CButton, COffcanvas, COffcanvasHeader, COffcanvasTitle, CCloseButton, COffcanvasBody } from '@coreui/react';
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrder } from "../../redux/slice/orderSlise";

const Cart = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    const cartData = data?.cart.map(item => ({
      id: Object.keys(item)[0],
      quantity: item[Object.keys(item)[0]]
    }));

    const handleOrderSuccess = async () => {
      setIsModalOpen(false);
    
      // Clear the cart (dispatch an action to update the cart state)
      const field = {
        cart: [],
      };
      dispatch(postProductInCart(field));
      
      // Prepare data for the order
      const orderData = {
        data:{
        total_price: Math.floor(totalPrice),
        status: "не оплачен", // Здесь вы можете установить нужный вам статус
        user: data.id,
        products: cart.map(item => item.id),
        values: {
          products: cartData
        }
      }
      }
     
      
      try {
        // Dispatch the action to create an order
        dispatch(createOrder(orderData));
    
        // Notify the user about the successful order
        toast.success("Заказ успешно оформлен!", {
          position: toast.POSITION.TOP_RIGHT,
        });
    
        // Trigger the callback function provided by the parent component
        setIsOrderPlaced(true);
      } catch (error) {
        console.error("Error creating order:", error);
        toast.error("Произошла ошибка при оформлении заказа", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
  
 
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
  const totalPrice =
  Array.isArray(cart) &&
  cart?.reduce(function (sum, current) {
    const quantity = getProductQuantity(current.id); // Get the quantity for the current item
    return sum + quantity * current.attributes.price;
  }, 0);

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
    <>
          <div className="mb-4"><h1 className={styles.carttt}>КОРЗИНА</h1></div>

    <div className="container mt-5 min-h-[90vh]">
      {cart?.length > 0 ? (
        <div className="row">
          <div className="col-md-8">
            {cart?.map(({ attributes, id }) => (
              <div key={id} className="mb-3 card">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`${attributes?.image.data.attributes.formats.thumbnail.url}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="card-title">{attributes.name}</div>
                      <div className="mb-1">{attributes.price} ₽</div>
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
                <div className="mb-1">Стоимость заказа: {Math.floor(totalPrice)} ₽</div>
                <div className="mb-1">Доставка: БЕСПЛАТНО</div>
                <hr />
                <div className="fw-bold">ИТОГО: {Math.floor(totalPrice)} ₽</div>
                <button className="bg-black text-white px-5 py-1  mt-3 hover:bg-gray-500" onClick={openModal}>
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

<COffcanvas
        placement="end"
        className="text-black"
        scroll={true}
        visible={isModalOpen}
        onHide={() => setIsModalOpen(false)}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>Miracle</COffcanvasTitle>
          <button className="text-3xl" onClick={() => setIsModalOpen(false)}>
            <IoIosClose />
          </button>
        </COffcanvasHeader>
        <COffcanvasBody>
          <CheckoutForm totalPrice={Math.floor(totalPrice)} onOrderSuccess={handleOrderSuccess} />
        </COffcanvasBody>
      </COffcanvas>
      {isOrderPlaced && (
        <>
        <ToastContainer autoClose={3000} hideProgressBar />
        
        </>
      )}
    </div>

</>


  );
      }

export default Cart;
