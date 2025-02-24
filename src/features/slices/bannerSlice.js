import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const initialState = {
  bannerList: [],
  loading: false,
  error: null,
};

export const getAllBannerList = createAsyncThunk(
  "get/allbannerList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/bannerList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const getBannerList = createAsyncThunk(
  "get/bannerList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/bannerList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

export const addBanner = createAsyncThunk(
  "add/banner",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addBanner", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

export const bannerStatus = createAsyncThunk(
  "status/banner",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/bannerStatus", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBannerList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBannerList.fulfilled, (state, action) => {
        state.loading = false;
        state.bannerList = action.payload;
      })
      .addCase(getBannerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Access the error message
      });
  },
});

export default bannerSlice.reducer;
