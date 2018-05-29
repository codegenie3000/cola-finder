import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withScriptjs, GoogleMap, Marker, withGoogleMap, InfoWindow } from 'react-google-maps';
import { getLocation } from "../actions";

const MapComponent = withScriptjs(withGoogleMap((props) => {
    return (
        <GoogleMap
            zoom={props.customZoom}
            center={ {lat: props.latitude, lng: props.longitude}}
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

class Home extends Component {
    componentWillMount() {
        this.props.getLocation();
    }

    renderContent() {
        if (this.props.location.coords) {

            return (
                <MapComponent
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
        } else {
            return (
                <div>Loading</div>
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