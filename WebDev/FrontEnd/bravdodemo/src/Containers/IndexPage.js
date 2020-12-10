import React from 'react';
import { Image } from 'antd';

import logo from '../Assets/logo.gif';

const IndexPage = () => {
    return (
        <div id="bh-base-main">
            <Image 
                src={logo}
            />
        </div>
    );
};

export default IndexPage;