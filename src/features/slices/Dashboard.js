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
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    earlyAccesData: [],
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
      });
  },
});

export default dashboardSlice.reducer;