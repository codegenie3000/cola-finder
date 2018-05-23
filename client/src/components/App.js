import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from  'react-redux';
import * as actions from '../actions';
import {Grid, Row, Col} from 'react-bootstrap';

import Header from './Header';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

  render() {
    return (
      <div>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);