import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// import LoadingScreen from './Loading';
import MapHandler from './MapHandler';

import Header from './Header';
import About from './About';
import Map from './Map';
import IntroLocation from './IntroLocation';
import IntroCola from './IntroCola';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/" component={ IntroLocation } />
                        <Route exact path="/selectCola" component={ IntroCola} />
                        <Route exact path="/about" component={ About }/>
                        <Route exact path="/map" component={ Map }/>
                        <Route exact path="/loading" component={MapHandler} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);