import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
export const getSupportTicketList = createAsyncThunk(
  "get/SupportTicket",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/ticketList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const ticketReply = createAsyncThunk(
  "ticketReply",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/ticketReply", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const previousChat = createAsyncThunk(
  "Reply/previousChat",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/chatList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const callRequestList = createAsyncThunk(
  "get/callRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/callRequestList", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const statusChangedCallRequest = createAsyncThunk(
  "statusChanged/CallRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/statusChangedCallRequest",
        payload
      );
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
export const callRequestCount = createAsyncThunk(
  "call/RequestCount",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/callRequestCount", {
        params: payload,
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
const supportTicketSlice = createSlice({
  name: "supportTicket",
  initialState: {
    supportTickets: [],
    chat:[],
    callRequestData:[],
    count:0,
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getSupportTicketList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSupportTicketList.fulfilled, (state, action) => {
      state.loading = false;
      state.supportTickets = action.payload;
    });
    builder.addCase(getSupportTicketList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(previousChat.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(previousChat.fulfilled, (state, action) => {
      state.loading = false;
      state.chat = action.payload;
    });
    builder.addCase(previousChat.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(callRequestCount.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(callRequestCount.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload;
    });
    builder.addCase(callRequestCount.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(callRequestList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(callRequestList.fulfilled, (state, action) => {
      state.loading = false;
      state.callRequestData = action.payload;
    });
    builder.addCase(callRequestList.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default supportTicketSlice.reducer;
