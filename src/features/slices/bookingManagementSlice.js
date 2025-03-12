import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const initialState = {
  OngoingBookingList: [],
  scheduledBookingList: [],
  completedBookingList: [],
  canceledBookingList: [],
  activeBookingTab: {
    ongoing: true,
    scheduled: false,
    completed: false,
    canceled: false,
  },
  loading: false,
  error: null,
  ongoingPage: 1,
  completedPage: 1,
  canceledPage: 1,
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

export const getAllOngoingBookingList = createAsyncThunk(
  "get/AllOngoingBookingList",
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
export const getAllCompletedBookingList = createAsyncThunk(
  "get/AllcompletedBookingList",
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
export const getAllCanceledBookingList = createAsyncThunk(
  "get/allcanceledBookingList",
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
  reducers: {
    activeTabFunc: (state, action) => {
      state.activeBookingTab = action.payload;
    },
    handleOnGoingPage: (state, action) => {
      state.ongoingPage = action.payload;
    },
    handleCompletedPage: (state, action) => {
      state.completedPage = action.payload;
    },
    handleCanceledPage: (state, action) => {
      state.canceledPage = action.payload;
    },
  },
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
      });
  },
});
export const {
  activeTabFunc,
  handleOnGoingPage,
  handleCompletedPage,
  handleCanceledPage,
} = bookingManagementSlice.actions;
export default bookingManagementSlice.reducer;
