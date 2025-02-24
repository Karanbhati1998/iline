import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
export const getEarlyAccesData = createAsyncThunk("get/getEarlyAccessData",async(payload,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get("getAllWebsiteData",{
            params:payload
        });
        return response.data;
    } catch (error) {
        rejectWithValue(error.message);
    }
});
export const getDashboardData = createAsyncThunk(
  "get/DashboardData",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("count", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    earlyAccesData: [],
    dashboardData:[],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEarlyAccesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEarlyAccesData.fulfilled, (state, action) => {
        state.loading = false;
        state.earlyAccesData = action.payload;
      })
      .addCase(getEarlyAccesData.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
      })
  },
});

export default dashboardSlice.reducer;