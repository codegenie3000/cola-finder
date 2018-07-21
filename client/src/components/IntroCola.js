import React from 'react';
import {connect} from 'react-redux';
import {setSimpleFilterCola} from '../actions';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';

const addBottomMargin = {
    marginBottom: '10px'
};

const Content = ({setSimpleFilterCola, setLocation, history}) => {
    const clickHandler = (selection) => {
        const colaSelection = (() => {
            if (selection === 'Coke') {
                return {
                    coke: true,
                    pepsi: false
                }
            } else {
                return {
                    coke: false,
                    pepsi: true
                }
            }
        })();
        const simpleFilter = true;

        // Location is now set via the IntroLocation view
        // setLocation(); // runs setLocation action which sets the location via the browser

        setSimpleFilterCola(simpleFilter, colaSelection, history);

    };

    return (
        <Grid>
            <Row className="show-grid">
                <Col xs={ 12 }>
                    <h1>Select your preferred cola</h1>
                </Col>
            </Row>
            <ContentButtons handleColaSelection={clickHandler}/>
        </Grid>
    );
};

const ContentButtons = (props) => {
    const sodas = ['Coke', 'Pepsi'];

    return sodas.map((soda) => {
        return (
            <Row className="show-grid text-center" key={soda}>
                <Col xs={ 12 }>
                    <Button
                        style={ addBottomMargin }
                        type="button"
                        bsStyle="primary"
                        bsSize="large"
                        onClick={() => {props.handleColaSelection(soda)}}
                    >
                        { soda }
                    </Button>
                </Col>
            </Row>
        );
    });
};

function mapStateToProps(state) {
    return {
        selectedCola: state.selectedCola
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSimpleFilterCola: setSimpleFilterCola,
        // setLocation: setLocation
        // selectCola: selectCola
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));