import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api";

const initialState = {
  products: null,
  status: "loading",
  error: null,
};

export const getProducts = createAsyncThunk("/getProducts", async () => {
  try {
    const { data } = await axios.get("/products?populate=*&pagination[page]=1&pagination[pageSize]=99999");
    return data.data;
  } catch (error) {
    console.warn(error);
    alert(error);
  }
});

export const getBrands = createAsyncThunk("/getBrands", async () => {
  try {
    const { data } = await axios.get("/brands?populate=*&pagination[page]=1&pagination[pageSize]=99999");
    return data.data;
  } catch (error) {
    console.warn(error);
    alert(error);
  }
});

export const getCategories = createAsyncThunk("/getCategories", async () => {
  try {
    const { data } = await axios.get("/categories?populate=*pagination[page]=1&pagination[pageSize]=99999");
    return data.data;
  } catch (error) {
    console.warn(error);
    alert(error);
  }
});

export const getProductId = createAsyncThunk("/getProductId", async (id) => {
  try {
    const { data } = await axios.get(`/products/${id}?populate=*`);
    return data.data;
  } catch (error) {
    console.warn(error);
    alert(error);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.products = [];
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "loaded";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = [];
        state.status = "loading";
        state.error = action.payload;
      })

      .addCase(getBrands.pending, (state) => {
        state.brands = [];
        state.status = "loading";
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "loaded";
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.brands = [];
        state.status = "loading";
        state.error = action.payload;
      })

      .addCase(getCategories.pending, (state) => {
        state.categories = [];
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "loaded";
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categories = [];
        state.status = "loading";
        state.error = action.payload;
      })
      .addCase(getProductId.pending, (state) => {
        state.products = [];
        state.status = "loading";
      })
      .addCase(getProductId.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "loaded";
      })
      .addCase(getProductId.rejected, (state, action) => {
        state.products = [];
        state.status = "loading";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;