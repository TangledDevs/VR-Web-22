/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user,
  token: token,
  isLoading: true,
  students: [],
  placements: [],
  coordinators: [],
  coordinator: {},
  student: {},
};

export const getAllStudents = createAsyncThunk(
  "/api/admin/students(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const resonse = await axios.get("/api/admin/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return resonse.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getAllCoordinators = createAsyncThunk(
  "/api/admin/coordinator(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/coordinators", {
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

export const addCoordinator = createAsyncThunk(
  "/api/admin/coordinator(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/admin/coordinators", payload, {
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

export const uploadBulkData = createAsyncThunk(
  "/api/admin/bulkData(post)",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.post(`/api/admin/students/upload`, payload, {
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

export const uploadBulkPlacements = createAsyncThunk(
  "/api/admin/placementsbulk(post)",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.post(
        `/api/admin/placements/uploadResults`,
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
export const updateCoordinatorDetails = createAsyncThunk(
  "/api/admin/coordinator(patch)",
  async (payload, { rejectWithValue }) => {
    console.log("Payload: ", payload);
    try {
      const response = await axios.patch(
        `/api/admin/coordinators/${payload._id}`,
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

export const deleteCoordinator = createAsyncThunk(
  "/api/admin/coordinator(delete)",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.delete(
        `/api/admin/coordinators/${payload.id}`,
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

export const getPlacements = createAsyncThunk(
  "/api/admin/placements(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/admin/placements`, {
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

export const addStudent = createAsyncThunk(
  "/api/admin/students(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/admin/students`, payload, {
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
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCoordinator: (state, { payload }) => {
      const coordinator = state.coordinators.find(
        (item, index) => item._id == payload.id
      );
      state.coordinator = coordinator;
      console.log(coordinator);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCoordinators.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCoordinators.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.coordinators = payload.coordinators;
      toast.success(payload.message);
    });
    builder.addCase(getAllCoordinators.rejected, (state, { payload }) => {
      state.isLoading = false;
      // toast.error(payload.message || "Unable to get coordinator details");
    });

    builder.addCase(uploadBulkData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadBulkData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.students = payload.students;
      toast.success(payload.message);
    });
    builder.addCase(uploadBulkData.rejected, (state, { payload }) => {
      state.isLoading = false;
      // toast.error(payload.message || "Unable to get coordinator details");
    });

    builder.addCase(uploadBulkPlacements.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadBulkPlacements.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.placements = payload.placementResults;
      toast.success(payload.message);
    });
    builder.addCase(uploadBulkPlacements.rejected, (state, { payload }) => {
      state.isLoading = false;
      // toast.error(payload.message || "Unable to get coordinator details");
    });

    builder.addCase(addCoordinator.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCoordinator.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.coordinators = payload.coordinators;
      toast.success(payload.message);
    });
    builder.addCase(addCoordinator.rejected, (state, { payload }) => {
      state.isLoading = false;
      // toast.error(payload.message || "Unable to add coordinator");
    });

    builder.addCase(updateCoordinatorDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateCoordinatorDetails.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.coordinators = payload.coordinators;
        toast.success(payload.message);
      }
    );
    builder.addCase(updateCoordinatorDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      // toast.error(payload.message || "Unable to update coordinator");
    });

    builder.addCase(deleteCoordinator.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCoordinator.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.coordinators = payload.coordinators;
      toast.success(payload.message);
    });
    builder.addCase(deleteCoordinator.rejected, (state, { payload }) => {
      state.isLoading = false;
      // toast.error(payload.message || "Unable to delete coordinator");
    });

    builder.addCase(getPlacements.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPlacements.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.placements = payload.placementResults;
      toast.success(payload.message);
    });
    builder.addCase(getPlacements.rejected, (state, { payload }) => {
      state.isLoading = false;
      // toast.error(payload.message || "Unable to get placement details");
    });

    builder.addCase(getAllStudents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllStudents.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.students = payload.students;
      toast.success(payload.message);
    });
    builder.addCase(getAllStudents.rejected, (state, { payload }) => {
      state.isLoading = false;
      // toast.error(payload.message || "Unable to get student details");
    });

    builder.addCase(addStudent.pending, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addStudent.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.students = payload.students;
      toast.success("Student Added Successfully");
    });

    builder.addCase(addStudent.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
  },
});

export const { setCoordinator } = adminSlice.actions;
export default adminSlice.reducer;
