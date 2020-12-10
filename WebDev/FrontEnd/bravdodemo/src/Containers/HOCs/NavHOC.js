import React, {Fragment} from 'react';

import { Layout, Menu } from 'antd';
const { Header } = Layout;

const NavHOC = (props) => {
    return(
        <Fragment>
            <Header id="bh-app-nav">
                <Menu>
                    {props.children}
                </Menu>
            </Header>
        </Fragment>
    );
};

export default NavHOC;