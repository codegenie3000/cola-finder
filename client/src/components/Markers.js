import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { withScriptjs, GoogleMap, Marker, withGoogleMap, InfoWindow } from 'react-google-maps';
import { bindActionCreators } from 'redux';
// import { setMapBounds } from '../actions';
import { fetchRestaurantsSimple } from '../actions';
import { setUserSelectedRestaurant } from '../actions';
import { fetchRestaurantDetail} from '../actions';

class Markers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSelectedRestaurantId: false
        }
    }

    onMarkerClicked(restaurantId, restaurantNumber) {
        this.setState({userSelectedRestaurantId: restaurantId});
        this.props.fetchRestaurantDetail(restaurantId);
        this.props.setUserSelectedRestaurant({
            restaurantId: restaurantId,
            restaurantNumber: restaurantNumber
        });
    }

    componentDidMount() {
        if (this.props.filter.mapBounds) {
            const {minLat, maxLat, minLon, maxLon} = this.props.filter.mapBounds;
            const {filter} = this.props;
            this.props.fetchRestaurantsSimple(minLat, maxLat, minLon, maxLon, filter.simpleFilterSettings.coke, filter.simpleFilterSettings.pepsi);
        }
    }

    render() {
        const onMarkerClicked = this.onMarkerClicked.bind(this);

        const userSelectedRestaurant = this.props.selectedRestaurant.restaurantId;
        if (this.props.restaurants) {
            const restaurantArray = _.map(this.props.restaurants);

            // add restaurantNumber key
            /*restaurantArray.forEach(function(restaurant, index) {
                let indexObj = {restaurantNumber: index + 1};
                _.assignIn(restaurant, indexObj);
            });*/
            // return restaurants with numbers added
            return restaurantArray.map(function(restaurant) {
                return (
                    <RestaurantMarker
                        key={ restaurant._id }
                        name={ restaurant.name }
                        latitude={ restaurant.lat }
                        longitude={ restaurant.lng }
                        isOpen={ true }
                        restaurantId={ restaurant._id }
                        selectRestaurant={onMarkerClicked}
                        userSelectedRestaurant={userSelectedRestaurant}
                        restaurantNumber={restaurant.restaurantNumber}
                    />
                );
            });
        }
    }
}

const RestaurantMarker = (props) => {
    const {name, selectRestaurant, restaurantId, restaurantNumber, latitude, longitude, userSelectedRestaurant} = props;

    const displayInfoWindow = () => {
        if (userSelectedRestaurant === restaurantId) {
            return (
                <InfoWindow>
                    <div>{name}</div>
                </InfoWindow>
            );
        }
    };

    return (
        <Marker
            position={ { lat: latitude, lng: longitude } }
            label={
                { text: restaurantNumber.toString(), color: '#ffffff' }
            }
            // onClick={ () => this.setState({ open: !this.state.open }) }
            onClick={() => selectRestaurant(restaurantId, restaurantNumber)}
        >
            {displayInfoWindow()}
        </Marker>
    );
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchRestaurantsSimple: fetchRestaurantsSimple,
        setUserSelectedRestaurant: setUserSelectedRestaurant,
        fetchRestaurantDetail: fetchRestaurantDetail
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        // location: state.location,
        restaurants: state.restaurants,
        filter: state.filter,
        selectedRestaurant: state.selectedRestaurant
        // mapBounds: state.mapBounds
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markers);