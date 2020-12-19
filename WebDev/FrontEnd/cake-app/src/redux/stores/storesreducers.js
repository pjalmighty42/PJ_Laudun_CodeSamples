import { STORE_TYPES } from './storestypes';

const initialState = {
    storeObjList: [],
    selStore: {},
    selStoreType: '',
    numOfSpecial: 0,
    selSpecials: []
};

const storeReducer = (state = initialState, action) => {
    switch(action.type){
        case STORE_TYPES.GET_STORE_LIST:
            return {
                storeObjList: action.payload 
            };
        case STORE_TYPES.GET_STORE_BY_ID:
            return {
                selStore: action.payload
            };
        default:
            return state;
    }
};

export default storeReducer;