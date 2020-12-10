import React, {Fragment} from 'react';

import { Layout } from 'antd';

const { Footer } = Layout;

const FooterHOC = (props) => {
    return(
        <Fragment>
            <Footer id="bh-app-footer">
                {props.children}
            </Footer>
        </Fragment>
    );
};

export default FooterHOC;