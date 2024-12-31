import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";
import axios from "axios";
const initialState = {
  iLineDriverList: [],
  p2pDriverList: [],
  loading: false,
};
export const fetchILineDriverList = createAsyncThunk(
  "get/iLineDriverList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/iLineDriverList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);
export const fetchP2pDriverList = createAsyncThunk(
  "get/p2pDriverList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/p2pDriverList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);
export const driverStatus = createAsyncThunk(
  "update/driveStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/driverStatus`,
        payload
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);

export const addNewDriver = createAsyncThunk(
  "add/newDriver",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addDriver", payload);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);
const allDriver = createSlice({
  name: "allDriver",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchILineDriverList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchILineDriverList.fulfilled, (state, action) => {
      state.loading = false;
      state.iLineDriverList = action.payload;
    });
    builder.addCase(fetchILineDriverList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchP2pDriverList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchP2pDriverList.fulfilled, (state, action) => {
      state.loading = false;
      state.p2pDriverList = action.payload;
    });
    builder.addCase(fetchP2pDriverList.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default allDriver.reducer;
