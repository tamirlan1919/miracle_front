// Orders.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder } from "../../redux/slice/authSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log(orders)
 
  return (
    <div>
      <h2>Your Orders</h2>
      {orders?.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Total Price: {order.total_price}</p>
          <button onClick={() => handleDeleteOrder(order.id)}>Delete Order</button>
        </div>
      ))}
    </div>
  );
};

export default Orders;
