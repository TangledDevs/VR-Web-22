import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.post(
        `/api/${payload.userType}/login`,
        payload
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
  },
  reducers: {
    logout: () => {
      console.log("Hello");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      localStorage.setItem("user", payload.admin);
      localStorage.setItem("token", payload.accessToken);
      toast.success(payload.message);
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      toast.error(payload.message);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
