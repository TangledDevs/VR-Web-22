import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./redux/adminSlice";
import authReducer from "./redux/authSlice";
import studentReducer from "./redux/studentSlice";
import coordinatorReducer from "./redux/coordinatorSlice";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    coordinator : coordinatorReducer,
    student: studentReducer,
  },
  //   devTools: false,
});

export default store;
