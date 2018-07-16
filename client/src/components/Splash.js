import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setSimpleFilterCola} from '../actions';
import {setLocation} from '../actions';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { Grid, Row, Col, Jumbotron, Button } from 'react-bootstrap';

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

        setLocation(); // runs setLocation action which sets the location via the browser

        setSimpleFilterCola(simpleFilter, colaSelection, history);

    };

    return (
        <Grid>
            <Row className="show-grid">
                <Col xs={ 12 }>
                    <Jumbotron>
                        <h1>Avoid cola disappointment</h1>
                        <p>Find out if a restaurant has Coke or Pepsi before you make your dining decision</p>
                    </Jumbotron>
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
        setLocation: setLocation
        // selectCola: selectCola
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));