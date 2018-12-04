import { combineReducers } from 'redux';

import { itemsReducer } from './items';
import { recipesReducer } from './recipes';

export default combineReducers({
  items: itemsReducer,
  recipes: recipesReducer,
});