import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CSSTransition, Transition } from 'react-transition-group';
import Map from './Map';
import { Col, Grid, Row, Button } from 'react-bootstrap';

const overlayStyle = {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    zIndex: 100,
    color: '#000'
};

const transitionStyles = {
    entering: { opacity: 0, transition: 'opacity 300ms ease-in' },
    entered: { opacity: 1, transition: 'opacity 300ms ease-in' },
    exiting: { opacity: 1, transition: 'opacity 300ms ease-in' },
    exited: { opacity: 0, transition: 'opacity 300ms ease-in' }
};

const addPadding = {
    paddingTop: '200px'
};

const periodArray = ['.', '..', '...'];
let periodCount = 0;

class MapHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setIn: true,
            showText: true,
            counterText: 'Loading'
        };
        this.myFunction = this.changeState.bind(this);
    }

    componentDidMount() {
        this.timerId = setInterval(() => this.tick(), 400);
        window.setTimeout(this.myFunction, 3000);
    }

    tick(){
        if (periodCount < 3) {
            this.setState({counterText: `Loading${periodArray[periodCount]}`});
            periodCount++;
        } else {
            periodCount = 0;
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    changeState() {
        this.setState({ setIn: false, counterText: null });
        clearInterval(this.timerId);
    }

    render() {
        const { setIn, counterText } = this.state;
        return (
            <Grid>
                <Row>
                    <Col xs={ 12 } className="text-center">
                        <Transition
                            in={ setIn }
                            enter={true}
                            timeout={ 100 }
                            unmountOnExit={true}
                        >
                            { state => (
                                <div style={ { ...overlayStyle, ...transitionStyles[ state ], ...addPadding } }>{counterText}</div>
                            ) }
                        </Transition>
                    </Col>
                </Row>
                <Row>
                    <Col xs={ 12 }>
                        <Map/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default MapHandler;