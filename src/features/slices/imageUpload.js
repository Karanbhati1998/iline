import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import axios from "axios";
import { getToken } from "../../utils/getToken";
export const imageUpload=createAsyncThunk("image/upoad",async(payload,{rejectWithValue})=>{
    try {
          const token = getToken("ilineLogin", "token");
        const response = await axios.post(
          "http://43.205.176.154:4100/api/v1/static/uploadDocument",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data
    } catch (error) {
        rejectWithValue(error)
        console.log({error});
        
    }
})
const imageUploadReducer=createSlice({
    name:"imageUpload",
    initialState:{
        loading:false,
        url:""
    },
    extraReducers:(builder)=>{
        builder.addCase(imageUpload.pending,(state,payload)=>{
            state.loading=true
        })
        builder.addCase(imageUpload.fulfilled,(state,payload)=>{
            state.loading=false
            state.url = payload;
        })
        builder.addCase(imageUpload.rejected,(state,payload)=>{
            state.loading=false
        })

    }
})

export default imageUploadReducer.reducer;