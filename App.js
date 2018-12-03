/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/* eslint react/jsx-filename-extension:"off" */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { Provider } from 'react-redux';

import { createStore } from './redux';


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    height: 40,
    backgroundColor: '#20436E',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  button: {
    width: 25,
    height: 25,
    fontSize: 20,
    backgroundColor: '#b7c6d6',
  },
});

const store = createStore();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Items
          </Text>
        </View>
      </View>
    </Provider>
  );
}
