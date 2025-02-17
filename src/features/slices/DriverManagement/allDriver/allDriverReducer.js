import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosInstance";
import axios from "axios";
const initialState = {
  iLineDriverList: [],
  p2pDriverList: [],
  vehicleListForAssign: [],
  allDriverData: [],
  driverRequestList:[],
  driverVehicleHistory:[],
  rejectDriverList:[],
  driverCount:[],
  loading: false,
};
export const fetchAllDriverList = createAsyncThunk(
  "get/AllDriverList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/driverList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);
export const fetchRejectDriverList = createAsyncThunk(
  "get/rejectDriverList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/rejectDriverList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);
export const fetchAllILineDriverList= createAsyncThunk(
  "get/alliLineDriverList",
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
export const fetchDriverVehicleHistory = createAsyncThunk(
  "get/driverVehicleHistory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/driverVehicleHistory", {
        params: payload,
      });
      console.log({ response });
      
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);
export const fetchAllP2pDriverList = createAsyncThunk(
  "get/allp2pDriverList",
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
      const response = await axiosInstance.put(`/driverStatus`, payload);
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
export const getVehicleListForAssign = createAsyncThunk(
  "get/vehicleListForAssign",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/vehicleListForAssign", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);
export const assignVehicleToDriver = createAsyncThunk(
  "assign/VehicleToDriver",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/assignVehicleToDriver",
        payload
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);
export const getDriverRequestList = createAsyncThunk(
  "assign/driverRequestList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/driverRequestList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);
export const getDriverCount = createAsyncThunk(
  "get/driverCount",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/driverCount", {
        params: payload,
      });
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
    builder.addCase(getVehicleListForAssign.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getVehicleListForAssign.fulfilled, (state, action) => {
      state.loading = false;
      state.vehicleListForAssign = action.payload;
    });
    builder.addCase(getVehicleListForAssign.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchAllDriverList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllDriverList.fulfilled, (state, action) => {
      state.loading = false;
      state.allDriverData = action.payload;
    });
    builder.addCase(fetchAllDriverList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getDriverRequestList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDriverRequestList.fulfilled, (state, action) => {
      state.loading = false;
      state.driverRequestList = action.payload;
    });
    builder.addCase(getDriverRequestList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchDriverVehicleHistory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDriverVehicleHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.driverVehicleHistory = action.payload;
    });
    builder.addCase(fetchDriverVehicleHistory.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchRejectDriverList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchRejectDriverList.fulfilled, (state, action) => {
      state.loading = false;
      state.rejectDriverList = action.payload;
    });
    builder.addCase(fetchRejectDriverList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getDriverCount.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDriverCount.fulfilled, (state, action) => {
      state.loading = false;
      state.driverCount = action.payload;
    });
    builder.addCase(getDriverCount.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default allDriver.reducer;
