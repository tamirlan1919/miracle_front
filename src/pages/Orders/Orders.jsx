// Orders.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getProducts } from "../../redux/slice/productSlice";
import { PropagateLoader } from "react-spinners";
import { authMe } from "../../redux/slice/authSlice";
import { userData } from "../../helper";
import styles from './order.module.scss';
import image from './image.png';

const Orders = () => {
    const dispatch = useDispatch();
    const { data, status } = useSelector((state) => state.auth);
    const { products } = useSelector((state) => state.products);
    const navigate = useNavigate();

    const {jwt} = userData()
    React.useEffect(() => {
      dispatch(authMe());
      dispatch(getProducts());
    }, []);


  const order =
    Array.isArray(products) &&
    products?.filter((product) =>
      data?.order?.some((orderItem) => Object.keys(orderItem)[0] === String(product.id))
    );
    if (status === "loading") {
        return (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <PropagateLoader color="#000" />
          </div>
        );
      }
 
  return (
    <div className={styles.wrapper}>
      <h1>Заказы</h1>
      <div className="container">
        {order.length > 0 ? (
          <div className="row">
            {Array.isArray(order) &&
              order?.map(({ attributes, id }) => (
                <div
                  key={id}
                  className="max-w-sm cart col-xl-3 col-lg-4 col-md-6 col-sm-12 rounded-lg overflow-hidden"
                >
  
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

export default Orders;
