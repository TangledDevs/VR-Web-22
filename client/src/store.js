import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./redux/adminSlice";
const store = configureStore({
  reducer: {
    admin : adminReducer,
  },
  //   devTools: false,
});

export default store;
