// todo
// todo
// todo
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const initialState = {
    user : user,
    token : token,
    student : {},
    placements : [],
    isLoading : true,
}

export const getMyPlacementResults = createAsyncThunk(
  "/api/student/placements(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/student/placements", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const updateProfile = createAsyncThunk(
  "/api/student/profile/:id(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/student/profile`,{payload}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const uploadOfferLetter = createAsyncThunk(
  "/api/student/placements(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/student/placements`,{payload}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);



const studentSlice = createSlice({
    name : "student",
    initialState,
    reducerss :[],
    extraReducers : (builder)=>{
        builder.addCase(getMyPlacementResults.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getMyPlacementResults.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.placements = payload.placementResults;
          toast.success(payload.message);
        });
        builder.addCase(getMyPlacementResults.rejected, (state, { payload }) => {
          state.isLoading = false;
          toast.error(payload.message);
        });
        builder.addCase(updateProfile.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.students = payload.students;
          toast.success(payload.message);
        });
        builder.addCase(updateProfile.rejected, (state, { payload }) => {
          state.isLoading = false;
          toast.error(payload.message);
        });
        builder.addCase(uploadOfferLetter.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(uploadOfferLetter.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.student = payload.data;
          toast.success(payload.message);
        });
        builder.addCase(uploadOfferLetter.rejected, (state, { payload }) => {
          state.isLoading = false;
          toast.error(payload.message);
        });
    }
})

export default studentSlice.reducer;