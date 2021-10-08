import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personList: [],
  isLoading: false
};

//ReduxJS uses Immer (fyi), so it's "directly modifying" state vars
//(It's actually immutibly doing the modifying, but just pointing it out)
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
    },
    editList: (state, action) => {
      let currState = [...state.personList];
      let {id, email} = action.payload;
      currState.forEach(p => {
        if (p.persId === id) {
          p.email = email;
        }
      });
      state.personList = currState;
    }
  }
});

export const { setIsLoading, setList, editList } = listSlice.actions;

export default listSlice.reducer;
