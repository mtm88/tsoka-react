import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './src/reducer';

import Drawer from './src/Navigators/drawerNavigator';

import './src/config';

const client = axios.create({
  baseURL: `${serverUrl}/mobile`,
  responseType: 'json',
});

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(
    axiosMiddleware(client)
  )
));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Drawer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
  },
});
