import {POSTS_ACTIONS} from './types';
import axios from 'axios';

import {
    setLoading, 
    setError, 
    fetchPosts,
    addNewPost,
    editCurrentPost
} from '../slices/postSlice';

export const getPosts = () => {
    return async (dispatch) => {
        try{
            dispatch(setLoading(true));
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            console.log(res.data);
            dispatch(setLoading(false));
            dispatch(fetchPosts(res.data));
        }
        catch(err){
            dispatch(setError(err));
            dispatch(setLoading(false));
        }
    };
};

export const addPost = (post) => {
    return async (dispatch) => {
        try{
            dispatch(setLoading(true));
            const res = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
            console.log(res.data);
            dispatch(addNewPost(res.data));
        }
        catch(err){
            dispatch(setError(err));
            dispatch(setLoading(false));
        }
    };
};

export const editPost = (post) => {
    return async (dispatch) => {
        try{
            dispatch(setLoading(true));
            const res = await axios.put('https://jsonplaceholder.typicode.com/posts/' + post.id, post);
            console.log(res.data);
            dispatch(editCurrentPost(res.data));
        }
        catch(err){
            dispatch(setError(err));
            dispatch(setLoading(false));
        }
    };
};

export const deletePost = (post) => {
    return (dispatch) => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + post.id, post)
        .then(res => dispatch({
            type: POSTS_ACTIONS.REMOVE_POST,
            posts: res
        }))
        .catch(err => console.log(err));
    };
};