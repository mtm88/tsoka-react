import { StackNavigator } from 'react-navigation';
import AccomodationList from './../Screens/main';
import AccoDetails from './../Screens/accoDetails';

export default AccoNavigator = StackNavigator({
  Home: {
    screen: AccomodationList,
  },
  Details: {
    screen: AccoDetails,
  },
});
