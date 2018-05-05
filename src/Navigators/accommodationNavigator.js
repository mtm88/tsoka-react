import { StackNavigator } from 'react-navigation';
import Accommodation from './../Screens/places/accommodation';
import Rooms from './../Screens/places/rooms';

export default AccommodationNavigator = StackNavigator({
  Hotels: {
    screen: Accommodation,
  },
  Rooms: {
    screen: Rooms,
  },
}, {
    headerMode: 'none',
});
