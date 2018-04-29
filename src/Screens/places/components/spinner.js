import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default Spinner = () => (
  <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
    <ActivityIndicator size="large" color='white' />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4b44c',
  },
  loadingHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
