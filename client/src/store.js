import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  //   devTools: false,
});

export default store;
