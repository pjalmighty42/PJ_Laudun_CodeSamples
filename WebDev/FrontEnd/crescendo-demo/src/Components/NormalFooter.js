import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap';

import SocialMediaIcons from './SocialMediaIcons';

const NormalFooter = (props) => {
    return(
        <Container>
            <Row>
                <Col md="3">
                    <article className="call-us-container">
                        <p><b>Call us at: </b> {props.phoneNum}</p>
                        <p>For more information</p>
                    </article>
                </Col>
                <Col md="6"></Col>
                <Col md="3">
                    <SocialMediaIcons 
                        socialMediaLinks={props.socialMediaLinks}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default NormalFooter;

NormalFooter.propTypes = {
    socialMediaLinks: PropTypes.array,
    phoneNum: PropTypes.string
};