import { createReducer, withIdMap, replaceEntry } from '../utils';
import { ADD_ITEM, SET_ITEM, STORAGE_LOAD_SUCCESS, REMOVE_ITEM } from '../actions';

const initialState = withIdMap({
  list: [
    // { id: '1', name: 'Wire' },
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
  [REMOVE_ITEM]: (state, { id }) => withIdMap({
    ...state,
    list: state.list.filter(item => item.id !== id),
  }),
  [STORAGE_LOAD_SUCCESS]: (state, { payload }) => withIdMap({
    ...state,
    list: payload.itemList,
  }),
});
