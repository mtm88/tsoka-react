import React from 'react';
import { connect } from 'react-redux';
import Drawer from './../Navigators/drawerNavigator';
import Login from './login';
import moment from 'moment';

// const InitialRoute = ({ loggedIn, navigation }) => (
//   loggedIn ? <Drawer /> : <Login navigation={navigation} />
// );

const InitialRoute = ({ loggedIn, navigation }) => {
  if (moment().isAfter(moment('30-05-2018', 'DD-MM-YYYY').add(5, 'days'))) {
    return null;
  }

  return (
    // loggedIn ? <Drawer /> : <Login navigation={navigation} />
    <Drawer />
  );
}

const mapStateToProps = ({ user: { loggedIn } }) => ({ loggedIn });

export default connect(mapStateToProps)(InitialRoute);
