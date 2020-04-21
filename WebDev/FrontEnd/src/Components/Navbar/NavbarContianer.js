import React, { useState, useContext } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';

import '../../Styles/Navbar.css';

import { observer } from 'mobx-react-lite'
import RaceStore from '../../Store/RacerInfoStore';

const NavbarContianer = observer(() => {
    
    const [isOpen, setIsOpen] = useState(false);

    const store = useContext(RaceStore);
    const raceInfo = store.returnRaceInfo;

    let racerAmount = raceInfo[0].value;
    let expLevel = raceInfo[1].value;
    let difficulty = raceInfo[2].value;

    let amt, diff = 0;
    let exp1, exp2 = 0;

    const handleDrawerOpen = () => {
        let opened = isOpen;
        setIsOpen(!opened);
    };

    const changeRacerAmount = (value) => {
        amt = value;
    };

    const changeExpLevel = (val1, val2) => {
        exp1 = val1;
        exp2 = val2;
    }

    const changeDiffLevel = (value) => {
        diff = value;
    };

    const beginRace = () => {
        if(typeof amt !== 'undefined'){
            window.localStorage.setItem("amt", JSON.stringify(amt));
        }
        if(typeof exp1 !== 'undefined' && typeof exp2 !== 'undefined'){
            window.localStorage.setItem("lvl1", JSON.stringify(exp1));
            window.localStorage.setItem("lvl2", JSON.stringify(exp2));
        }
        if(typeof diff !== 'undefined' && diff > 0){
            window.localStorage.setItem("diff", JSON.stringify(diff));
        }

        store.setAmount(amt);
        store.setRacerLevels(exp1, exp2);
        store.setDiffLevel(diff);

        handleDrawerOpen();
    };

    const expMarks = [
        {
            value: 0,
            label: 'Rookie'
        },
        {
            value: 25,
            label: 'Experienced'
        },
        {
            value: 50,
            label: 'Veteran'
        },
        {
            value: 75,
            label: 'Elite'
        },
        {
            value: 100,
            label: 'Champion'
        }
    ];

    const trackMarks = [
        {
            value: 0,
            label: 'Easy'
        },
        {
            value: 25,
            label: 'Normal'
        },
        {
            value: 50,
            label: 'Hard'
        },
        {
            value: 75,
            label: 'Elite'
        },
        {
            value: 100,
            label: 'Champion'
        }
    ];

    return (
        <div className="main-container">
            <div className="Navbar">
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => handleDrawerOpen()}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <h1 className="Nav-Title">Racing Game</h1>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className="Nav-Drawer-Container"
                    variant="persistent"
                    anchor="left"
                    open={isOpen}
                >
                    <div className="Nav-Drawer-Header">
                        <IconButton onClick={() => handleDrawerOpen()}>
                            {isOpen === true ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                        <div className="Slider-Container">
                            <h2>Amount</h2>
                            <Slider
                                orientation="horizontal"
                                defaultValue={racerAmount}
                                aria-labelledby="horizontal-slider"
                                valueLabelDisplay="on"
                                min={10}
                                max={42}
                                onChange={(e, val) => changeRacerAmount(val)}
                            />
                            <h2>Exp Level</h2>
                            <Slider
                                id="ExpLevel"
                                orientation="horizontal"
                                defaultValue={expLevel}
                                aria-labelledby="horizontal-slider"
                                step={25}
                                marks={expMarks}
                                onChange={(e, val) => changeExpLevel(val[0], val[1])}
                            />
                            <h2>Track Difficulty</h2>
                            <Slider
                                orientation="horizontal"
                                defaultValue={difficulty}
                                aria-labelledby="horizontal-slider"
                                step={25}
                                marks={trackMarks}
                                onChange={(e, val) => changeDiffLevel(val)}
                            />
                        </div>
                    <Divider />
                    <Grid
                        justify="space-between"
                        container 
                        spacing={1}
                        >
                        <Button 
                            className="Race-Btn"
                            size="large" 
                            variant="outlined"
                            onClick={() => beginRace()}
                            >
                                Let's Race!
                            </Button>
                    </Grid>
                </Drawer>
            </div>
        </div>
    );
});

export default NavbarContianer;