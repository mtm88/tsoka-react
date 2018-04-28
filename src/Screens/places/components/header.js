import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Image } from "react-native-expo-image-cache";

export default Header = ({ place, navigation, tab }) => {
  const preview = { uri: place && place[0] && place[0].image ? `${serverUrl}/images/places/${place[0].image}-thumb.png` : null };
  const uri = place && place[0] && place[0].image ? `${serverUrl}/images/places/${place[0].image}.png` : null;

  return (
    <View style={{ flex: 2 }}>
      <View style={styles.header}>
        <Icon
          name='arrow-back'
          color='#fff'
          size={26}
          containerStyle={{ flex: 2 }}
          underlayColor='transparent'
          onPress={() => navigation.dispatch(NavigationActions.back())} />
        <View style={{ flex: 6, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 20 }}>{place && place[0] && place[0].name || 'Default Name'}</Text>
        </View>
        <View style={{ flex: 2 }}>
        // right icon  
        </View>
      </View>
      <View style={styles.image}>
        {preview.uri && uri ?
          <Image
            style={{ height: 120, width: null }}
            {...{
              preview,
              uri,
            }}
          />
          : ''}
      </View>
      <View style={styles.subHeader}>
        <Text style={{ color: 'white', fontSize: 16 }}>{tab}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#5b1f07',
    alignItems: 'center',
  },
  image: {
  },
  subHeader: {
    flex: 1,
    backgroundColor: '#5b1f07',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
