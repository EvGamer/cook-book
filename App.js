/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/* eslint react/jsx-filename-extension:"off" */

import React from 'react';
import { Provider } from 'react-redux';
import { DrawerNavigator } from 'react-navigation';
import { SelectIngredient, AddItem } from './screens';

import { createStore } from './redux';

const navConfig = {
  SelectIngredient: {
    drawerLabel: 'Select Ingredient',
    screen: SelectIngredient,
  },
  AddItem: {
    drawerLabel: 'Add Item',
    screen: AddItem,
  },
};

const store = createStore();

const Navigator = DrawerNavigator(navConfig);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
