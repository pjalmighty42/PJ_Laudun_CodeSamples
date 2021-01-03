import { combineReducers } from 'redux';

import itemReducers from './Item/ItemReducers';

const rootReducers = combineReducers({
    items: itemReducers
});

export default rootReducers;