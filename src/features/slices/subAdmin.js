import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const initialState = {
  subAdmin: [],
  role:[],
  loading: false,
  error: null,
};

export const getSubAdminList = createAsyncThunk(
  "get/suaAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/subAdminList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

export const addSubAdmin = createAsyncThunk(
  "add/subAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addSubadmin", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

export const subAdminStatus = createAsyncThunk(
  "status/subAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/subAdminStatus", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const editSubAdmin = createAsyncThunk(
  "edit/subAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/subAdminEdit", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);


export const getRoleList = createAsyncThunk(
  "get/role",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/roleList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

export const addRole = createAsyncThunk(
  "add/role",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addRole", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

export const roleStatus = createAsyncThunk(
  "status/role",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/roleStatus", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const editRole = createAsyncThunk(
  "edit/role",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/roleEdit", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

const subAdminSlice = createSlice({
  name: "subAdmin",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getSubAdminList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getSubAdminList.fulfilled, (state, action) => {
        state.loading = false;
        state.subAdmin = action.payload;
      });
      builder.addCase(getSubAdminList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Access the error message
      });
      builder.addCase(getRoleList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getRoleList.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      });
      builder.addCase(getRoleList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Access the error message
      });
  },
});

export default subAdminSlice.reducer;
