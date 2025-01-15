import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
const initialState = {
  VechileCategories: [],
  VechileFeatures: [],
  VechileOffers: [],
  loading: false,
  error: null,
};
export const getVechileCategory = createAsyncThunk(
  "get/categoryList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/categoryList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const addVechileCategory = createAsyncThunk(
  "add/category",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addVehicleCategory", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const editVechileCategory = createAsyncThunk(
  "edit/category",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/editVehicleCategory",
        payload
      );
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const vehicleCategoryStatus = createAsyncThunk(
  "vechile/categoryStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/vehicleCategoryStatus",
        payload
      );
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const getFeaturesList = createAsyncThunk(
  "get/featuresList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/featuresList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const addFeature = createAsyncThunk(
  "add/feature",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addFeatures", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const editFeature = createAsyncThunk(
  "edit/feature",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/editFeatures", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const deleteFeature = createAsyncThunk(
  "delete/feature",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/deleteFeatures",{
        data:payload
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const getOffersList = createAsyncThunk(
  "get/offersList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/offerList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const addOffer = createAsyncThunk(
  "add/offer",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addOffer", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const editOffer = createAsyncThunk(
  "edit/offer",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/editOffer", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const deleteOffer = createAsyncThunk(
  "delete/offer",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/deleteOffer", {
        data: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
const vechileCategorySlice = createSlice({
  name: "vechileCategory",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getVechileCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getVechileCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.VechileCategories = action.payload;
    });
    builder.addCase(getVechileCategory.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getFeaturesList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFeaturesList.fulfilled, (state, action) => {
      state.loading = false;
      state.VechileFeatures = action.payload;
    });
    builder.addCase(getFeaturesList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getOffersList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOffersList.fulfilled, (state, action) => {
      state.loading = false;
      state.VechileOffers = action.payload;
    });
    builder.addCase(getOffersList.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default vechileCategorySlice.reducer;
