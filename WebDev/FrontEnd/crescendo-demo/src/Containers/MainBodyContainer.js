import React, {Fragment} from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../Containers/Pages/HomePage';

const MainBodyContainer = () => {
    return (
        <Fragment>
            <Switch>
                <Route path="/" exact component={HomePage} />
            </Switch>
        </Fragment>
    );
};

export default MainBodyContainer;