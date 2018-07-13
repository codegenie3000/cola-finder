import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withScriptjs, GoogleMap, Marker, withGoogleMap, InfoWindow } from 'react-google-maps';
import {bindActionCreators } from 'redux';
// import { getLocation } from '../actions';
import { setMapBounds } from '../actions';
import { fetchRestaurantsSimple } from '../actions';


class Map extends Component {
    constructor(props) {
        super(props);
        this.googleMapsRef = React.createRef(); // Creates a browser reference
        // this.getMapBounds = this.getMapBounds.bind(this); - NOT NEEDED
        this.state = {
            componentLoaded: false, // Used so the map bounds are only retrieved once
            useSimpleFilter: true
        }
    }

    getMapBoundsOnLoad() {
        if (!this.state.componentLoaded) {
            // console.log(this.googleMapsRef.getBounds().f, this.googleMapsRef.getBounds().b);
            const bounds = this.googleMapsRef.getBounds();
            const minLon = bounds.f.b;
            const maxLon = bounds.f.f;
            const minLat = bounds.b.b;
            const maxLat = bounds.b.f;

            this.props.setMapBounds({
                minLon: minLon,
                maxLon: maxLon,
                minLat: minLat,
                maxLat: maxLat
            });

            const { colaType } = this.props;

            this.props.fetchRestaurantsSimple(minLon, maxLon, minLat, maxLat, colaType.coke, colaType.pepsi);
            this.setState({ componentLoaded: true });
        }
    }

    getMapBounds() {
        // use this.googleMapsRef.getBounds().f and .b
    }

    renderMarkers() {
        // get restaurants from action reducers
        // console.log(this.props.restaurants);
        return _.map(this.props.restaurants, restaurant => {
            return (
                <RestaurantMarker
                    key={ restaurant.name }
                    name={ restaurant.name }
                    latitude={ restaurant.lat }
                    longitude={ restaurant.lng }
                />
            );
        });
    }

    renderContent() {
        if (!this.props.location) {
            return (
                <div>Finding your location...</div>
            );
        } else {
            const MapComponent = withScriptjs(withGoogleMap((props) => {
                return (
                    <GoogleMap
                        zoom={15}
                        center={ { lat: props.latitude, lng: props.longitude } }
                        // onZoomChanged={ props.getMapBounds }
                        // onIdle={ props.getMapBoundsOnLoad }
                        onIdle={ this.getMapBoundsOnLoad.bind(this) }
                        ref={ (map) => { this.googleMapsRef = map; } }
                    >

                        { this.renderMarkers() }

                    </GoogleMap>
                );
            }));

            return (
                <MapComponent
                    // getMapBoundsOnLoad={ this.getMapBoundsOnLoad.bind(this) }
                    // getMapBounds={ this.getMapBounds.bind(this) }
                    latitude={ this.props.location.latitude }
                    longitude={ this.props.location.longitude }
                    isMarkerShown
                    googleMapURL={ `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&?v=3.exp&libraries=geometry,drawing,places` }
                    loadingElement={ <div style={ { height: `100%` } }/> }
                    containerElement={ <div style={ { height: `400px` } }/> }
                    mapElement={ <div style={ { height: `100%` } }/> }
                />
            );
        }
    }

    render() {

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={ 12 }>
                        { this.renderContent() }
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
                    { text: 'foo', color: '#ffffff' }
                }
                onClick={ () => this.setState({ open: !this.state.open }) }
            >
                { this.state.open ? (
                    <InfoWindow>
                        <div>
                            { this.props.name }
                        </div>
                    </InfoWindow>
                ) : '' }
            </Marker>
        );
    }
}

/*function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setMapBounds: setMapBounds,
        fetchRestaurantsSimple: fetchRestaurantsSimple
    }, dispatch);
}*/

/*function mapStateToProps({ location }) {
    return { location }
}*/
function mapStateToProps(state) {
    return {
        location: state.location,
        restaurants: state.restaurants,
        colaType: state.colaType,
        mapBounds: state.mapBounds
    }
}

export default connect(mapStateToProps, { fetchRestaurantsSimple, setMapBounds })(Map);
// export default connect(mapStateToProps, mapDispatchToProps)(Map);