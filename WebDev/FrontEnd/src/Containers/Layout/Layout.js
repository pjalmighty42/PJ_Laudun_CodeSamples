
import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';

import Aux from '../../hoc/HOC';
import NavContainer from '../../Components/Navbar/NavbarContianer';
import OutputTable from '../../Components/OutputTable/OutputTable';

import { observer } from 'mobx-react-lite'
import RaceStore from '../../Store/RacerInfoStore';

const Layout = observer(() => {

    const store = useContext(RaceStore);
    const raceInfo = store.returnRaceInfo;

    console.log(raceInfo);
 
    return (
        <Grid container spacing={1}>
            <Aux>
                <NavContainer />
                <OutputTable
                    racerAmt={raceInfo[0].value}
                    expLvl={raceInfo[1].value}
                    diffLvl={raceInfo[2].value}
                />
            </Aux>
        </Grid>
    )
});

export default Layout;
