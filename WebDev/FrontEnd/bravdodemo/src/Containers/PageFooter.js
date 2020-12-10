import React from 'react';

import Moment from 'react-moment';

import FooterHOC from './HOCs/FooterHOC';

const PageFooter = () => {

    let date = new Date();

    return(
        <FooterHOC>
            &#169; <Moment format="YYYY">{date}</Moment>, Paul Laudun.
        </FooterHOC>
    );
};

export default PageFooter;