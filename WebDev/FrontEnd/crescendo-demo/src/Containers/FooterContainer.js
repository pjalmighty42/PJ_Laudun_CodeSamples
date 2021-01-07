import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import NormalFooter from '../Components/NormalFooter';
import MobileFooter from '../Components/MobileFooter';

const FooterContainer = (props) => {
    const [currScreenWidth, setScreenWidth] = useState(window.innerWidth);

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

    return (
        <footer className={currScreenWidth <= 767 ? "mobile-footer-main" : "normal-footer-main"}>
            {
                currScreenWidth <= 767 ?
                    <MobileFooter /> :
                    <NormalFooter 
                        phoneNum={props.phoneNum}
                        socialMediaLinks={props.socialMediaLinks}
                    />
            }
        </footer>
    );
};

export default FooterContainer;

FooterContainer.propTypes = {
    phoneNum: PropTypes.string,
    socialMediaLinks: PropTypes.array
}