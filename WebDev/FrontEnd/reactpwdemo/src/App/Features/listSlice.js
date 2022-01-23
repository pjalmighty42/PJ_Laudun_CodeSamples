import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personList: [],
  isLoading: false
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
    setList: (state, action) => {
      //Set redux personList here
      state.personList = action.payload;
    }
  }
});

export const { setIsLoading, setList } = listSlice.actions;

export default listSlice.reducer;
