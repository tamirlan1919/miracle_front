import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api";
import { storeUser, userData } from "../../helper";

const initialState = {
  data: null,
  error: null,
  status: "loading",
};

export const login = createAsyncThunk("/login", async (params) => {
  try {
    const { data } = await axios.post("/auth/local?populate=*", params);
    if (data.jwt) {
      storeUser(data);
    }
    return data;
  } catch (error) {
    console.warn({
      error: error?.message,
    });
    
  }
});

export const regist = createAsyncThunk("/register", async (params) => {
  try {
    const { data } = await axios.post("/auth/local/register", params);
    if (data.jwt) {
      storeUser(data);
    }
    
    return data;
  } catch (error) {
    
    console.warn({
      error: error?.message,
    });
    return 'error'
  }
});

export const authMe = createAsyncThunk("/authMe", async () => {
  const { jwt } = userData();
  try {
    const { data } = await axios.get("/users/me?populate=*", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  } catch (error) {
    console.warn({
      error: error?.message,
    });
    
  }
});

export const deleteProductInFavorite = createAsyncThunk(
  "/delete/favorite",
  async (field) => {
    const { userId } = userData();
    try {
      const { data } = await axios.put(`/users/${userId}`, field);
      return data?.favorite;
    } catch (error) {
      console.warn(error);
      alert(error);
    }
  }
);

export const deleteProductInCart = createAsyncThunk(
  "/delete/cart",
  async (field) => {
    const { userId } = userData();
    try {
      const { data } = await axios.put(`/users/${userId}`, field);
      return data?.cart;
    } catch (error) {
      console.warn(error);
      alert(error);
    }
  }
);

export const postProductInCart = createAsyncThunk(
  "/post/cart",
  async (field) => {
    const { userId } = userData();
    try {
      const { data } = await axios.put(`/users/${userId}`, field);
      return data?.cart;
    } catch (error) {
      console.warn(error);
      alert(error);
    }
  }
);
export const postProductInFavorite = createAsyncThunk(
  "/post/favorite",
  async (field) => {
    const { userId } = userData();
    try {
      const { data } = await axios.put(`/users/${userId}`, field);
      return data?.favorite;
    } catch (error) {
      console.warn(error);
      alert(error);
      throw error; // Make sure to rethrow the error to propagate it up
    }
  }
);


export const updateProfile = createAsyncThunk("/updateProfile", async (formData) => {
  const { userId } = userData();
  try {
    const { data } = await axios.put(`/users/${userId}`, formData);
    return data;
  } catch (error) {
    console.warn({
      error: error?.message,
    });
    alert(error);
    throw error; // Rethrow the error to propagate it up
  }
});

export const postOrder = createAsyncThunk(
  "/post/order",
  async (field) => {
    const { userId } = userData();
    try {
      const { data } = await axios.put(`/users/${userId}`, field);
      console.log(data)
      return data?.order;
    } catch (error) {
      console.warn(error);
      alert(error);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(login.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "loading";
      })

      .addCase(regist.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(regist.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(regist.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "loading";
      })

      .addCase(authMe.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(authMe.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "loading";
      })

      .addCase(deleteProductInFavorite.fulfilled, (state, action) => {
        state.data.favorite = action.payload;
      })

      .addCase(deleteProductInCart.fulfilled, (state, action) => {
        state.data.cart = action.payload;
      })

      .addCase(postProductInCart.fulfilled, (state, action) => {
        state.data.cart = action.payload;
      })

      .addCase(postProductInFavorite.fulfilled, (state, action) => {
        state.data.favorite = action.payload;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.data.order = action.payload;
      });
      
  },
});

export const selectAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
