import { STORE_TYPES } from './storestypes';
import storeList from '../../jsondata/stores.json';

const getStoresList = (stores) => {
    return{
        type: STORE_TYPES.GET_STORE_LIST,
        payload: stores
    };
};

const getStoreById = (store) => {
    return {
        type: STORE_TYPES.GET_STORE_BY_ID,
        payload: store
    };
};

export const fetchGameStoresList = () => {
    const randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    return (dispatch) => {
        console.log(storeList);

        if(storeList.length > 0) {
            let storeListOut = storeList.map(store => {
                store['location-dist-mod'] = randomNum(0, 150);
                return store;
            });
            dispatch(getStoresList(storeListOut));
        }
    };
};

export const fetchGameStoreById = (id) => {
    
}