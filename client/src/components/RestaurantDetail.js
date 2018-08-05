import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Grid, Row, Button } from 'react-bootstrap';

/*class RestaurantDetail extends Component {
    render () {

    }
}*/

const RestaurantDetail = (props) => {
    if (props.restaurantDetail != null) {
        const restaurantNumber = props.restaurantNumber;
        const { name, address, city, state, zip } = props.restaurantDetail;
        return (
            <Row>
                <Col xs={ 12 }>
                    <p>{restaurantNumber}</p>
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
        restaurantDetail: state.restaurantDetail,
        restaurantNumber: state.selectedRestaurant.restaurantNumber
    }
}

export default connect(mapStateToProps, null)(RestaurantDetail);