import React, {Fragment} from 'react';

import { Layout } from 'antd';

const {Content} = Layout;

const MainBodyHOC = (props) => {
    return(
        <Fragment>
            <Content id="bh-app-body">
                {props.children}
            </Content>
        </Fragment>
    );
};

export default MainBodyHOC;