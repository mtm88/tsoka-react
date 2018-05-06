import React, { Component } from 'react';

import { connect } from 'react-redux';

import Login from './../Screens/login';
import Drawer from './../Navigators/drawerNavigator';
import Spinner from './../components/Spinner';

export default class Splash extends Component {
  state = {
    loggedIn: false,
    failedAuth: false,
    loading: false,
  }

  resetProps() {
    this.setState({
      failedAuth: false,
      loading: true,
    })
  }

  updateStatus(status) {
    this.setState({
      loggedIn: status,
      failedAuth: !status,
    });
  }

  render() {
    if (this.state.loggedIn) {
      return (<Drawer />);
    }
    return (<Login failedAuth={this.state.failedAuth} resetProps={() => this.resetProps()} updateStatus={status => this.updateStatus(status)} />);
  }
}
