import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
const initialState = {
  supportContent: {},
  faq: {},
  loading: false,
};
export const getStaticContent = createAsyncThunk(
  "get/SupportContent",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "http://15.206.16.230:4100/api/v1/static/get-static-content",
        {
          params: payload,
        }
      );
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const editStaticContent = createAsyncThunk(
  "edit/SupportContent",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "http://15.206.16.230:4100/api/v1/static/edit-static-content",
        payload
      );
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const getFaq = createAsyncThunk(
  "get/Faq",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/faqList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const addFaq = createAsyncThunk(
  "add/Faq",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addFaq", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const editFaq = createAsyncThunk(
  "edit/Faq",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/editFaq", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const deleteFaq = createAsyncThunk(
  "delete/Faq",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/deleteFaq", {
        data: payload, 
      });
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const contentManagement = createSlice({
  name: "contentManagement",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getStaticContent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getStaticContent.fulfilled, (state, action) => {
      state.loading = false;
      state.supportContent = action.payload;
    });
    builder.addCase(getStaticContent.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getFaq.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFaq.fulfilled, (state, action) => {
      state.loading = false;
      state.faq = action.payload;
    });
    builder.addCase(getFaq.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default contentManagement.reducer;
