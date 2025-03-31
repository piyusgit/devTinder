import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    // Add the userSlice reducer here
    user: userReducer,
  },
});

export default appStore;
