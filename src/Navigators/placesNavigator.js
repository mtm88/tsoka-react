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
    navigationOptions: {
      header: 'none',
    },
    tabBarOptions: {
      activeBackgroundColor: '#5b1f07',
      inactiveBackgroundColor: '#c7a249',
      labelStyle: {
        fontSize: 9,
        color: '#fff',
        paddingBottom: 2,
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  });
