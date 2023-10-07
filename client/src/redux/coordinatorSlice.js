// todo
// todo
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/axios";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user,
  token: token,
  students: [],
  placements: [],
  isLoading: false,
  student: {},
};

export const getMyDeptPlacements = createAsyncThunk(
  "/api/coordinator/placements(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/coordinator/placements", {
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
export const getMyStudents = createAsyncThunk(
  "/api/coordinator/students(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/coordinator/students", {
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

export const getStudentDetails = createAsyncThunk(
  "/api/coordinator/students/:id(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/coordinator/students/:${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const validateOfferLetter = createAsyncThunk(
  "/api/coordinator/students/:id(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/coordinators/placements`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const coordinatorSlice = createSlice({
  name: "coordinator",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder.addCase(getMyDeptPlacements.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMyDeptPlacements.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.placements = payload.placements;
      toast.success(payload.message);
    });
    builder.addCase(getMyDeptPlacements.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    });
    builder.addCase(getMyStudents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMyStudents.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.students = payload.students;
      toast.success(payload.message);
    });
    builder.addCase(getMyStudents.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    });
    builder.addCase(getStudentDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStudentDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.student = payload.data;
      toast.success(payload.message);
    });
    builder.addCase(getStudentDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    });
    builder.addCase(validateOfferLetter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(validateOfferLetter.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.placements = payload.deptPlacements;
      toast.success(payload.message);
    });
    builder.addCase(validateOfferLetter.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    });
  },
});

export default coordinatorSlice.reducer;
