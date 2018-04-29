import { DrawerNavigator } from 'react-navigation';
import HomeNavigator from './../Navigators/homeNavigator';
import Settings from './../Screens/settings';

export default Drawer = DrawerNavigator({
  Home: {
    screen: HomeNavigator,
  },
  Settings: {
    screen: Settings,
  },
});
