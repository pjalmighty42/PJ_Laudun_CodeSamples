import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./Features/listSlice";

//Create the reducer and store
export const store = configureStore({
    reducer: {
      list: listReducer
    }
});