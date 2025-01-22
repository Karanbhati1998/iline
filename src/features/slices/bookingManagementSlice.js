import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const initialState = {
  OngoingBookingList: [],
  scheduledBookingList: [],
  completedBookingList: [],
  canceledBookingList: [],
  loading: false,
  error: null,
};

export const getOngoingBookingList = createAsyncThunk(
  "get/OngoingBookingList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/ongoingRequestList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); 
    }
  }
);
export const getScheduledBookingList = createAsyncThunk(
  "get/scheduledBookingList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/sheduledRequestList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
);
export const getCompletedBookingList = createAsyncThunk(
  "get/completedBookingList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/completedRequestList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
);
export const getCanceledBookingList = createAsyncThunk(
  "get/canceledBookingList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cancelledRequestList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
);



export const ongoingBookingStatus = createAsyncThunk(
  "status/ongoingBooking",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/bannerStatus", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); 
    }
  }
);

const bookingManagementSlice = createSlice({
  name: "BookingManagement",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOngoingBookingList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOngoingBookingList.fulfilled, (state, action) => {
        state.loading = false;
        state.OngoingBookingList = action.payload;
      })
      .addCase(getOngoingBookingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Access the error message
      })
      .addCase(getScheduledBookingList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getScheduledBookingList.fulfilled, (state, action) => {
        state.loading = false;
        state.scheduledBookingList = action.payload;
      })
      .addCase(getScheduledBookingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Access the error message
      })
      .addCase(getCompletedBookingList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompletedBookingList.fulfilled, (state, action) => {
        state.loading = false;
        state.completedBookingList = action.payload;
      })
      .addCase(getCompletedBookingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Access the error message
      })
      .addCase(getCanceledBookingList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCanceledBookingList.fulfilled, (state, action) => {
        state.loading = false;
        state.canceledBookingList = action.payload;
      })
      .addCase(getCanceledBookingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Access the error message
      })
  },
});

export default bookingManagementSlice.reducer;
