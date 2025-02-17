import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
const initialState = {
  ilineOrP2pVechileList: [],
  PendingVechileList: [],
  serviceBasedVehicleList: [],
  categoryWiseVehicleData: [],
  vehicleHistory: [],
  loading: false,
  error: null,
};
export const getAllIlineOrP2pVechileList = createAsyncThunk(
  "get/allilineOrP2pVechileList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/vehicleList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const getIlineOrP2pVechileList = createAsyncThunk(
  "get/ilineOrP2pVechileList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/vehicleList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const getVechileHistory = createAsyncThunk(
  "get/vehicleHistory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/vehicleHistory", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const addVechile = createAsyncThunk(
  "add/vechile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addVehicle", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const editVechile = createAsyncThunk(
  "edit/vechile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/editVehicle", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const vehicleStatus = createAsyncThunk(
  "vechile/status",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/vehicleStatus", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const getAllPendingVehicleList = createAsyncThunk(
  "get/allpendingVehicle",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/pendingVehicle", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const getPendingVehicleList = createAsyncThunk(
  "get/pendingVehicle",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/pendingVehicle", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const pendingVehicleStatus = createAsyncThunk(
  "pendingVechile/status",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/actionToVehicle", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const actionToService = createAsyncThunk(
  "actionToService/status",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/actionToService", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const getAllServiceBasedVehicleList = createAsyncThunk(
  "get/allserviceBasedVehicleList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/serviceBasedVehicleList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const getServiceBasedVehicleList = createAsyncThunk(
  "get/serviceBasedVehicleList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/serviceBasedVehicleList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const getCategoryWiseVehicleData = createAsyncThunk(
  "get/categoryWiseVehicleData",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/categoryWiseVehicleData", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const deleteVehicleHistory = createAsyncThunk(
  "delete/categoryWiseVehicleData",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        "/deleteVehicleHistory",
        payload
      );
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);

const vechileSlice = createSlice({
  name: "vechileCategory",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getIlineOrP2pVechileList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getIlineOrP2pVechileList.fulfilled, (state, action) => {
      state.loading = false;
      state.ilineOrP2pVechileList = action.payload;
    });
    builder.addCase(getIlineOrP2pVechileList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getPendingVehicleList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPendingVehicleList.fulfilled, (state, action) => {
      state.loading = false;
      state.PendingVechileList = action.payload;
    });
    builder.addCase(getPendingVehicleList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getServiceBasedVehicleList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getServiceBasedVehicleList.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceBasedVehicleList = action.payload;
    });
    builder.addCase(getServiceBasedVehicleList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getCategoryWiseVehicleData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCategoryWiseVehicleData.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryWiseVehicleData = action.payload;
    });
    builder.addCase(getCategoryWiseVehicleData.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getVechileHistory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getVechileHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.vehicleHistory = action.payload;
    });
    builder.addCase(getVechileHistory.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default vechileSlice.reducer;
