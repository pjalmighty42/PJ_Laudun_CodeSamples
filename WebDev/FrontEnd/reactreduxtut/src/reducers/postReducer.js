import {POSTS_ACTIONS} from '../actions/types';

const initalState = {
    posts: [],
    post: {
        id: 0,
        title: '',
        body: ''
    }
};

const postsActions = (state = initalState, action) => {
    switch(action.type){
        case POSTS_ACTIONS.FETCH_POSTS:
        case POSTS_ACTIONS.NEW_POST:
        case POSTS_ACTIONS.EDIT_POST:
        case POSTS_ACTIONS.REMOVE_POST:
            return {
                ...state,
                posts: action.posts
            };
        default:
            return state;
    }
};

export default postsActions;