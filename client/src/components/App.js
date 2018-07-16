import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import About from './About';
import Map from './Map';
import Splash from './Splash';
import Filter from './FilterQuery'

class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/" component={ Splash } />
                        <Route exact path="/about" component={ About }/>
                        <Route exact path="/map" component={ Map }/>
                        <Route exact path="/filter" component={ Filter } />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);