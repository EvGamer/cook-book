import { createReducer, withIdMap, replaceEntry } from '../utils';
import {
  ADD_RECIPE,
  SET_RECIPE,
  STORAGE_LOAD_SUCCESS,
  REMOVE_RECIPE,
  REMOVE_ITEM,
} from '../actions';

const initialState = withIdMap({
  list: [
    // {
    //   id: '1',
    //   name: 'Circuit assembling',
    //   time: 1,
    //   ingredients: [
    //     { id: '1', amount: 3 },
    //     { id: '2', amount: 1 },
    //     { id: '4', amount: 1 },
    //   ],
    //   results: [
    //     { id: '3', amount: 1 },
    //   ],
    // },
  ],
});

const notId = id => entry => entry.id !== id;

function notUsingRemovedItem(id) {
  const notRemovedItem = notId(id);
  return recipe => (
    recipe.ingredients.every(notRemovedItem)
    && recipe.results.every(notRemovedItem)
  );
}

export default createReducer(initialState, {
  [ADD_RECIPE]: (state, { payload }) => withIdMap({
    ...state,
    list: [...state.list, payload],
  }),
  [SET_RECIPE]: (state, { payload }) => withIdMap({
    ...state,
    list: replaceEntry(state.list, payload),
  }),
  [STORAGE_LOAD_SUCCESS]: (state, { payload }) => withIdMap({
    ...state,
    list: payload.recipeList,
  }),
  [REMOVE_RECIPE]: (state, { id }) => withIdMap({
    ...state,
    list: state.list.filter(recipe => recipe.id !== id),
  }),
  // If item removed, so should be recipes what use it
  [REMOVE_ITEM]: (state, { id }) => withIdMap({
    ...state,
    list: state.list.filter(notUsingRemovedItem(id)),
  }),
});