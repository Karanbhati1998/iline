import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
const initialState={
    users:[],
    loading: false,
}
export const userList=createAsyncThunk("get/userlist",async(payload,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get("/userList",{
            params:payload
        })
        return response.data
    } catch (error) {
        rejectWithValue(error)
        console.log({error});
        
    }
})
export const userStatus = createAsyncThunk(
  
  "update/userStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/userStatus",payload);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);
export const setPassword = createAsyncThunk(
  "update/userStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/setPassword", payload);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      console.log({ error });
    }
  }
);
const userManagement=createSlice({
    name: "userManagement",
    initialState: initialState,
    extraReducers:(builder)=>{
        builder.addCase(userList.pending,(state,payload)=>{
            state.loading=true
        })
        builder.addCase(userList.fulfilled,(state,payload)=>{
            state.loading=false
            state.users=payload
        })
        builder.addCase(userList.rejected,(state,payload)=>{
            state.loading=false
            console.log(payload)
        })
    }
   
})

export default userManagement.reducer;