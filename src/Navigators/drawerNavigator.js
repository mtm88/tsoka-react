import { DrawerNavigator } from 'react-navigation';
import HomeNavigator from './../Navigators/homeNavigator';
import Settings from './../Screens/settings';
import Cart from './../Screens/cart';
import Payments from './../Screens/payments';
import Login from './../Screens/login';
import BlogNavigator from './../Navigators/blogNavigator';
import DrawerContent from './../components/DrawerContent';

export default Drawer = DrawerNavigator({
  Home: {
    screen: HomeNavigator,
  },
  Cart: {
    screen: Cart,
  },
  Payments: {
    screen: Payments,
  },
  Blog: {
    screen: BlogNavigator,
  },
  Settings: {
    screen: Settings,
  },
  Logout: {
    screen: Login,
  },
}, {
    contentComponent: DrawerContent,
  });


