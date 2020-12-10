import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import {Image} from 'antd'

const NavLink = (props) =>{

    let LinkImg = (props) => {
        if(typeof props.imgSrc !== "undefined"){
            return (
                <Fragment>
                    <Image className="link-img" src={props.imgSrc} /> 
                    {props.btnValue}
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    {props.btnValue}
                </Fragment>
            )
        }
    };
    

    return(
        <Fragment>
            <Link 
                to={props.path}
                className={props.pullRight ? "bh-link" : "bh-link pull-left"}
            >
                <LinkImg 
                    imgSrc ={props.imgSrc}
                    btnValue = {props.btnValue}
                />
            </Link>
        </Fragment>
        
    );
};

export default NavLink;