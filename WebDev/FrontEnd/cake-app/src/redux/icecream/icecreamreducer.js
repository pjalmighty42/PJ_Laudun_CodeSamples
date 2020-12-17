import { ICE_CREAM_ACTIONS } from './icecreamtypes';

const initalState = {
    numOfIceCream: 20
};

const iceCreamReducer = (state = initalState, action) => {
    switch(action.type){
        case ICE_CREAM_ACTIONS.BUY_ICE_CREAM:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1
            };
        default:
            return state;
    }
};

export default iceCreamReducer;