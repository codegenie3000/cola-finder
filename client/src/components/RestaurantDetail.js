import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Grid, Row, Button } from 'react-bootstrap';

/*class RestaurantDetail extends Component {
    render () {

    }
}*/

const RestaurantDetail = (props) => {
    if (props.restaurantDetail != null) {
        const { restaurantNumber, name, address, city, state, zip } = props.restaurantDetail;
        return (
            <Row>
                <Col xs={ 12 }>
                    {restaurantNumber}
                    {name}
                    <br/>{address}
                    <br/>{city}, {state} {zip}
                </Col>
            </Row>
        );
    } else {

    }
    return (
        <div>Please select a restaurant</div>
    );
};

function mapStateToProps(state) {
    return {
        restaurantDetail: state.restaurantDetail
    }
}

export default connect(mapStateToProps, null)(RestaurantDetail);