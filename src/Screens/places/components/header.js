import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

const fontFamily = Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif';

export default Header = ({ place, navigation, tab }) => {
  const uri = place && place[0] && place[0].image ? `${serverUrl}/images/places/${place[0].image}` : '${serverUrl}/images/default.png';

  return (
    <View>
      <View style={styles.header}>
        <Icon
          name='arrow-back'
          color='#fff'
          size={26}
          containerStyle={{ flex: 2 }}
          underlayColor='transparent'
          onPress={() => navigation.navigate('Home')} />
        <View style={{ flex: 6, alignItems: 'center' }}>
          <Text style={{ fontFamily, color: '#fff', fontSize: 20 }}>{place && place[0] && place[0].name || 'Default Name'}</Text>
        </View>
        <View style={{ flex: 2 }}>
        </View>
      </View>
      <View>
        <Image
          style={{ height: 120, width: null }}
          indicator={ProgressBar}
          indicatorProps={{
            color: '#5b1f07',
            progress: 1
          }}
          source={{ uri }}
        />
      </View>
      <View style={styles.subHeader}>
        <Text style={{ fontFamily, color: 'white', fontSize: 16 }}>{tab}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#5b1f07',
    alignItems: 'center',
    paddingVertical: 8,
  },
  subHeader: {
    backgroundColor: '#5b1f07',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});
