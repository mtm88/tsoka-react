import { TabNavigator, TabBarBottom } from 'react-navigation';
import Description from './../Screens/places/description';
import AccommodationNavigator from './../Navigators/accommodationNavigator';
import Activities from './../Screens/places/activities';
import Transport from './../Screens/places/transport';
import Events from './../Screens/places/events';

export default PlacesNavigator = TabNavigator({
  Description: {
    screen: Description,
  },
  Hotels: {
    screen: AccommodationNavigator,
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
        fontSize: 10,
        color: '#fff',
        paddingBottom: 2,
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  });
