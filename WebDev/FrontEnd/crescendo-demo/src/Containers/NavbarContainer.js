import React, { Fragment, useState, useEffect } from "react";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';

  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

  import { Link } from 'react-router-dom';

  import logoMain from '../assets/logo-main.png';
  import logoMobile from '../assets/logo-mobile.png';

  const NavBarContainer = () => {

    const [currScreenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(()=> {
        //Listen and set the screen width
        const setWidthResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', setWidthResize);
        //Then return to break the listener (otherwise we get a memory leak)
        return () => {
            console.log(currScreenWidth);
            window.removeEventListener('resize', setWidthResize);
        };
    });

    const OutputBrandImage = (props) => {
        if (props.size <= 767){
            return <img src={logoMobile} alt="ACME Corporation Logo" className="mobile-img" /> 
        } 
        else{
            return <img src={logoMain} alt="ACME Corporation Logo" className="normal-img"  />;
        }
    }

    const OutputToggleIcon = () => {
        return isOpen === true ? <FontAwesomeIcon className="red" icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />;
    }

      return (
        <Fragment>
            <Navbar className="navbar-main" color="light" light expand="md">
                <div className="main-bar">
                    <NavbarBrand href="/">
                        <OutputBrandImage size={currScreenWidth} />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} >
                        <OutputToggleIcon />
                    </NavbarToggler>
                </div>
                
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            { currScreenWidth <= 767 ? 
                                <Fragment>
                                    <NavbarText>Site Links</NavbarText>
                                    <hr /> 
                                </Fragment> 
                                : <NavbarText>
                                    <Fragment>
                                        <p className="lgt-blue-header">Research Professsional</p>
                                        <p className="drk-blue-header">Platform</p>
                                    </Fragment>
                                </NavbarText>
                            }
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
        </Fragment>
      );
  };

  export default NavBarContainer;