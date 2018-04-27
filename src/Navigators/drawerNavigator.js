import { DrawerNavigator } from 'react-navigation';
import AccoNavigator from './../Navigators/accoNavigator';
import Settings from './../Screens/settings';

export default Drawer = DrawerNavigator({
  Home: {
    screen: AccoNavigator,
  },
  Settings: {
    screen: Settings,
  },
});
