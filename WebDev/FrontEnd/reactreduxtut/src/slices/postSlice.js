import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        loading: false,
        error: ''
    },
    reducers:{
        fetchPosts: (state, {payload}) => {
            state.posts = payload;
        },
        addNewPost: (state, {payload}) => {
            state.posts.push(payload);
        },
        editCurrentPost: (state, {payload}) => {
            console.log(payload.id);
            state.posts.map(p => {
                if(p.id === payload.id){
                    p = payload;
                }
                return p;
            });
        },
        setLoading: (state, {payload}) => {
            state.loading = payload;
        },
        setError: (state, {payload}) => {
            state.error = payload;
        }
    }
});

//Export Actions
export const { fetchPosts, addNewPost, editCurrentPost, setError, setLoading } = postSlice.actions;

//Export Reducer
export default postSlice.reducer;