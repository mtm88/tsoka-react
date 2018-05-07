import { StackNavigator } from 'react-navigation';
import InitialRoute from './../Screens/initial';

const routeConfigs = {
  InitialRoute: { screen: InitialRoute },
};

const StackNavigationConfig = {
  initialRouteName: 'InitialRoute',
  headerMode: 'none',
};

export default StackNavigator(routeConfigs, StackNavigationConfig);
