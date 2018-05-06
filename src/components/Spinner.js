import React, { Component } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default Spinner = () => (
  <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingTop: 50, paddingBottom: 20 }}>
      <Image
        style={{ width: 128, height: 64 }}
        source={require('./../../static/images/logo.png')}
      />
    </View>
    <View style={{ flex: 2, paddingTop: 20 }}>
      <ActivityIndicator size="large" color='white' />
    </View>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4b44c',
  },
  loadingHorizontal: {
    justifyContent: 'center',
  },
});
