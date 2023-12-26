import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";
import catalogSlice from "./slice/catalogSlice";
import productSlice from "./slice/productSlice";
import orderSlise from "./slice/orderSlise";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productSlice,
    categories: catalogSlice,
    orders: orderSlise
  },
});
