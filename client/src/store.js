import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./redux/adminSlice";
import authReducer from "./redux/authSlice";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
  },
  //   devTools: false,
});

export default store;
