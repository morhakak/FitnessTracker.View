import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../store/slices/counter.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
