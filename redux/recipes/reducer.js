import { createReducer, withIdMap } from '../utils';
import { ADD_RECIPE, SET_RECIPE } from './actions';

const initialState = withIdMap({
  list: [
    {
      id: '1',
      name: 'Circuit assembling',
      time: 1,
      ingredients: [
        { id: '1', amount: 3 },
        { id: '2', amount: 1 },
        { id: '4', amount: 1 },
      ],
      results: [
        { id: '3', amount: 1 },
      ],
    },
    {
      id: '2',
      name: 'Iron smelting',
      time: 3,
      ingredients: [
        { id: '10', amount: 1 },
      ],
      results: [
        { id: '9', amount: 3 },
      ],
    },
  ],
});

export default createReducer(initialState, {
  [ADD_RECIPE]: (state, { payload }) => withIdMap({
    ...state,
    list: [...state.list, payload],
  }),
  [SET_RECIPE]: (state, { payload }) => withIdMap({
    ...state,
    list: state.list.map(recipe => (recipe.id === payload.id ? payload : recipe)),
  }),
});