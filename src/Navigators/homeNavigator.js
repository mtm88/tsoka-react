import { StackNavigator } from 'react-navigation';
import Home from './../Screens/home';
import PlacesNavigator from './../Navigators/placesNavigator';

export default HomeNavigator = StackNavigator({
  Home: {
    screen: Home,
  },
  Details: {
    screen: PlacesNavigator,
  },
}, {
    headerMode: 'none',
});
