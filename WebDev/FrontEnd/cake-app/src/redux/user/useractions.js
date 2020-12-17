//import axios from 'axios';

import { USER_TYPES } from './usertypes';
import userList from '../../jsondata/users.json';

export const fetchUsersRequest = () => {
    return {
        type: USER_TYPES.FETCH_USER_REQUEST
    };
};

const fetchUsersSuccess = (users) => {
    return {
        type: USER_TYPES.FETCH_USER_SUCCESS,
        payload: users
    };
};

const fetchUsersFailure = (err) => {
    return {
        type: USER_TYPES.FETCH_USER_FAILURE,
        payload: err
    };
};

export const setUserInfo = (userObj) => {
    return{
        type: USER_TYPES.SET_USER_INFO,
        payload: userObj
    }
}

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest);
        console.log(userList);
        /*axios.get(userList)
        .then(
            response => {
                const users = response.data;
                fetchUsersSuccess(users);
            }
        )
        .catch(
            error => {
                const errorMsg = error.message;
                fetchUsersFailure(errorMsg);
            }
        )*/
        if(userList.length > 0){
            dispatch(fetchUsersSuccess(userList));
        }
        else{
            dispatch(fetchUsersFailure("The current list of users are unavailable! Please try again later..."));
        }
    };
};