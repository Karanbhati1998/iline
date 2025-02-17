import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const initialState = {
  notification: [],
  sosList: [],
  loading: false,
  error: null,
};

export const getAllNotificationList = createAsyncThunk(
  "get/allnotification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/notificationList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const getNotificationList = createAsyncThunk(
  "get/notification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/notificationList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

export const addNotification = createAsyncThunk(
  "add/Notification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addNotification", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

export const editNotification = createAsyncThunk(
  "edit/Notification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/editNotification", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const resendNotification = createAsyncThunk(
  "resend/Notification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/resendNotification", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const deleteNotification = createAsyncThunk(
  "delete/Notification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/deleteNotification", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const getSosNotificationList = createAsyncThunk(
  "get/sosnotification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/sosList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotificationList.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
      })
      .addCase(getNotificationList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Access the error message
      })
      .addCase(getSosNotificationList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSosNotificationList.fulfilled, (state, action) => {
        state.loading = false;
        state.sosList = action.payload;
      })
      .addCase(getSosNotificationList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Access the error message
      });
  },
});

export default notificationSlice.reducer;
