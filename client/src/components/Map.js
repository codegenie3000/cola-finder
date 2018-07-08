import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withScriptjs, GoogleMap, Marker, withGoogleMap, InfoWindow } from 'react-google-maps';
import { getLocation } from "../actions";
import { fetchRestaurants } from "../actions";



class Map extends Component {
    constructor(props) {
        super(props);
        this.googleMapsRef = React.createRef();
        this.getMapBounds = this.getMapBounds.bind(this);
        this.state = {
            componentLoaded: false, // Used so the map bounds are only retrieved once
            isOpen: false
        }
    }

    componentDidMount() {
        this.props.getLocation();
    }

    // Deprecated and componentDidMount works just as well
    /*componentWillMount() {
        // get location from action creator
        this.props.getLocation();
    }*/

    getMapBoundsOnLoad() {
        if (!this.state.componentLoaded) {
            // console.log(this.googleMapsRef.getBounds().f, this.googleMapsRef.getBounds().b);
            const bounds = this.googleMapsRef.getBounds();
            const minLon = bounds.f.b;
            const maxLon = bounds.f.f;
            const minLat = bounds.b.b;
            const maxLat = bounds.b.f;

            const coke = true;
            const pepsi = false;
            const customMix = false;
            const fountain = false;
            const realSugar = false;

            this.props.fetchRestaurants(minLon, maxLon, minLat, maxLat, coke, pepsi, customMix, fountain, realSugar);
            this.setState({componentLoaded: true});
        }
    }

    getMapBounds() {
        // use this.googleMapsRef.getBounds().f and .b
    }

    renderMarkers() {
        // get restaurants from action reducers
        console.log(this.props.restaurants);
        return _.map(this.props.restaurants, restaurant => {
            return (
                <RestaurantMarker
                    key={restaurant.name}
                    name={restaurant.name}
                    latitude={restaurant.lat}
                    longitude={restaurant.lng}
                />
            );
        });
    }

    renderContent() {
        if (this.props.location.coords.latitude === 0) {
            return (
                <div>Finding your location...</div>
            );
        } else {
            const MapComponent = withScriptjs(withGoogleMap((props) => {
                return (
                    <GoogleMap
                        zoom={props.customZoom}
                        center={ {lat: props.latitude, lng: props.longitude}}
                        onZoomChanged={props.getMapBounds}
                        onIdle={props.getMapBoundsOnLoad}
                        ref={(map) => {this.googleMapsRef = map;}}
                    >

                        {this.renderMarkers()}

                    </GoogleMap>
                );
            }));

            return (
                <MapComponent
                    getMapBoundsOnLoad={this.getMapBoundsOnLoad.bind(this)}
                    getMapBounds={this.getMapBounds.bind(this)}
                    latitude={this.props.location.coords.latitude}
                    longitude={this.props.location.coords.longitude}
                    isMarkerShown
                    customZoom={15}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&?v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            );
        }
    }

    render() {

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12}>
                        {this.renderContent()}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

class RestaurantMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    render() {
        return (
            <Marker
                position={ { lat: this.props.latitude, lng: this.props.longitude } }
                key={ this.props.name }
                label={
                    {text: 'foo', color: '#ffffff'}
                }
                onClick={() => this.setState({open: !this.state.open})}
            >
                {this.state.open ? (
                    <InfoWindow>
                        <div>
                            {this.props.name}
                        </div>
                    </InfoWindow>
                ): ''}
            </Marker>
        );
    }
}

/*function mapStateToProps({ location }) {
    return { location }
}*/
function mapStateToProps(state) {
    return {
        location: state.location,
        restaurants: state.restaurants
    }
}

export default connect(mapStateToProps, { getLocation, fetchRestaurants })(Map);