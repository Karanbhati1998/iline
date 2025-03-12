import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const initialState = {
  viewCommision: [],
  totalRevenueList: [],
  ilineRevenueList: [],
  p2pRevenueList: [],
  driverPayout: [],
  paymentList: [],
  activePaymentTab: {
    totalRevenue: true,
    totalRevenuefromILineDriver: false,
    totalRevenuefromP2pDriver: false,
    totalPaymentfromP2pDriver: false,
    driverPayoutTab: false,
  },
  loading: false,
  error: null,
  totalRevenuePage: 1,
  totalRevenueIlinePage: 1,
  totalRevenueP2pPage: 1,
  driverPayoutPage:1
};

export const getViewCommision = createAsyncThunk(
  "get/viewCommision",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/viewCommision", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const addSetCommision = createAsyncThunk(
  "add/setCommision",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/setCommision", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const getTotalRevenueListDownload= createAsyncThunk(
  "get/totalRevenueListdownload",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/totalRevenueList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const getTotalRevenueList = createAsyncThunk(
  "get/totalRevenueList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/totalRevenueList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const getIlineRevenueListDownload = createAsyncThunk(
  "get/ilineRevenueListdownload",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/ilineRevenueList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const getIlineRevenueList = createAsyncThunk(
  "get/ilineRevenueList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/ilineRevenueList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const getP2pRevenueListDownload = createAsyncThunk(
  "get/p2pRevenueListDownload",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/p2pRevenueList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const getP2pRevenueList = createAsyncThunk(
  "get/p2pRevenueList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/p2pRevenueList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const getAllDriverPayout = createAsyncThunk(
  "get/driverAllPaymentList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/driverPaymentList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const getDriverPayout = createAsyncThunk(
  "get/driverPaymentList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/driverPaymentList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);
export const downloadPaymentList = createAsyncThunk(
  "get/downloadPaymentList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/downloadPaymentList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error); // Return error instead of just rejecting
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {
    activePaymentTabFunc: (state, action) => {
      state.activePaymentTab = action.payload;
    },
    handleTotalRevenuePage: (state, action) => {
      state.totalRevenuePage = action.payload;
    },
    handleTotalRevenueIlinePage: (state, action) => {
      state.totalRevenueIlinePage = action.payload;
    },
    handleTotalRevenueP2pPage: (state, action) => {
      state.totalRevenueP2pPage = action.payload;
    },
    handleDriverPayoutPage: (state, action) => {
      state.driverPayoutPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getViewCommision.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getViewCommision.fulfilled, (state, action) => {
      state.loading = false;
      state.viewCommision = action.payload;
    });
    builder.addCase(getViewCommision.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message; // Access the error message
    });
    builder.addCase(getTotalRevenueList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTotalRevenueList.fulfilled, (state, action) => {
      state.loading = false;
      state.totalRevenueList = action.payload;
    });
    builder.addCase(getTotalRevenueList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message; // Access the error message
    });
    builder.addCase(getIlineRevenueList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIlineRevenueList.fulfilled, (state, action) => {
      state.loading = false;
      state.ilineRevenueList = action.payload;
    });
    builder.addCase(getIlineRevenueList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message; // Access the error message
    });
    builder.addCase(getP2pRevenueList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getP2pRevenueList.fulfilled, (state, action) => {
      state.loading = false;
      state.p2pRevenueList = action.payload;
    });
    builder.addCase(getP2pRevenueList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message; // Access the error message
    });
    builder.addCase(getDriverPayout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDriverPayout.fulfilled, (state, action) => {
      state.loading = false;
      state.driverPayout = action.payload;
    });
    builder.addCase(getDriverPayout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message; // Access the error message
    });
    builder.addCase(downloadPaymentList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(downloadPaymentList.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentList = action.payload;
    });
    builder.addCase(downloadPaymentList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message; // Access the error message
    });
  },
});
export const {
  activePaymentTabFunc,
  handleTotalRevenuePage,
  handleTotalRevenueIlinePage,
  handleTotalRevenueP2pPage,
  handleDriverPayoutPage,
} = paymentSlice.actions;
export default paymentSlice.reducer;
