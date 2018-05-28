import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Grid, Row, Col } from 'react-bootstrap';

import Header from './Header';
import About from './About';
import Home from './Home';

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
                        <Route exact path="/about" component={ About }/>
                        <Route exact path="/" component={ Home }/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);