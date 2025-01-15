import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const initialState = {
  blog: [],
  loading: false,
  error: null,
};

export const getBlogList = createAsyncThunk(
  "get/blogList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/blogList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

export const addBlog = createAsyncThunk(
  "add/blog",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addblog", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

export const blogStatus = createAsyncThunk(
  "status/blog",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/blogStatus", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const editBlog = createAsyncThunk(
  "edit/blog",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/editBlog", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBlogList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogList.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(getBlogList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Access the error message
      });
  },
});

export default blogSlice.reducer;
