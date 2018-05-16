import { AppRegistry } from 'react-native';
import App from './App';

// 16.05.18 - temp solution to hide isMounted warning due to RN bug
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Module RCTMFBLoginManager', 'Module RNPaypalWrapper']);

AppRegistry.registerComponent('tsoka', () => App);
