import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../store/slices/videoSlice";
import actionReducer from "../store/slices/actionSlice";
import authReducer from "../store/slices/authSlice";

const store = configureStore({
  reducer: {
    videos: videoReducer,
    actions: actionReducer,
    auth: authReducer,
  },
});
export default store;
