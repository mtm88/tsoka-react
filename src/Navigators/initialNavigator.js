import { StackNavigator } from 'react-navigation';
import InitialRoute from './../Screens/initial';
import Register from './../Screens/register';

const routeConfigs = {
  InitialRoute: {
    screen: InitialRoute,
  },
  Register: {
    screen: Register,
  }
};

const StackNavigationConfig = {
  initialRouteName: 'InitialRoute',
  headerMode: 'none',
};

export default StackNavigator(routeConfigs, StackNavigationConfig);
