import { StackNavigator } from 'react-navigation';
import InitialRoute from './../Screens/initial';
import Register from './../Screens/register';
import Login from './../Screens/login';
import Confirm from './../Screens/confirm';

const routeConfigs = {
  InitialRoute: {
    screen: InitialRoute,
  },
  Confirm: {
    screen: Confirm,
  },
  Register: {
    screen: Register,
  },
  Login: {
    screen: Login,
  },
};

const StackNavigationConfig = {
  headerMode: 'none',
};

export default StackNavigator(routeConfigs, StackNavigationConfig);
