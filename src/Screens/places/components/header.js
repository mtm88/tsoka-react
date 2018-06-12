import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

const fontFamily = Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif';

export default Header = ({ place, accommodation, room, navigation, navigateTo, tab }) => {
  const imgDir = place ? 'places' : accommodation ? 'accommodation' : 'rooms';
  const nameParam = accommodation ? 'hotel_name' : 'name';
  const currentPlace = place || accommodation || room;
  const uri = currentPlace && currentPlace.image ? `${serverUrl}/images/${imgDir}/${currentPlace.image}` : `${serverUrl}/images/default.png`;

  return (
    <View>
      <View style={styles.header}>
        <Icon
          name='arrow-back'
          color='#fff'
          size={26}
          containerStyle={{ flex: 2 }}
          underlayColor='transparent'
          onPress={() => navigation.navigate(navigateTo || 'Home')} />
        <View style={{ flex: 6, alignItems: 'center' }}>
          <Text style={{ fontFamily, color: '#fff', fontSize: 20 }}>{currentPlace && currentPlace[nameParam] || 'Default Name'}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Icon
            name='menu'
            color='white'
            size={40}
            underlayColor='transparent'
            onPress={() => navigation.navigate('DrawerToggle')} />
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
