import React from 'react';

import { Container, Row, Col } from 'reactstrap';

const CommitmentSection = () => {
    return(
        <section className="commitment-container">
            <div className="fractal-bg"></div>
            <Container>
                <Row>
                    <Col sm="12" className="commitment-main">
                        <h2>Our Commitment to Professionals</h2>
                        <p>We help out partners deliver industry leading results with a commitment to excellence, 
                            thought-provoking insights and experienced distribution. We are laser focused on our 
                            shared goal — helping clients achieve their objectives.</p>
                        <button className="transparent-btn">Contact Us</button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CommitmentSection;