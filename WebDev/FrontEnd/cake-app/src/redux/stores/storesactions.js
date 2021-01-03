import { STORE_TYPES } from './storestypes';
import storeList from '../../jsondata/stores.json';

const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

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
    return (dispatch) => {
        console.log(storeList);

        if(storeList.length > 0) {
            let storeListOut = storeList.map(store => {
                store['location-dist-mod'] = randomNum(0, 150);
                return store;
            });
            store["supply-amt"].forEach(item => {
                item = randomNum(0, 15)
            });
            
            return {
               store
            }
        });

            dispatch(getStoresList(storeListOut));
        }
    };
};

<<<<<<< Updated upstream
export const fetchGameStoreById = (id) => {
    
=======
export const fetchGameStoreById = (state, id) => {
    
    return (dispatch) => {
        state.selSpecials = [];

        let storeChoice = state.storeObjList.filter(s => s.id === id);

        let numOfSpecs = randomNum(0, 5);

        let specialsList = [];

        switch(storeChoice["specializations"]){
            case "candy":
                specialsList = storeChoice["specializations"]["candy"];
                break;
            case "shakes-ic":
                specialsList = storeChoice["specializations"]["shakes-ic"];
                break;
            case "cakes":
            default:
                specialsList = storeChoice["specializations"]["cakes"];
                break;
        }
        
        for(let i = 0; i < numOfSpecs; i++){
            let randIndx = randomNum(0, specialsList.length);
            state.selSpecials.push(specialsList[randIndx]);
        }

        dispatch(getStoreById(storeChoice));
    }
>>>>>>> Stashed changes
}