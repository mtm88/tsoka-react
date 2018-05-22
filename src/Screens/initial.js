import React from 'react';
import { connect } from 'react-redux';
import Drawer from './../Navigators/drawerNavigator';
import Login from './login';

const InitialRoute = ({ loggedIn, navigation }) => (
  loggedIn ? <Drawer /> : <Login navigation={navigation} />
  // <Drawer />
);

const mapStateToProps = ({ user: { loggedIn } }) => ({ loggedIn });

export default connect(mapStateToProps)(InitialRoute);
