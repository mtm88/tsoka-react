import { StackNavigator } from 'react-navigation';
import Login from './../Screens/login';
import Splash from './../Screens/splash';
import DrawerNavigator from './drawerNavigator';

export default LoginNavigator = StackNavigator({
  Splash: {
    screen: Splash,
  },
  Login: {
    screen: Login,
  },
  DrawerNavigator: {
    screen: DrawerNavigator,
  },
}, {
    headerMode: 'none',
});
