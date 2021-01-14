import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchGameStoresList } from '../../redux';

const DecisionPage = () => {
    const [currSelStore, selStore] = useState({});

    const dispatch = useDispatch();

    useEffect(()=>{
        //We need to first initialize the stored list of Stores
        dispatch(fetchGameStoresList());
    }, [])
    
    //Then assign the list for future use
    const listOfStores = useSelector((state) => state.stores.storeObjList);
    
    console.log(listOfStores);

    return(
        <div className="decision-page">

        </div>
    );
};

export default DecisionPage;