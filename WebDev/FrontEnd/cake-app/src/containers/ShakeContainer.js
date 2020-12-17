import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyShake } from '../redux';

const ShakeContainer = () => {
    const numOfShakes = useSelector((state) => state.shake.numOfShakes);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Number of Shakes: { numOfShakes }</h2>
            <button onClick={() => dispatch(buyShake())}>Buy a Shake</button>
        </div>
    );
};

export default ShakeContainer;