import { createReducer, withIdMap, replaceEntry } from '../utils';
import { ADD_ITEM, SET_ITEM, STORAGE_LOAD_SUCCESS } from '../actions';

const initialState = withIdMap({
  list: [
    { id: '1', name: 'Wire' },
    { id: '2', name: 'Board' },
    { id: '3', name: 'Circuit' },
    { id: '4', name: 'Plastic' },
    { id: '5', name: 'Copper plate' },
    { id: '6', name: 'Copper ore' },
    { id: '7', name: 'CH4' },
    { id: '8', name: 'Coal' },
    { id: '9', name: 'Iron plate' },
    { id: '10', name: 'Iron ore' },
  ],
});


export default createReducer(initialState, {
  [ADD_ITEM]: (state, { payload }) => withIdMap({
    ...state,
    list: [...state.list, payload],
  }),
  [SET_ITEM]: (state, { payload }) => withIdMap({
    ...state,
    list: replaceEntry(state.list, payload),
  }),
  [STORAGE_LOAD_SUCCESS]: (state, { payload }) => withIdMap({
    ...state,
    list: payload.itemList,
  }),
});
