import React from 'react';
import { Link } from 'react-router-dom';

import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';

const MobileFooter = () => { 
    return (
        <Navbar className="navbar-main no-border" color="light" expand="md">
             <Collapse isOpen={true} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <div className="priv-tou-div">
                            <NavLink tag={Link} to="/">Privacy Policy</NavLink>
                            <NavLink tag={Link} to="/">Terms of Use</NavLink>
                        </div>
                    </NavItem>
                    <NavItem>
                        <NavbarText>Site Links</NavbarText>
                        <hr /> 
                    </NavItem>
                    <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/">About Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/">Insights</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/">Events</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/">Contact Us</NavLink>
                    </NavItem>
                </Nav>
             </Collapse>
        </Navbar>
    );
};

export default MobileFooter;