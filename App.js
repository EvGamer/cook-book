/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/* eslint react/jsx-filename-extension:"off" */

import React from 'react';
import { Provider } from 'react-redux';
import { DrawerNavigator } from 'react-navigation';
import { SelectIngredient } from './screens';

const navConfig = {
  Home: {
    title: 'Select Ingredient',
    screen: SelectIngredient,
  },
};

import { createStore } from './redux';

const store = createStore();

const Navigator = DrawerNavigator(navConfig);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
