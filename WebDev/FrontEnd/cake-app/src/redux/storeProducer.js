import { createSlice } from '@reduxjs/toolkit';

export const dynamicSlice = 
(
    sliceName,
    stateObject,
    reducerCBArray //[{fnName: '', fnCB: ()}]
) => createSlice({
    name: sliceName,
    initialState: {
        data: stateObject
    }
})