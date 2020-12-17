import {USER_TYPES} from './usertypes';

const initialState = {
    loading: false,
    userInfoObj: {},
    users: [],
    error: ''
};

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_TYPES.SET_USER_INFO:
            return{
                loading: false,
                userInfoObj: action.payload
            }
        case USER_TYPES.FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case USER_TYPES.FETCH_USER_SUCCESS:
            return{
                loading: false,
                users: action.payload,
                error: ''
            };
        case USER_TYPES.FETCH_USER_FAILURE:
            return{
                loading: false,
                users: [],
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;