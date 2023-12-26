// orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api";
import { storeUser, userData } from "../../helper";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  orders: [], // Add the missing orders field
  status: "loading",
  error: null,
};

export const getOrders = createAsyncThunk("/getOrders", async () => {
  try {
    const { data } = await axios.get("/orders?populate=*");
    return data.data;
  } catch (error) {
    console.warn(error);
    alert(error);
    throw error; // Re-throw the error to mark the promise as rejected
  }
});

export const getOrdersId = createAsyncThunk("/getOrdersId", async () => {
  try {
    const {userId} = userData()
    const { data } = await axios.get(`/orders?filters[user]=${userId}&populate=*`);
    console.log(data)
    return data.data;
  } catch (error) {
    console.warn(error);
    alert(error);
    throw error; // Re-throw the error to mark the promise as rejected
  }
});

export const createOrder = createAsyncThunk("/createOrder", async (orderData) => {
    try {
      const { data } = await axios.post("/orders", orderData);
      return data.data;
    } catch (error) {
      console.warn(error);
      alert(error);
      throw error;
    }
  });

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(getOrders.pending, (state) => {
        state.orders = [];
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = "loaded";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.orders = [];
        state.status = "loading";
        state.error = action.payload;
      })

      .addCase(getOrdersId.pending, (state) => {
        state.orders = [];
        state.status = "loading";
      })
      .addCase(getOrdersId.fulfilled, (state, action) => { // Corrected from getComputedStyle to getOrdersId
        state.orders = action.payload;
        state.status = "loaded";
      })
      .addCase(getOrdersId.rejected, (state, action) => {
        state.orders = [];
        state.status = "loading";
        state.error = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        // Добавляем новый заказ в стейт после успешного создания на сервере
        const newOrder = action.payload;
        state.orders = [...state.orders, newOrder];
        state.status = "loaded";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orders = [];
        state.status = "loading";
        state.error = action.payload;
      });
      
  },
});

export default orderSlice.reducer;
