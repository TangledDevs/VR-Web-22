import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./redux/adminSlice";
import authReducer from "./redux/authSlice";
import studentReducer from "./redux/studentSlice";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    student: studentReducer,
  },
  //   devTools: false,
});

export default store;
