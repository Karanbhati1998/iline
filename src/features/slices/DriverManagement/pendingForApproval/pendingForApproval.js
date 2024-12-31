import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../../axiosInstance";
const initialState = {
  pendingForApprovalList: [],
    loading:false
};
export const fetchPendingForApproval = createAsyncThunk("get/pendingForApprovalList",async(payload,{rejectWithValue})=>{
try {
    const response = await axiosInstance.get("pendingDriverList",{
        params:payload
    });
    return response.data;
} catch (error) {
    console.log({error});
    rejectWithValue(error)
    
}
});
export const rejectAndAcceptOfPendngForApproval = createAsyncThunk(
  "update/actionToRejectAndAccept",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("actionToRejectAndAccept", payload);
      return response.data;
    } catch (error) {
      console.log({ error });
      rejectWithValue(error);
    }
  }
);
const pendngForApproval = createSlice({
  name: "pendingForApproval",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPendingForApproval.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPendingForApproval.fulfilled, (state, action) => {
        state.pendingForApprovalList=action.payload;
       state.loading = false;
    });
    builder.addCase(fetchPendingForApproval.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default pendngForApproval.reducer;