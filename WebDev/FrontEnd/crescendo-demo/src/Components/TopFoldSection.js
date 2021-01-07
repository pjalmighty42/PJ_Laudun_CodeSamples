import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';

import PropTypes from 'prop-types';

const TopFoldSection = (props) => {
    return(
        <section className="top-fold">
            {
                props.currScreenWidth <= 767 ? 
                <Container className="top-fold-mobile">
                    <Row>
                        <Col sm="12">
                            <p className="mobile-pre-header">Research Professional Platform</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{size: 10, offset: 1}}>
                            <h1>
                                <span className="top-h1">ACME Wealth</span>
                                <span className="bot-h1">Management Platform</span>
                            </h1>
                            <ul className="vision-statement-list">
                                <li>
                                    <p>Investment Excellence.</p>
                                </li>
                                <li>
                                    <p>Diviersity of thought.</p>
                                </li>
                                <li>
                                    <p>Organizational Strength.</p>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container> : 
                <Fragment>
                    <div className="top-fold-bg"></div>     
                    <Container className="top-fold-text">
                        <Row>
                            <Col sm="12" md={{size: 6, offset: 2}}>
                                <h1>
                                    <span className="top-h1">ACME Wealth</span>
                                    <span className="bot-h1">Management Platform</span>
                                </h1>
                                <ul className="vision-statement-list">
                                    <li>
                                        <p>Investment Excellence.</p>
                                    </li>
                                    <li>
                                        <p>Diviersity of thought.</p>
                                    </li>
                                    <li>
                                        <p>Organizational Strength.</p>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </Fragment>
            }
            </section>
    );
}

export default TopFoldSection;

TopFoldSection.propTypes = {
    currScreenWidth: PropTypes.number
};