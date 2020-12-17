import { SHAKE_ACTIONS } from './shaketypes';

const initalState = {
    numOfShakes: 15
};

const shakeReducer = (state = initalState, action) => {
    switch(action.type){
        case SHAKE_ACTIONS.BUY_SHAKE:
            return {
                ...state,
                numOfShakes: state.numOfShakes - 1
            };
        default:
            return state;
    }
};

export default shakeReducer;