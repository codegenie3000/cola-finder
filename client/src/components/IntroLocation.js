import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {setLocation as setLocationByGPS} from '../actions';
import {setLocationByZip} from '../actions';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { Grid, Row, Col, Jumbotron, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

const required = value => (value || typeof value === 'number' ? undefined: 'Required');

const minLength = value => value && value.length < 5 ? 'Use a 5 digit zip code' : undefined;

const addTopMargin = {
    marginTop: '20px'
};

const inputWidth = {
    width: '200px',
    margin: 'auto'
};

const formatFormLabel = {
    fontSize: '18px',
    fontWeight: 500
};

const zipCodeTextComponent = (
    {
        input,
        label,
        type,
        meta: { touched, error, warning }
    }
) => {

    const returnValidationState = () => {
        if (touched) {
            return ((error && 'error') || (warning && 'warning') || 'success');
        } else {
            return null;
        }
    };

    const helpBlock = () => {
        return touched && ((error && <HelpBlock>{error}</HelpBlock>) || (warning && <HelpBlock>{warning}</HelpBlock>));
    };

    return (
        <FormGroup
            controlId={ label }
            bsSize="large"
            validationState={returnValidationState()}
            style={addTopMargin}
        >
            <ControlLabel style={formatFormLabel}>Use your zip code</ControlLabel>
            <FormControl { ...input }
                         type={ type }
                         placeholder="12345"
                         style={inputWidth}
                         maxLength="5"
            />
            {helpBlock()}
        </FormGroup>
    );
};

class CustomForm extends Component {
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
                        <h3>First, we'll need your location or</h3>
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