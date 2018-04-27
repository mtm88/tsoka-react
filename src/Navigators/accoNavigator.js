import { StackNavigator } from 'react-navigation';
import AccomodationList from './../Screens/main';
import PlaceDetails from './../Screens/placeDetails';

export default AccoNavigator = StackNavigator({
  Home: {
    screen: AccomodationList,
  },
  Details: {
    screen: PlaceDetails,
  },
});
