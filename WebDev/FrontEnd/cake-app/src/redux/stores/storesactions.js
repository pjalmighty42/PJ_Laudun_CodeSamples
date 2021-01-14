
import { STORE_TYPES } from './storestypes';
import storeList from '../../jsondata/stores.json';

const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const fetchStoresRequest = () => {
    return {
        type: STORE_TYPES.FETCH_STORE_LIST_REQUEST
    };
};

const fetchStoresFailure = (err) => {
    return {
        type: STORE_TYPES.FETCH_STORE_LIST_FAILURE,
        payload: err
    };
};

const getStoresList = (storeIn) => {
    return{
        type: STORE_TYPES.GET_STORE_LIST,
        payload: storeIn
    };
};

const getStoreById = (storeIn) => {
    return {
        type: STORE_TYPES.GET_STORE_BY_ID,
        payload: storeIn
    };
};

export const fetchGameStoresList = () => {

    return (dispatch) => {
        dispatch(fetchStoresRequest);

        if(storeList.length > 0) {
            storeList.map(s => {
                if(s.specializations.length === 2){
                    s.specializations = "Ice Cream";
                }
                else{
                    let spec = s.specializations[0].toUpperCase();
                    s.specializations = spec + s.specializations.slice(1);
                    console.log(s.specializations)
                }

                s.locationDistMod = randomNum(1, 10);

                for(let sup = 0; sup < s.supplyAmt.length; sup++){
                    s.supplyAmt[sup] = randomNum(5, 25);
                }

                return dispatch(getStoresList(s));
            });
        }
        else{
            dispatch(fetchStoresFailure("The current list of stores are unavailable! Please try again later..."));
        }
    }
};

export const fetchGameStoreById = (id) => {
    
    return (dispatch) => {

        let storeChoice = storeList.filter(s => s.id === id);

        if(storeChoice.keys(storeChoice).length !== 0){
    
            dispatch(getStoreById(storeChoice));
        }
        else{
            dispatch(fetchStoresFailure("The current list of stores are unavailable! Please try again later..."));
        }
    }
}