import axios from 'axios';
import { ITEM_TYPES } from './ItemTypes';

export const setItemsLoading = () => {
    return{
        type: ITEM_TYPES.ITEMS_LOADING
    };
};

export const getItems = () => {
    return {
        type: ITEM_TYPES.GET_ITEMS
    };
};

export const deleteItems = (id) => {
    return {
        type: ITEM_TYPES.DELETE_ITEM,
        payload: id
    }
};

export const addItem = (item) => {
    return {
        type: ITEM_TYPES.ADD_ITEM,
        payload: item
    }
};