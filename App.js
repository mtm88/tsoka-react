import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './src/reducer';

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
}, reducer);

import InitialNavigator from './src/Navigators/initialNavigator';

import './src/config';
import { PersistGate } from 'redux-persist/integration/react';

// This is used in order to see requests on the Chrome DevTools
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest;

const client = axios.create({
  baseURL: `${serverUrl}/mobile`,
  responseType: 'json',
});

function configureStore() {
  let store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(
      axiosMiddleware(client)
    )
  ));
  let persistor = persistStore(store);

  return { persistor, store };
}

const { persistor, store } = configureStore();

export default class App extends Component {
  onBeforeLift = () => {
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Spinner />}
          persistor={persistor}
          onBeforeLift={this.onBeforeLift}>
          <View style={styles.container}>
            <InitialNavigator />
          </View>
        </PersistGate>
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
