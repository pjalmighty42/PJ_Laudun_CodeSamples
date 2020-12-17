import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyCake } from '../redux';

const CakeContainerDos = () => {
    const numofcakes = useSelector((state) => state.cake.numOfCakes);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Number of Cakes - {numofcakes}</h2>
            <button onClick={() => dispatch(buyCake())}>Buy a Cake</button>
        </div>
    );
};

export default CakeContainerDos;