import { combineReducers } from 'redux';

import { itemsReducer } from './items';

export default combineReducers({
  items: itemsReducer,
});