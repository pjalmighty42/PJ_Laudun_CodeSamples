import {configureStore} from '@reduxjs/toolkit'
//import thunk from 'redux-thunk';

//import rootReducer from './reducers';
import postReducer from './slices/postSlice';

/*
//Old way
const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer, 
    initialState, 
    applyMiddleware(...middleware)
);

export default store;
*/

//New way
export default configureStore({
    reducer: {
        post: postReducer
    }
});