import { combineReducers } from 'redux';

import userReducer from './user/userreducer';
import storeReducer from './stores/storesreducers';

const rootReducer = combineReducers({
    stores: storeReducer,
    user: userReducer
});

export default rootReducer;