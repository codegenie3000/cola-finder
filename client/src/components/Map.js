import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { withScriptjs, GoogleMap, Marker, withGoogleMap, InfoWindow } from 'react-google-maps';
import { bindActionCreators } from 'redux';
import { setMapBounds } from '../actions';
import { fetchRestaurantsSimple } from '../actions';
import { setUserSelectedRestaurant } from '../actions';
import Markers from './Markers'

class Map extends Component {
    constructor(props) {
        super(props);
        this.googleMapsRef = React.createRef(); // Creates a browser reference

        this.state ={
            componentLoaded: false
        }
    }

    getMapBoundsOnLoad() {
        if (!this.state.componentLoaded) {
            // console.log(this.googleMapsRef.getBounds().f, this.googleMapsRef.getBounds().b);
            const bounds = this.googleMapsRef.getBounds();
            const minLat = bounds.f.b;
            const maxLat = bounds.f.f;
            const minLon = bounds.b.b;
            const maxLon = bounds.b.f;


            this.props.setMapBounds({
                minLat: minLat,
                maxLat: maxLat,
                minLon: minLon,
                maxLon: maxLon
            });
            // const { filter } = this.props;
            // console.log(simpleFilterSettings);

            // this.props.fetchRestaurantsSimple(minLat, maxLat, minLon, maxLon, filter.simpleFilterSettings.coke, filter.simpleFilterSettings.pepsi);
            // Line below is for development purposes
            // this.props.fetchRestaurantsSimple(34.0489384, 34.0631604, -118.38956, -118.37476, filter.simpleFilterSettings.coke, filter.simpleFilterSettings.pepsi);
            this.setState({ componentLoaded: true });
        }
    }

    renderMap() {
        const MapComponent = withScriptjs(withGoogleMap((props) => {
            return (
                <GoogleMap
                    zoom={ 15 }
                    center={ { lat: props.latitude, lng: props.longitude } }
                    // onZoomChanged={ props.getMapBounds }
                    // onIdle={ props.getMapBoundsOnLoad }
                    onIdle={ this.getMapBoundsOnLoad.bind(this) }
                    ref={ (map) => {
                        this.googleMapsRef = map;
                    } }
                >
                    <Markers/>
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

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={ 12 }>
                        { this.renderMap() }
                    </Col>
                </Row>
            </Grid>
        );
    }
}









function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setMapBounds: setMapBounds,
        // fetchRestaurantsSimple: fetchRestaurantsSimple,
        // selectRestaurant: setUserSelectedRestaurant
    }, dispatch);
}

/*function mapStateToProps({ location }) {
    return { location }
}*/
function mapStateToProps(state) {
    return {
        location: state.location,
        // restaurants: state.restaurants,
        // filter: state.filter,
        // selectedRestaurant: state.selectedRestaurant
        // mapBounds: state.mapBounds
    }
}

// export default connect(mapStateToProps, { fetchRestaurantsSimple, setMapBounds })(Map);
export default connect(mapStateToProps, mapDispatchToProps)(Map);