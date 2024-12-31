import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { toastService } from "../../utils/toastify";
const initialState = {
  adminData:{},
  loading:false
};
export const adminLogin=createAsyncThunk("admin/login",async(payload,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post("./adminLogin", payload);
          if (response?.data?.code == 200) {
            localStorage.setItem("ilineLogin", JSON.stringify(response?.data));
            toastService.success(response?.data?.message);
            return response.data;
          } else {
            toastService.error(response?.data?.message);
            return rejectWithValue(response?.data);
          }
    } catch (error) {
        toastService.error(error?.response?.data?.message);
        rejectWithValue(error);
    }
})
export const sentEmail = createAsyncThunk(
  "admin/sentEmail",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("./sentEmail", payload);
      return response.data;
    } catch (error) {
      toastService.error(error?.response?.data?.message);
      rejectWithValue(error);
    }
  }
);
export const otpVerify = createAsyncThunk(
  "admin/otpVerify",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("./otpVerify", payload);
      return response.data;
    } catch (error) {
      toastService.error(error?.response?.data?.message);
      rejectWithValue(error);
    }
  }
);
const authReducer = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers:(builder)=>{
    builder
     .addCase(adminLogin.pending, (state, action) => {
        state.loading = true;
      })
     .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminData = action.payload;
      })
     .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default authReducer.reducer;