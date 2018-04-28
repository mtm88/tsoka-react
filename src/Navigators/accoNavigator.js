import { StackNavigator } from 'react-navigation';
import AccomodationList from './../Screens/main';
import PlacesNavigator from './../Navigators/placesNavigator';

export default AccoNavigator = StackNavigator({
  Home: {
    screen: AccomodationList,
  },
  Details: {
    screen: PlacesNavigator,
  },
});
