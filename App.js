/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/* eslint react/jsx-filename-extension:"off" */

import React from 'react';
import { Provider } from 'react-redux';
import { DrawerNavigator } from 'react-navigation';
import { Items, Recipes, Chain } from './screens';

import { createStore } from './redux';
import { storageLoad } from './redux/actions';

const navConfig = {
  Items: {
    drawerLabel: 'Items',
    screen: Items,
  },
  Recipes: {
    drawerLabel: 'Recipes',
    screen: Recipes,
  },
  SupplyChain: {
    drawerLabel: 'Supply chains',
    screen: Chain,
  },
};

const store = createStore();
store.dispatch(storageLoad());

const Navigator = DrawerNavigator(navConfig);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
