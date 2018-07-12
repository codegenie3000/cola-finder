import React, { Component } from 'react';
import {connect} from 'react-redux';
import {selectCola} from '../actions';
import {getLocation} from '../actions';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { Grid, Row, Col, Jumbotron, Button } from 'react-bootstrap';

const addBottomMargin = {
    marginBottom: '10px'
};

const Content = ({selectCola, getLocation, history}) => {
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

        getLocation();
        selectCola(colaSelection, history);
    };

    return (
        <Grid>
            <Row className="show-grid">
                <Col xs={ 12 }>
                    <Jumbotron>
                        <h1>Avoid cola disappointment</h1>
                        <p>Find out if a restaurant has Coke, Pepsi, or organic sodas before you make your decision</p>
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
        selectCola: selectCola,
        getLocation: getLocation
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));