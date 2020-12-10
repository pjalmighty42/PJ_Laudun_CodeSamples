import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';

import { Button } from 'antd';

const NavButton = (props) =>{
    console.log(props)
    return(
        <Fragment>
            <NavLink
                activeClassName="bh-btn-selected"
                className={props.pullRight ? "" : "pull-left"}
                to={props.path}
                exact>
                <Button
                    className="bh-btn"
                    size={"large"}
                >
                    {props.btnValue}
                </Button>
            </NavLink>
        </Fragment>
        
    );
};

export default NavButton;