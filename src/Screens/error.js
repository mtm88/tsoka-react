import React from 'react';
import { View } from 'react-native';
import AppText from './../components/AppText';
import { Icon } from 'react-native-elements';

const ErrorScreen = ({ error }) => {
  return (
    <View style={{ flex: 1, paddingTop: 20, alignItems: 'center', backgroundColor: '#f4b44c', }}>
      <Icon
        name='emoji-sad'
        type='entypo'
        color='#000'
        size={50}
        containerStyle={{ paddingBottom: 15 }}
        underlayColor='transparent' />

      <AppText style={{ fontSize: 18, fontWeight: 'bold' }}>Sincere apologies, even our App has flaws ;-(</AppText>
      <AppText style={{ fontSize: 18, }}>Please try again or contact us to fix the issue.</AppText>
      <AppText style={{ fontSize: 18, marginTop: 15 }}>Error details:</AppText>
      <AppText style={{ fontSize: 17, fontStyle: 'italic', color: 'red' }}>{error}</AppText>
    </View>
  );
};

export default ErrorScreen;
