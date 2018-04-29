import { TabNavigator, TabBarBottom } from 'react-navigation';
import Description from './../Screens/places/description';
import Accommodation from './../Screens/places/accommodation';
import Activities from './../Screens/places/activities';
import Transport from './../Screens/places/transport';
import Events from './../Screens/places/events';

export default PlacesNavigator = TabNavigator({
  Description: {
    screen: Description,
  },
  Accommodation: {
    screen: Accommodation,
  },
  Activities: {
    screen: Activities,
  },
  Transport: {
    screen: Transport,
  },
  Events: {
    screen: Events,
  },
}, {
    headerMode: 'none',
    tabBarOptions: {
      activeBackgroundColor: '#1A0800',
      inactiveBackgroundColor: '#5b1f07',
      showLabel: true,
      labelStyle: {
        fontSize: 8,
        color: '#fff',
        paddingBottom: 2,
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  });
