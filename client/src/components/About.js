import React from 'react';
import { Grid, Row, Col, Jumbotron} from 'react-bootstrap';

const About = () => {
    return (
    <Grid>
        <Row className="show-grid">
            <Col xs={ 12 }>
                <Jumbotron>
                    <h1>Avoid cola disappointment!</h1>
                    <p>Find out if a restaurant has Coke, Pepsi, or organic sodas before you make your decision</p>
                </Jumbotron>
            </Col>
        </Row>
    </Grid>
    );
};

export default About;