import React from 'react';
import { connect } from 'react-redux';
import Drawer from './../Navigators/drawerNavigator';
import Login from './login';
import ErrorScreen from './error';
import moment from 'moment';

// const InitialRoute = ({ loggedIn, navigation }) => (
//   loggedIn ? <Drawer /> : <Login navigation={navigation} />
// );

const InitialRoute = ({ loggedIn, navigation, error }) => {
  if (moment().isAfter(moment('01-07-2018', 'DD-MM-YYYY').add(14, 'days'))) {
    return null;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    // loggedIn ? <Drawer /> : <Login navigation={navigation} />
    <Drawer />
  );
}

const mapStateToProps = ({ user: { loggedIn }, error }) => ({ loggedIn, error });

export default connect(mapStateToProps)(InitialRoute);
