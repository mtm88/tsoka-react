import React from 'react';
import { connect } from 'react-redux';
import Drawer from './../Navigators/drawerNavigator';
import Login from './login';

const InitialRoute = ({ loggedIn }) => (
  loggedIn ? <Drawer /> : <Login />
);

const mapStateToProps = ({ user: { loggedIn } }) => ({ loggedIn });

export default connect(mapStateToProps)(InitialRoute);
