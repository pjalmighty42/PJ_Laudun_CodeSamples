import { STORE_TYPES } from './storestypes';

const initialState = {
    storeObjList: [],
    selStore: {},
    selStoreType: '',
    numOfSpecial: 0,
    selSpecials: [],
    error: ''
};

const storeReducer = (state = initialState, action) => {
    switch(action.type){
        case STORE_TYPES.FETCH_STORE_LIST_REQUEST:
            return {
                ...state,
            };
        case STORE_TYPES.FETCH_STORE_LIST_FAILURE:
            return{
                storeObjList: [],
                error: action.payload
            };
        case STORE_TYPES.GET_STORE_LIST:
            return {
                ...state,
                storeObjList: [...state.storeObjList, action.payload],
                error: ''
            };
        case STORE_TYPES.GET_STORE_BY_ID:
            return {
                ...state,
                selStore: action.payload
            };
        default:
            return state;
    }
};

export default storeReducer;