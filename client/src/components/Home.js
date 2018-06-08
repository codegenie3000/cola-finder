import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withScriptjs, GoogleMap, Marker, withGoogleMap, InfoWindow } from 'react-google-maps';
import { getLocation } from "../actions";


class Home extends Component {
    constructor(props) {
        super(props);
        this.mapBounds = React.createRef();
        this.getMapBounds = this.getMapBounds.bind(this);
        this.state = {
            componentLoaded: false
        }
    }

    componentWillMount() {
        this.props.getLocation();
    }

    getMapBoundsOnLoad() {
        if (!this.state.componentLoaded) {
            console.log('fetch restaurants');
            this.setState({componentLoaded: true});
        }
    }

    getMapBounds() {
        // use this.mapBounds.getBounds().f and .b
        debugger;
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
                        ref={(map) => {this.mapBounds = map;}}
                    >

                        <Marker
                            position={{lat: props.latitude, lng: props.longitude}}
                        >
                            <InfoWindow>
                                <div>
                                    Test
                                </div>
                            </InfoWindow>
                        </Marker>
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

function mapStateToProps({ location }) {
    return { location }
}

export default connect(mapStateToProps, { getLocation })(Home);