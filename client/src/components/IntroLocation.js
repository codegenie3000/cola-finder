import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setSimpleFilterCola} from '../actions';
import { Field, reduxForm } from 'redux-form';
import {setLocation as setLocationByGPS} from '../actions';
import {setLocationByZip} from '../actions';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { Grid, Row, Col, Jumbotron, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const hiddenDisplay = {
    display: 'none'
};

const required = value => (value || typeof value === 'number' ? undefined: 'Required');

const minLength = value => value && value.length < 5 ? 'Use a 5 digit zip code' : undefined;

const inputWidth = {
    width: '200px',
    margin: '20px auto auto auto'
};

const zipCodeTextComponent = (
    {
        input,
        label,
        type,
        meta: { touched, error, warning }
    }
) => {
    return (
        <FormGroup
            controlId={ label }
            bsSize="large"
        >
            <ControlLabel style={ hiddenDisplay }>{ label }</ControlLabel>
            <FormControl { ...input }
                         type={ type }
                         placeholder={ label }
                         style={inputWidth}
            />
            { touched &&
            ((error && <span>{ error }</span>) ||
                (warning && <span>{ warning }</span>)) }
        </FormGroup>
    );
};

class CustomForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <form
                onSubmit={ this.props.handleSubmit((formValues) => this.props.myFunction(formValues)) }
            >
                <Field
                    name="zipCode"
                    component={ zipCodeTextComponent }
                    validate={ [ required, minLength ] }
                    type="text"
                    label="Zip Code"
                />

                <Button
                    type="submit"
                    bsStyle="primary"
                    bsSize="large"
                    disabled={ this.props.submitting }
                >Use Zip</Button>

            </form>
        );
    }
}

class IntroLocation extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    runOnSurveySubmit(values) {
        console.log(values);
        this.props.setLocationByZip(values.zipCode);
        this.props.history.push('/selectCola');
    }

    setLocationAndRoute() {
        console.log(this.props);
        this.props.setLocationByGPS();
        this.props.history.push('/selectCola');
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={ 12 }>
                        <Jumbotron>
                            <h1>Avoid cola disappointment</h1>
                            <p className="lead">Find out if a restaurant has Coke or Pepsi before you make your dining
                                decision</p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row className="show-grid text-center">
                    <Col xs={ 12 }>
                        <h3>First, we'll need your location or zip code</h3>
                        <Button
                            type="button"
                            bsStyle="primary"
                            bsSize="large"
                            onClick={ () => {this.setLocationAndRoute()}}
                        >
                            Use GPS
                        </Button>
                    </Col>
                </Row>
                <Row className="show-grid text-center">
                    <Col xs={12}>
                        {
                            /*Using .bind(this) ensures that when you when you run the method runOnSurveySubmit
                            * you have the correct scope. If not, then this will refer to the CustomForm object*/
                        }
                        <CustomForm handleSubmit={this.props.handleSubmit} myFunction={this.runOnSurveySubmit.bind(this)} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setLocationByZip: setLocationByZip,
        setLocationByGPS: setLocationByGPS
    }, dispatch);
}

const ConnectedIntroLocation = connect(null, mapDispatchToProps)(withRouter(IntroLocation));

export default reduxForm({
    form: 'zipCodeForm'
})(ConnectedIntroLocation);

// export default connect(null, mapDispatchToProps)(withRouter(IntroLocation));