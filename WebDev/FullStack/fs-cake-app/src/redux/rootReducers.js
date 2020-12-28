import { combineReducers } from 'redux';

import storeReducer from './stores/storesreducers';
import userReducer from './user/userreducer';

const rootReducer = combineReducers({
    store: storeReducer,
    user: userReducer
});

export default rootReducer;