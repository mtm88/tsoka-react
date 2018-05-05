import { DrawerNavigator } from 'react-navigation';
import HomeNavigator from './../Navigators/homeNavigator';
import Settings from './../Screens/settings';
import Cart from './../Screens/cart';

export default Drawer = DrawerNavigator({
  Cart: {
    screen: Cart,
  },
  Home: {
    screen: HomeNavigator,
  },
  Settings: {
    screen: Settings,
  },
});
