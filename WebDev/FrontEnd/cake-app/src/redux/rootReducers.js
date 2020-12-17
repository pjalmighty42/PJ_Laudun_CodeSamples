import { combineReducers } from 'redux';

import cakeReducer from './cakes/cakereducer';
import iceCreamReducer from './icecream/icecreamreducer'; 
import shakereducer from './shake/shakereducer';
import userReducer from './user/userreducer';

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    shake: shakereducer,
    user: userReducer
});

export default rootReducer;