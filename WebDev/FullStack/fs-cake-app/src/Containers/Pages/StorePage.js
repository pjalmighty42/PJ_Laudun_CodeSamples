import React from 'react';

import { useParams } from 'react-router-dom';
import storeList from '../../jsondata/stores.json';

const StorePage = () => {

    const { id } = useParams();

    const OutputStore = (props) => {

    }

    return(
        <div className="store-page">

        </div>
    );
};

export default StorePage;