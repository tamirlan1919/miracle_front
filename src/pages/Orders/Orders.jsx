import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { authMe } from "../../redux/slice/authSlice";
import { getOrdersId } from "../../redux/slice/orderSlise"; // Corrected from orderSlise to orderSlice
import styles from "./order.module.scss";
import image from "./image.png";
import "./order.css";
import { IoMdCheckmark, IoMdClose, IoMdPaperPlane, IoMdWallet } from "react-icons/io";
import { getProducts } from "../../redux/slice/productSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  const { products, status } = useSelector((state) => state.products);
  const { orders,  } = useSelector((state) => state.orders); // Corrected from state.orders to state.order
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authMe());
    dispatch(getProducts());
    dispatch(getOrdersId());
  }, [dispatch]);

  if (status == "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <PropagateLoader color="#000" />
      </div>
    );
  }

  if (!orders) {
    return (
      <div>
        <h2>Товар не найден</h2>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className="uppercase mb-10">Заказы</h1>
      <div className="container">
        {orders.length > 0 ? (
          <div className="row">
            {orders?.map(({ attributes, id, values }) => (
              <div
                key={id}
                className="order-info p-3 col-xl-12 col-lg-12 col-md-12 col-sm-12 rounded-lg overflow-hidden mb-3"
              >
                <div className="flex">
                  <h2 className="mb-2 mr-10">Заказ от {formatDate(attributes?.createdAt)}</h2>
                  <p className="text-[15px] text-[#028103] font-bold  mb-2">ID: {id}</p>
                </div>
                <div className="flex">
                  <p className="text-gray-500 text-[30px] font-bold mr-10">{attributes.total_price} ₽</p>
                  <p className="">{renderStatusWithIcon(attributes.status)}</p>
                </div>

                <div className="">
   

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty_cart}>
            <img src={image} alt="" />
            <div className={styles.empty_title}>
              <span>Тут ничего нет</span>
              <button onClick={() => navigate("/")}>ПЕРЕЙТИ К ПОКУПКАМ</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const renderStatusWithIcon = (status) => {
  let icon;
  let color;
  let text;

  switch (status) {
    case "оплачен":
      icon = <IoMdCheckmark />;
      text = "Оплачен";
      color = "#008000";
      break;
    case "отменен":
      icon = <IoMdClose />;
      text = "Отменен";
      color = "#FF0000";
      break;
    case "в пути":
      icon = <IoMdPaperPlane />;
      text = "В пути";
      color = "#0000FF";
      break;
    case "не оплачен":
      icon = <IoMdWallet />;
      text = "Не оплачен";
      color = "#FFA500";
      break;
    default:
      icon = null;
      text = null;
      color = "#000";
  }

  return (
    <>
      <div style={{ color }} className={`flex self-middle text-[${color}] p-1 `}>
        <p>{text}</p>
        <p className=" mt-1 ml-3">{icon}</p>
      </div>
    </>
  );
};

export default Orders;
