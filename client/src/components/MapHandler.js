import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import Map from './Map';
import { Col, Grid, Row, Button } from 'react-bootstrap';
import RestaurantDetail from './RestaurantDetail';

const overlayStyle = {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '80vh',
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

const periodArray = ['.', '..', '...', '....', '.....', '......'];
let periodCount = 0;

class MapHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setIn: true,
            showText: true,
            counterText: 'Loading'
        };
        this.fadeOut = this.fadeOut.bind(this);
    }

    updateSelectedRestaurantNumber(number) {
        this.setState({ selectedRestaurantNumber: number});
    }

    componentDidMount() {
        this.timerId = setInterval(() => this.tick(), 500);
        window.setTimeout(this.fadeOut, 1500);
    }

    tick(){
        if (periodCount < 6) {
            this.setState({counterText: `Loading${periodArray[periodCount]}`});
            periodCount++;
        } else {
            periodCount = 0;
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    fadeOut() {
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
                        <Map />
                    </Col>
                </Row>
                <RestaurantDetail />
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default MapHandler;