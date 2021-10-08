import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./features/listSlice";

//Create the reducer and store
export const store = configureStore({
  reducer: {
    list: listReducer
  }
});
