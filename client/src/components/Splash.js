import React, { Component } from 'react';
import {connect} from 'react-redux';
import {selectCola} from "../actions";
import {bindActionCreators} from 'redux';
import { Grid, Row, Col, Jumbotron, Button } from 'react-bootstrap';

const addBottomMargin = {
    marginBottom: '10px'
};

/*class Splash extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <About/>
        );
    }
}*/

class About extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     colaType: ''
        // }
    }

    handleChange(value) {
        // this.setState({
        //     colaType: value
        // });
    }

    handleClick(selection) {
        this.props.selectCola({selectedCola: selection});
    }

    renderButtons() {
        const colaTypes = ['Coca-Cola', 'Pepsi'];
        return colaTypes.map((cola) => {
            return (
                <Row className="show-grid text-center" key={cola}>
                    <Col xs={12}>
                        <Button
                            style={addBottomMargin}
                            type="button"
                            bsStyle="primary"
                            bsSize="large"
                            onClick={() => this.handleClick(cola)}>{cola}</Button>
                    </Col>
                </Row>
            );
        })
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={ 12 }>
                        <Jumbotron>
                            <h1>Avoid cola disappointment!</h1>
                            <p>Find out if a restaurant has Coke, Pepsi, or organic sodas before you make your decision</p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row className="show-grid text-center">
                    {this.renderButtons()}
                </Row>
            </Grid>
        );
    }
};

function mapStateToProps(state) {
    return {
        selectedCola: state.selectedCola
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectCola: selectCola}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(About);