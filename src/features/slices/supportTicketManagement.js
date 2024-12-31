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
const supportTicketSlice = createSlice({
  name: "supportTicket",
  initialState: {
    supportTickets: [],
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
  },
});

export default supportTicketSlice.reducer;
