import { DrawerNavigator } from 'react-navigation';
import HomeNavigator from './../Navigators/homeNavigator';
import Settings from './../Screens/settings';
import Cart from './../Screens/cart';
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


