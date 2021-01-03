import {ITEM_TYPES} from './ItemTypes';

const initalState = {
    items: [],
    loading: false
};

const itemReducer = (state = initalState, action) => {
    switch(action.type){
        case ITEM_TYPES.GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case ITEM_TYPES.DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(i => i.id !== action.payload) //payload = id
            };
        case ITEM_TYPES.ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case ITEM_TYPES.ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};

export default itemReducer;