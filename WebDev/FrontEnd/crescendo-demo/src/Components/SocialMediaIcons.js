import React, {Fragment} from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTwitter, 
    faFacebookF,
    faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope  } from '@fortawesome/free-solid-svg-icons';

const SocialMediaIcon = (props) => {

    const IconsOutput = () =>{
        let Icons = () => {
            return props.socialMediaLinks.map((icon, indx) => {
                switch(icon.type){
                    case "twitter":
                        return <li className="social-media-btn">
                                    <a href={icon.url}>
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                </li>;
                    case "linkedin":
                        return <li className="social-media-btn">
                                    <a href={icon.url}>
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </a>
                                </li>;
                    case "facebook":
                       return <li className="social-media-btn fb-icon">
                                    <a href={icon.url}>
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a>
                                </li>;
                    default:
                        return <li className="social-media-btn">
                                    <a href={icon.url}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </a>
                                </li>;
                            };
                        });
                    };

        return(
            <ul className="social-media-links">
                <Icons />
            </ul>
        )
    }

    return (
        <Fragment>
            <IconsOutput />
        </Fragment>
    );
};

export default SocialMediaIcon;

SocialMediaIcon.propTypes = {
    socialMediaLinks: PropTypes.array
}