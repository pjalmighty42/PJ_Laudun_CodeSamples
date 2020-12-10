import React from 'react';

import NavHOC from './HOCs/NavHOC';
import NavButton from '../Components/navButton';
import NavLink from '../Components/navLink';

import logo from '../Assets/logo.gif';

const NavBar = () => {
    return (
        <NavHOC>
            <NavLink 
            path="/"
            pullRight={false}
            imgSrc = {logo}
            btnValue={"Bravado Health Demo"}
            />
            <div className="btn-container">
                <NavButton 
                path="/appointments"
                pullRight={true}
                btnValue="My Appointments"
                />
                <NavButton 
                path="/medications"
                pullRight={true}
                btnValue="My Medications"
                />
            </div>
        </NavHOC>
    )
};

export default NavBar;