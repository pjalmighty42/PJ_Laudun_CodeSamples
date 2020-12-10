import React from 'react';
import {Switch, Route} from 'react-router-dom';

import MainBodyHOC from './HOCs/MainBodyHOC';

import BaseMain from './IndexPage';
import Appointments from './AppointmentsMain';

const BodyMain = () => {
    return(
        <MainBodyHOC>
            <Switch>
                <Route path="/" exact component={BaseMain}/>
                <Route path="/appointments" exact component={Appointments}/>
                <Route path="/medications" exact component={BaseMain}/>
            </Switch>
        </MainBodyHOC>
    );
};

export default BodyMain;