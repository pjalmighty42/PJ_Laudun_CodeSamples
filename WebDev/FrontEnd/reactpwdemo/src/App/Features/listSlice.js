import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personListBase: [],
  personListModified: [],
  isLoading: false,
  isError: false
};

//Slice creation, Redux Toolkit uses immer, so it allviates having a lot of boilerplate to update the state
export const listSlice = createSlice({
  name: "personList",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      //Set if we're still loading up the screen
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setBaseList: (state, action) => {
      //Set redux personList here
      state.personList = action.payload;
    },
    setListModified: (state, action) => {
      state.personListModified = action.payload;
    }
  }
});

export const { setIsLoading, setIsError, setBaseList, setListModified } = listSlice.actions;

export default listSlice.reducer;
