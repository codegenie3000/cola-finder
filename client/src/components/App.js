import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Grid, Row, Col } from 'react-bootstrap';

import Header from './Header';
import About from './About';
import Home from './Home';
import Splash from './Splash';

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
                        <Route exact path="/splash" component={ Splash } />
                        <Route exact path="/about" component={ About }/>
                        <Route exact path="/" component={ Home }/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);