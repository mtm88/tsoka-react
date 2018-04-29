import { Platform } from 'react-native';

export const fontFamily = Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif';

export default styles = {
  fontFamily: Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif',
  container: {
    flex: 1,
    backgroundColor: '#f4b44c',
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    paddingBottom: 30,
    fontFamily,
  },

}
