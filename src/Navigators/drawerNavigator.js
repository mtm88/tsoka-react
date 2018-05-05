import { DrawerNavigator } from 'react-navigation';
import HomeNavigator from './../Navigators/homeNavigator';
import Settings from './../Screens/settings';
import Cart from './../Screens/cart';

import DrawerContent from './../components/DrawerContent';

export default Drawer = DrawerNavigator({
  Home: {
    screen: HomeNavigator,
  },
  Cart: {
    screen: Cart,
  },
  Settings: {
    screen: Settings,
  },
}, {
    contentComponent: DrawerContent,
  });


